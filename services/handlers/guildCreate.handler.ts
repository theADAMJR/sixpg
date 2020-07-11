import config from '../../config.json';
import EventHandler from './event-handler';
import { Guild, TextChannel } from 'discord.js';

export default class GuildCreateHandler implements EventHandler {
    on = 'guildCreate';

    invoke(guild: Guild): Promise<any> {
        return this.sendWelcomeMessage(guild.systemChannel);
    }

    private sendWelcomeMessage(channel: TextChannel | null) {
        const url = `${config.dashboard.url}/servers/${channel.guild.id}`;
        return channel?.send(`Hey, I'm 6PG!`);
    }    
}