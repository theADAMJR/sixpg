import { Client } from 'discord.js';
import config from './config.json';
import mongoose from 'mongoose';
import Deps from './utils/deps';

import EventsService from './services/events.service';
import API from './api/server';

export const bot = new Client();

bot.login(config.bot.token);

Deps.build(EventsService, API);

mongoose.connect(config.mongoURL, { 
    useUnifiedTopology: true, 
    useNewUrlParser: true, 
    useFindAndModify: false 
});