import EventHandler from "./event-handler";
import { GuildMember, TextChannel } from "discord.js";
import Guilds from "../../../data/guilds";
import { EventType } from "../../../models/guild";

export default class MemberLeaveHandler implements EventHandler {
    constructor(private guilds: Guilds = new Guilds()) {}
    
    async invoke(...args: any[]) {
        const member: GuildMember = args[0];
        if (!member) return;

        const guild = await this.guilds.get(member.guild);

        const announce = guild.announce;
        const event = announce.events.find(e => e.event === EventType.MemberLeave);
        if (!announce.enabled || !event) return;

        const channel = member.guild.channels.cache.get(event.channel) as TextChannel;
        if (!channel) return;

        const message = this.applyGuildVariables(event.message, member);
        await channel.send(message);
    }

    private applyGuildVariables(content: string, member: GuildMember) {
        content
            .replace(/[USER]/g, `<@!${member.id}>`) // TODO: CommandUtils.mention
            .replace(/[GUILD]/g, member.guild.name)
            .replace(/[MEMBER_COUNT]/g, member.guild.memberCount.toString())
        return content;
    }
}