import { GuildMember, TextChannel } from "discord.js";
import { EventType } from "../../../models/guild";
import AnnounceHandler from "./announce-handler";

export default class MemberLeaveHandler extends AnnounceHandler {
    on = 'guildMemberRemove';

    async invoke(...args: any[]) {
        const member: GuildMember = args[0];
        if (!member) return;

        const event = await super.getEvent(EventType.MemberLeave, member.guild);
        if (!event) return;

        const message = this.applyGuildVariables(event.message, member);
        const channel = member.guild.channels.cache.get(event.channel) as TextChannel;

        await channel?.send(message);
    }

    protected applyGuildVariables(content: string, member: GuildMember) {
        content
            .replace(/[USER]/g, `<@!${member.id}>`) // TODO: CommandUtils.mention
            .replace(/[GUILD]/g, member.guild.name)
            .replace(/[MEMBER_COUNT]/g, member.guild.memberCount.toString())
        return content;
    }
}