import AnnounceHandler from "./announce-handler";
import { GuildMember, TextChannel } from "discord.js";
import { EventType } from "../../models/guild";
import EventHandler from "./event-handler";

export default class MemberJoinHandler extends AnnounceHandler implements EventHandler {
    on = 'guildMemberAdd';

    async invoke(member: GuildMember) {
        await this.announceUserJoin(member);
        await this.addAutoRoles(member);
    }

    private async announceUserJoin(member: GuildMember) {
        const event = await super.getEvent(EventType.MemberJoin, member.guild);
        if (!event) return;

        const message = this.applyGuildVariables(event.message, member);
        const channel = member.guild.channels.cache.get(event.channel) as TextChannel;

        await channel?.send(message);
    }

    private async addAutoRoles(member: GuildMember) {
        const guild = await this.guilds.get(member.guild);

        await member.roles.add(guild.general.autoRoles, 'Auto role');
    }

    protected applyGuildVariables(content: string, member: GuildMember) {
        content
            .replace(/[USER]/g, `<@!${member.id}>`) // TODO: CommandUtils.mention
            .replace(/[GUILD]/g, member.guild.name)
            .replace(/[MEMBER_COUNT]/g, member.guild.memberCount.toString())
        return content;
    }
}