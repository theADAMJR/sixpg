import { Router } from 'express';
import config from '../../config.json';
import { SavedMember } from '../../data/models/member';
import { AuthClient } from '../server';
import { XPCardGenerator } from '../modules/image/xp-card-generator';
import Deps from '../../utils/deps';
import Members from '../../data/members';
import Ranks from '../modules/ranks';
import Users from '../../data/users';
import Bots from '../../data/bots';
import Logs from '../../data/logs';
import AuditLogger from '../modules/audit-logger';
import { User } from 'discord.js';
import Leveling from '../../modules/xp/leveling';
import { getUser } from './user-routes';
import { sendError } from './api-routes';
import GlobalBots from '../../global-bots';

export const router = Router();

const logs = Deps.get<Logs>(Logs),
      members = Deps.get<Members>(Members),
      users = Deps.get<Users>(Users),
      bots = Deps.get<Bots>(Bots);

router.get('/', async (req, res) => {
    try {
        const clients = await getManageableBots(req.query.key);
        
        res.json(clients);
    } catch (error) { sendError(res, 400, error); }
});

router.put('/:id/:module', async (req, res) => {
    try {
        const { id, module } = req.params; 
        
        const isValidModule = config.modules.some(m => m === module);        
        if (!isValidModule)
            throw new TypeError('Module not configured');

        await validateBotOwner(req.query.key, id);

        const user = await getUser(req.query.key);
        const savedConfig = await bots.get({ id });
        
        const change = AuditLogger.getChanges({
            old: savedConfig[module],
            new: req.body
        }, module, user.id);

        savedConfig[module] = req.body;
        await bots.save(savedConfig);
       
        const log = await logs.get({ id });
        
        log.changes.push(change);
        await log.save();
            
        res.json(savedConfig);
    } catch (error) { sendError(res, 400, error); }
});

router.get('/:id/config', async (req, res) => {
    try {
        const savedConfig = await bots.get({ id: req.params.id });

        res.json(savedConfig);
    } catch (error) { sendError(res, 400, error); }
});

router.get('/:id/log', async(req, res) => {
    try {
        const bot = GlobalBots.get(req.params.id);
        const log = await logs.get(bot.user);

        res.send(log);
    } catch (error) { sendError(res, 400, error); }
});

router.get('/:id/public', (req, res) => {
    const bot = GlobalBots.get(req.params.id);
    const guild = bot.guilds.cache.get(req.params.id);

    res.json(guild);
});

router.get('/:id/roles', async (req, res) => {
    try {
        const bot = GlobalBots.get(req.params.id);
        const guild = bot.guilds.cache.get(req.params.id);

        res.send(guild.roles.cache.filter(r => r.name !== '@everyone'));
    } catch (error) { sendError(res, 400, error); }
});

router.get('/:id/members', async (req, res) => {
    try {
        const bot = GlobalBots.get(req.params.id);

        const savedMembers = await SavedMember.find({ guildId: req.params.id }).lean();        
        let rankedMembers = [];
        for (const member of savedMembers) {
            const user = bot.users.cache.get(member.userId);
            if (!user) continue;
            
            const xpInfo = Leveling.xpInfo(member.xp);
            rankedMembers.push(leaderboardMember(user, xpInfo));
        }
        rankedMembers.sort((a, b) => b.xp - a.xp);
    
        res.json(rankedMembers);
    } catch (error) { sendError(res, 400, error); }
});

function leaderboardMember(user: User, xpInfo: any) {
    return {
        id: user.id,
        username: user.username,
        tag: '#' + user.discriminator,
        displayAvatarURL: user.displayAvatarURL({ dynamic: true }),
        ...xpInfo
    };
}

router.get('/:guildId/members/:memberId/xp-card', async (req, res) => {
    try {
        const bot = GlobalBots.get(req.params.id);
        const { guildId, memberId } = req.params;

        const user = bot.users.cache.get(memberId);             
        const savedUser = await users.get(user); 

        const guild = bot.guilds.cache.get(guildId);
        const member = guild?.members.cache.get(memberId);        
        if (!member)
            throw Error();
        
        const savedMember = await members.get(member);  
        const savedMembers = await SavedMember.find({ guildId });
        const rank = Ranks.get(member, savedMembers);
        
        const generator = new XPCardGenerator(savedUser, rank);
        const image = await generator.generate(savedMember);
        
        res.set({'Content-Type': 'image/png'}).send(image);
    } catch (error) { sendError(res, 400, error); }
});

export async function validateBotOwner(key: string, botId: string) {
    if (!key)
        throw new TypeError('No key provided.');

    const manageableBots = await getManageableBots(key);
    const isManageable = manageableBots.some(b => b.id === botId);
    if (!isManageable)
        throw new TypeError('You cannot manage this bot.')
}

export async function getManageableBots(key: string) {
    const authUser = await AuthClient.getUser(key);
    return bots.getManageableBots(authUser.id);
}