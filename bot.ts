import { Client } from 'discord.js';
import config from 'config.json';

const bot = new Client();

bot.on('ready', () => console.log(`It's live!`));

// don't hack me pls
bot.login(config.token);

// initialize commands from files