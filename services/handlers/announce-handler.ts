import { EventType } from '../../models/guild';
import Guilds from '../../data/guilds';
import { Guild } from 'discord.js';
import Deps from '../../utils/deps';

export default abstract class AnnounceHandler {
    constructor(protected guilds = Deps.get<Guilds>(Guilds)) {}

    protected async getEvent(event: EventType, memberGuild: Guild) {
        const guild = await this.guilds.get(memberGuild);
        
        const activeEvent = guild.announce.events.find(e => e.event === event);
        return (guild.announce.enabled && activeEvent) ? activeEvent : null;
    }

    protected abstract applyGuildVariables(...args: any[]): string;
}
