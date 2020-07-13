import { Router } from 'express';
import { XPCardGenerator } from '../modules/image/xp-card-generator';
import { SavedMember } from '../../data/models/member';
import { AuthClient } from '../server';
import Deps from '../../utils/deps';
import Users from '../../data/users';
import config from '../../config.json';
import { sendError } from './api-routes';

export const router = Router();

router.get('/', async (req, res) => {
    try {
        const user = await getUser(req.query.key);
        res.json(user);
    } catch (error) { sendError(res, 400, error); }
});

router.get('/saved', async (req, res) => {
    try {        
        const user = await getUser(req.query.key);
        const savedUser = await Deps.get<Users>(Users).get(user);
        res.json(savedUser);
    } catch (error) { sendError(res, 400, error); }
});

router.get('/xp-card-preview', async (req, res) => {
    try {        
        delete req.query.cache;

        const authUser = await getUser(req.query.key);
        const savedUser = await Deps.get<Users>(Users).get(authUser);
        if (!savedUser)
            return res.status(404).send('User not found');

        const rank = 1;
        const generator = new XPCardGenerator(authUser, savedUser, rank);

        const member = new SavedMember();
        member.xp = 1800;
        
        delete req.query.key;        
        const image = await generator.generate(member,
            {...savedUser.xpCard, ...req.query });
        
        res.set({'Content-Type': 'image/png'}).send(image);
    } catch (error) { sendError(res, 400, error); }
});

router.put('/xp-card', async (req, res) => {        
    try {
        const user = await getUser(req.query.key);
        const savedUser = await Deps.get<Users>(Users).get(user);

        savedUser.xpCard = req.body;
        await savedUser.save();
        
        res.send(savedUser);
    } catch (error) { sendError(res, 400, error); }
});

export async function getUser(key: any) {
    let authUser: AuthUser = await AuthClient.getUser(key);

    authUser['displayAvatarURL'] = authUser.avatarUrl(64);
    authUser = JSON.parse(JSON.stringify(authUser).replace(/"_(.*?)"/g, '"$1"'));

    return authUser;
}

export interface AuthUser {
    username: string;
    locale: string;
    isMFAEnabled: boolean;
    discriminator: number;
    id: string;
    avatarHash: string;
    userFlags: string[];
    premiumType: string;
    bot: boolean;
    createdTimestamp: number;
    createdAt: string;

    avatarUrl: (size: number) => string;
}
