import { Router } from 'express';
import config from '../../config.json';
import { SavedGuild } from '../../models/guild';
import { SavedMember } from '../../models/member';
import Leveling from '../../modules/xp/leveling';
import { AuthClient } from '../server';
import { XPCardGenerator } from '../modules/image/xp-card-generator';
import { bot } from '../../bot';
import Deps from '../../utils/deps';
import Members from '../../data/members';
import Ranks from '../modules/ranks';
import Users from '../../data/users';
import Guilds from '../../data/guilds';

export const router = Router();

router.get('/', async (req, res) => {
    try {        
        const guilds = await getManagableGuilds(req.query.key);
        res.json(guilds);
    } catch (error) { res.status(400).send(error); }
});

router.put('/:id/:module', async (req, res) => {
    try {        
        const isValidModule = config.modules
            .some(m => m.toLowerCase() === req.params.module);
        if (!isValidModule)
            throw new TypeError();
        
        const id = req.params.id;
        validateGuildManager(req.query.key, id);        

        const updatedGuild = await SavedGuild.findById(id);
        updatedGuild[req.params.module] = req.body;       
        await updatedGuild.save();        
        
        res.json(updatedGuild);
    } catch { res.status(400).send('Bad Request'); }
});

router.get('/:id/config', async (req, res) => {
    try {
        const id = req.params.id;
        const savedGuild = await SavedGuild.findById(id).lean();
        res.json(savedGuild);
    } catch { res.status(400).send('Bad Request'); }
});

router.get('/:id/channels', async (req, res) => {
    try {
        const guild = bot.guilds.cache.get(req.params.id);
        res.send(guild.channels.cache);        
    } catch { res.status(400).send('Bad Request'); }
});

router.get('/:id/log', (req, res) => {
    try {
    } catch { res.status(400).send('Bad Request'); }
});

router.get('/:id/public', (req, res) => {
    const guild = bot.guilds.cache.get(req.params.id);
    res.json(guild);
});

router.get('/:id/roles', async (req, res) => {
    try {
        const guild = bot.guilds.cache.get(req.params.id);
        res.send(guild.roles.cache.filter(r => r.name !== '@everyone'));        
    } catch { res.status(404).send('Not Found'); }
});

router.get('/:id/members', async (req, res) => {
    try {
        const members = await SavedMember.find({ guildId: req.params.id }).lean();
        const guild = await SavedGuild.findById(req.params.id).lean();
        
        let rankedMembers = [];
        for (const savedMember of members) {
            const member = bot.users.cache.get(savedMember._id);
            const xp = Leveling.xpInfo(savedMember.xpMessages, guild.xp.xpPerMessage);
    
            rankedMembers.push({
                id: member.id,
                username: member.username,
                tag: '#' + member.discriminator,
                displayAvatarURL: member.displayAvatarURL(),
                ...xp,
                xpMessages: savedMember.xpMessages
            });
        }
        rankedMembers.sort((a, b) => b.xpMessages - a.xpMessages);
    
        res.json(rankedMembers);
    } catch { res.status(400).send('Bad Request'); }
});

async function getManagableGuilds(key: string) {
    const manageableGuilds = [];
    let userGuilds = await AuthClient.getGuilds(key);    
    for (const id of userGuilds.keys()) {        
        const authGuild = userGuilds.get(id);        
        const hasManager = authGuild._permissions
            .some(p => p === config.api.managerPermission);

        if (hasManager)
            manageableGuilds.push(id);
    }    
    return bot.guilds.cache
        .filter(g => manageableGuilds.some(id => id === g.id));
}

router.get('/:guildId/members/:memberId/xp-card', async (req, res) => {
    try {
        const { guildId, memberId } = req.params;

        const user = bot.users.cache.get(memberId);             
        const savedUser = await Deps.get<Users>(Users).get(user); 

        const guild = bot.guilds.cache.get(guildId);
        const member = guild?.members.cache.get(memberId);        
        if (!member)
            throw Error();
        
        const savedMember = await Deps.get<Members>(Members).get(member);  
        const members = await SavedMember.find({ guildId });
        const rank = Ranks.get(member, members);
        
        const savedGuild = await Deps.get<Guilds>(Guilds).get(guild);
        const generator = new XPCardGenerator(savedUser, rank, 
            savedGuild.xp.xpPerMessage);
        const image = await generator.generate(savedMember);
        
        res.set({'Content-Type': 'image/png'}).send(image);
    }
    catch (error) { res.status(400).send('Bad Request'); console.log(error);
     }
});

async function validateGuildManager(key: string, id: string) {
    const guilds = await getManagableGuilds(key);        
        
    if (!guilds.has(id))
        throw Error();
}
