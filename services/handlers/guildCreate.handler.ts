import config from '../../config.json';
import EventHandler from './event-handler';
import { SavedGuild } from '../../models/guild';
import { Guild, TextChannel } from 'discord.js';

export default class GuildCreateHandler implements EventHandler {
    on = 'guildCreate';

    invoke(guild: Guild): void | Promise<any> {
        const savedGuild = new SavedGuild();
        savedGuild._id = guild.id; 
        savedGuild.save();

        this.sendWelcomeMessage(guild.systemChannel);
    }

    private sendWelcomeMessage(channel: TextChannel | null) {
        channel?.send(`Hey, I'm 2PG! Customize me at ${config.webapp.url}`);
    }    
}