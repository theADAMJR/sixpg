import { Router } from 'express';
import { SavedCommand, CommandDocument } from '../../models/command';
import { AuthClient, stripe } from '../server';
import * as config from '../../config.json';

import { router as guildsRoutes } from './guilds-routes';
import { router as userRoutes } from './user-routes';
import Stripe from 'stripe';
import bodyParser from 'body-parser';
import { SavedUser } from '../../models/user';

export const router = Router(),
             endpointSecret = 'whsec_uNgUHx7T0J1vbOgcTuRCEjXGZYTMvqs0';

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

router.post('/webhook', async(req, res) => {
  try {
    // stripe.webhooks.signature
      // .parseHeader(req.headers['stripe-signature']);

    const id = req.body.data.object.metadata.id;
    if (req.body.type === 'checkout.session.completed') {
      await giveUserPlus(id);
      return res.json({ success: true });
    }
    res.json({ received: true });
  } catch (error) { res.status(400).send(error); console.log(error);
  } 
});

async function giveUserPlus(id: string) {
  console.log('give ' + id + ' premium');
  
  const savedUser = await SavedUser.findById(id);
  savedUser.premium = true;
  savedUser.save();
}

router.get('/invite', (req, res) => 
    res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${config.bot.id}&redirect_uri=${config.webapp.url}/dashboard&permissions=8&scope=bot`));

router.get('/login', (req, res) =>
    res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${config.bot.id}&redirect_uri=${config.webapp.url}/auth&response_type=code&scope=identify guilds`));

router.use('/guilds', guildsRoutes);
router.use('/user', userRoutes);

router.get('*', (req, res) => res.status(404).json({ code: 404 }));
