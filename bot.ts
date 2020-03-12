import { Client } from 'discord.js';
import config from './config.json';
import CommandService from './services/command.service';
import EventsService from './services/events.service';
import mongoose from 'mongoose';
import Announce from './modules/announce/announce';
import Service from './services/service';

export const bot = new Client();

bot.login(config.token);

const services: Service[] = [ 
    new EventsService(), 
    new CommandService()
];
const modules = [
    new Announce()
];
for (const service of services.concat(modules)) {    
    service.initialize();
}

mongoose.connect(config.mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });