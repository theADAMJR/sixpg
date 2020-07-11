import config from '../../config.json';
import EventHandler from './event-handler';
import { Guild, TextChannel } from 'discord.js';
import Deps from '../../utils/deps';
import Guilds from '../../data/guilds';

export default class GuildCreateHandler implements EventHandler {
    on = 'guildCreate';

    constructor(private guilds = Deps.get<Guilds>(Guilds)) {}

    async invoke(guild: Guild): Promise<any> {
        await this.guilds.get(guild);
        this.sendWelcomeMessage(guild.systemChannel);
    }

    private sendWelcomeMessage(channel: TextChannel | null) {
        const url = `${config.dashboard.url}/servers/${channel.guild.id}`;
        channel?.send(`Hey, I'm 2PG! Customize me at ${url}`);
    }    
}