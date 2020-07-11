import AnnounceHandler from './announce-handler';
import { GuildMember } from 'discord.js';
import { EventType } from '../../data/models/guild';
import EventVariables from '../../modules/announce/event-variables';

export default class MemberJoinHandler extends AnnounceHandler {
    on = 'guildMemberAdd';
    event = EventType.MemberJoin;

    async invoke(member: GuildMember) {
        await super.announce(member.guild, [ member ]);
        await this.addAutoRoles(member);
    }

    private async addAutoRoles(member: GuildMember) {
        const guild = await this.guilds.get(member.guild);

        await member.roles.add(guild.general.autoRoles, 'Auto role');
    }

    protected applyEventVariables(content: string, member: GuildMember) {
        return new EventVariables(content)
            .user(member.user)
            .guild(member.guild)
            .memberCount(member.guild)
            .toString();
    }
}