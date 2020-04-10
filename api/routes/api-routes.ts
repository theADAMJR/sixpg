import { Router } from 'express';
import { SavedCommand, CommandDocument } from '../../models/command';
import { AuthClient, stripe } from '../server';
import * as config from '../../config.json';

import { router as guildsRoutes } from './guilds-routes';
import { router as userRoutes } from './user-routes';

export const router = Router();

let commands: CommandDocument[] = [];
SavedCommand.find().then(cmds => commands = cmds);

router.get('/', (req, res) => res.json({ hello: 'earth' }));

router.get('/commands', async (req, res) => res.json(commands));

router.get('/auth', async (req, res) => {
    try {
        const key = await AuthClient.getAccess(req.query.code);
        res.json(key);
    } catch { res.status(400).send('Bad Request'); }
});

const items = [
    {
        name: 'Plus',
        description: 'Support 2PG',
        amount: 500,
        currency: 'usd',
        quantity: 1,
    }
];
router.get('/pay', async(req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            success_url: `${config.webapp.url}/payment-success`,
            cancel_url: `${config.webapp.url}/plus`,
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: items
        });
        res.send(session);
    } catch (error) { res.status(400).send(error); }
});

router.get('/invite', (req, res) => 
    res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${config.bot.id}&redirect_uri=${config.webapp.url}/dashboard&permissions=8&scope=bot`));

router.get('/login', (req, res) =>
    res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${config.bot.id}&redirect_uri=${config.webapp.url}/auth&response_type=code&scope=identify guilds`));

router.use('/guilds', guildsRoutes);
router.use('/user', userRoutes);

router.get('*', (req, res) => res.status(404).json({ code: 404 }));
