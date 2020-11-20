import { Router } from 'express';
import { SavedCommand, CommandDocument } from '../../data/models/command';
import { AuthClient } from '../server';
import fs from 'fs';
import { router as botsRoutes } from './bots-routes';
import { router as musicRoutes } from './music-routes';
import { router as userRoutes } from './user-routes';
import { promisify } from 'util';
import { resolve } from 'path';

const appendFile = promisify(fs.appendFile);
const dashboardLogsPath = resolve('./logs/dashboard');
const sessionDate = new Date()
  .toISOString()
  .replace(/:/g, '');

export const router = Router();

let commands: CommandDocument[] = [];
SavedCommand
  .find()
  .then(cmds => commands = cmds);

router.get('/', (req, res) => res.json({ hello: '' }));

router.get('/commands', async (req, res) => res.json(commands));

router.get('/auth', async (req, res) => {
  try {
    const key = await AuthClient.getAccess(req.query.code.toString());
    res.json(key);
  } catch (error) { sendError(res, 400, error); }
});

router.post('/error', async (req, res) => {
  try {
    const { message } = req.body;

    await appendFile(`${dashboardLogsPath}/${sessionDate}.log`, message + '\n');
  
    res.json({ code: 200, message: 'Success!' });
  } catch (error) { sendError(res, 400, error); }
});

router.get('/invite', (req, res) => 
    res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.DASHBOARD_URL}/dashboard&permissions=8&scope=bot`));

router.get('/login', (req, res) => res.redirect(AuthClient.authCodeLink.url));

router.use('/bots', botsRoutes);
router.use('/bots/:botId/guilds/:guildId/music', musicRoutes);
router.use('/user', userRoutes);

router.get('*', (req, res) => res.status(404).json({ code: 404 }));

export function sendError(res: any, code: number, error: Error) {
  return res.status(code).json({ code, message: error?.message })
}