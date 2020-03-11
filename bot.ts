import { Client } from 'discord.js';
import config from './config.json';
import CommandHandler from './handlers/command-handler';
import EventsHandler from './handlers/events-handler';
import mongoose from 'mongoose';
import Announce from './modules/announce/announce';

export const bot = new Client();

bot.login(config.token);

EventsHandler.initialize();
CommandHandler.initialize();
new Announce();

mongoose.connect(config.mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });