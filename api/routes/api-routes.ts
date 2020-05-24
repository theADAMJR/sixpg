import { Router } from 'express';
import { SavedCommand, CommandDocument } from '../../data/models/command';
import { AuthClient, stripe } from '../server';
import * as config from '../../config.json';
import { SavedUser } from '../../data/models/user';
import { bot } from '../../bot';
import { MessageEmbed } from 'discord.js';

import { router as guildsRoutes } from './guilds-routes';
import { router as musicRoutes } from './music-routes';
import { router as userRoutes } from './user-routes';

export const router = Router();

let commands: CommandDocument[] = [];
SavedCommand.find().then(cmds => commands = cmds);

router.get('/', (req, res) => res.json({ hello: '' }));

router.get('/commands', async (req, res) => res.json(commands));

router.get('/auth', async (req, res) => {
    try {
        const key = await AuthClient.getAccess(req.query.code);
        res.json(key);
    } catch (error) { res.status(400).send(error?.message); console.log(error); }
});

router.post('/stripe-webhook', async(req, res) => {
  try {
    // TODO: add better validation
    if (!req.headers['stripe-signature']) return;
    
    const id = req.body.data.object.metadata.id;
    if (req.body.type === 'checkout.session.completed') {
      await giveUserPlus(id);
      return res.json({ success: true });
    }
    res.json({ received: true });
  } catch (error) { res.status(400).send(error); } 
});

router.post('/error', async(req, res) => {
  try {
    const { message } = req.body;

    const key = req.query.key;
    let user = { id: 'N/A' };
    if (key)
      user = AuthClient.getUser(key);

    // it would probably be better to save errors in a db collection
    // instead of notifying a Discord user directly
    
    await bot.users.cache
      .get(config.bot.ownerId)
      .send(new MessageEmbed({
        title: 'Dashboard Error',
        description: `**Message**: ${message}`,
        footer: { text: `User ID: ${user.id}` }
      }));
  } catch (error) { res.status(400).json(error?.message); }
});

async function giveUserPlus(id: string) {   
  const savedUser = await SavedUser.findById(id);
  savedUser.premium = true;
  savedUser.save();
}

router.get('/invite', (req, res) => 
    res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${config.bot.id}&redirect_uri=${config.webapp.url}/dashboard&permissions=8&scope=bot`));

router.get('/login', (req, res) =>
    res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${config.bot.id}&redirect_uri=${config.webapp.url}/auth&response_type=code&scope=identify guilds`));

router.use('/guilds', guildsRoutes);
router.use('/guilds/:id/music', musicRoutes);
router.use('/user', userRoutes);

router.get('*', (req, res) => res.status(404).json({ code: 404 }));
