import { bot } from '../bot';
import CommandService from './command.service';
import config from '../config.json';
import { SavedGuild } from '../models/guild';
import { TextChannel } from 'discord.js';
import Log from '../utils/log';
import Deps from '../deps';

export default class EventsService {
    constructor(private commands = Deps.get<CommandService>(CommandService)) {
        this.initialize();
    }

    private initialize() {
        bot.on('ready', () => Log.info(`It's live!`, `events`));

        bot.on('message', async(msg: any) => await this.commands.handle(msg));

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