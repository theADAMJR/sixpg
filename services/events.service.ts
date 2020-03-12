import { bot } from '../bot';
import CommandService from './command.service';
import config from '../config.json';
import { SavedGuild } from '../models/guild';
import { TextChannel } from 'discord.js';
import Log from '../utils/log';
import Service from './service';

export default class EventsService implements Service {
    constructor(private commandHandler = new CommandService()) {
        commandHandler.initialize();
    }

    initialize() {
        bot.on('ready', () => Log.info(`It's live!`, `events`));

        bot.on('message', async(msg: any) => await this.commandHandler.handle(msg));

        bot.on('guildCreate', (guild) =>
        {
            const savedGuild = new SavedGuild();
            savedGuild._id = guild.id; 
            savedGuild.save();

            sendWelcomeMessage(guild.systemChannel);
        });

        function sendWelcomeMessage(channel: TextChannel | null) {
            channel?.send(`Hey, I'm 2PG! Customize me at ${config.webappURL}`);
        }
    }  
}