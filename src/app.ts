import { config } from 'dotenv';
config();

import mongoose from 'mongoose';
import Deps from './utils/deps';

import EventsService from './services/events.service';
import API from './api/server';
import GlobalBots from './global-bots';
import CommandService from './services/command.service';
import AutoMod from './modules/auto-mod/auto-mod';

Deps.build(API, EventsService, GlobalBots);

Deps.get<EventsService>(EventsService).init();
Deps.get<CommandService>(CommandService).init();
Deps.get<AutoMod>(AutoMod).init();

mongoose.connect(process.env.MONGO_URI, { 
    useUnifiedTopology: true, 
    useNewUrlParser: true, 
    useFindAndModify: false 
});

/** Used to prevent the app from sleeping (on Heroku, Glitch etc.) */
import './keep-alive';
