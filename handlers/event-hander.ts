import { bot } from '../bot';
import CommandHandler from './command-handler';
import config from '../config.json';
import { SavedGuild } from '../models/guild';
import { TextChannel } from 'discord.js';

export default class EventHandler {
    static initialize() {
        bot.on('ready', () => console.log(`It's live!`));

        bot.on('message', async(msg: any) => await CommandHandler.handle(msg));

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