import { Client } from 'discord.js';
import config from './config.json';
import CommandService from './services/command.service';
import mongoose from 'mongoose';
import Deps from './utils/deps';

import EventsService from './services/events.service';
import Guilds from './data/guilds';
import Users from './data/users';
import Members from './data/members';
import AutoMod from './modules/auto-mod/auto-mod';
import Leveling from './modules/xp/leveling';
import Music from './modules/music/music';
import API from './api/server';

export const bot = new Client();

bot.login(config.bot.token);

Deps.build(
    Guilds,
    Members,
    Users,
    
    AutoMod,
    Leveling,
    Music,

    CommandService,
    EventsService,
    API
);

mongoose.connect(config.mongoURL, { 
    useUnifiedTopology: true, 
    useNewUrlParser: true, 
    useFindAndModify: false 
});