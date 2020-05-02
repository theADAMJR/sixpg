import { EventType, AnnounceEvent } from '../../models/guild';
import Guilds from '../../data/guilds';
import { Guild, TextChannel } from 'discord.js';
import Deps from '../../utils/deps';
import EventHandler from './event-handler';

export default abstract class AnnounceHandler implements EventHandler {
    abstract on: string;
    abstract event: EventType;

    constructor(protected guilds = Deps.get<Guilds>(Guilds)) {}

    protected async getEvent(guild: Guild) {
        const savedGuild = await this.guilds.get(guild);
        
        const activeEvent = savedGuild.announce.events.find(e => e.event === this.event);
        return (savedGuild.announce.enabled && activeEvent) ? activeEvent : null;
    }

    protected getChannel(config: AnnounceEvent, guild: Guild) {
        return guild.channels.cache.get(config?.channel) as TextChannel;
    }

    protected async announce(guild: Guild, applyEventArgs: any[]) {
        const config = await this.getEvent(guild);        
        if (!config) return;

        const message = await this.applyEventVariables(config.message, ...applyEventArgs);

        if (message.length <= 0) return;
        
        let channel = this.getChannel(config, guild);
        await channel?.send(message);
    }

    protected abstract applyEventVariables(...args: any[]): string | Promise<string>;

    abstract invoke(...args: any[]): Promise<any> | void;
}
