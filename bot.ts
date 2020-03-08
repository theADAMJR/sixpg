import { Client } from 'discord.js';
import config from './config.json';
import CommandHandler from './handlers/command-handler';
import EventHandler from './handlers/event-hander';
import mongoose from 'mongoose';

export const bot = new Client();

bot.login(config.token);

EventHandler.initialize();
CommandHandler.initialize();

mongoose.connect(config.mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });