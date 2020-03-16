import { GuildMember, TextChannel } from "discord.js";
import { EventType } from "../../models/guild";
import AnnounceHandler from "./announce-handler";
import EventHandler from "./event-handler";

export default class MemberLeaveHandler extends AnnounceHandler implements EventHandler {
    on = 'guildMemberRemove';

    async invoke(member: GuildMember) {
        this.announceUserLeave(member);
    }

    private async announceUserLeave(member: GuildMember) {
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
