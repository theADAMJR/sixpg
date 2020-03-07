import { Client } from 'discord.js';

const bot = new Client();

bot.on('ready', () => console.log(`It's live!`));

// don't hack me pls
bot.login('Njg1ODY3NzAzMzUyODE5NzIw.XmO6Hg.AXPDPo_wq91Mri-AAniuKUmqCkc');

// initialize commands