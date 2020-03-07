import { Client } from 'discord.js';
import config from './config.json';
import CommandHandler from './handlers/command-handler';
import mongoose from 'mongoose';

// handle the bot

const bot = new Client();

bot.on('ready', () => console.log(`It's live!`));

bot.on('message', async(msg: any) => await CommandHandler.handle(msg));

bot.login(config.token);

CommandHandler.initialize();

// initialize database
mongoose.connect(config.mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

// streaming on my last 2GB of mobile data 😿