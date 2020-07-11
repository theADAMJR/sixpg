import { GuildMember, TextChannel } from 'discord.js';
import { EventType } from '../../data/models/bot';
import AnnounceHandler from './announce-handler';
import EventVariables from '../../modules/announce/event-variables';

export default class MemberLeaveHandler extends AnnounceHandler {
    on = 'guildMemberRemove';
    event = EventType.MemberLeave;

    async invoke(member: GuildMember) {
        await super.announce(member.guild, [ member ]);
    }

    protected applyEventVariables(content: string, member: GuildMember) {
        return new EventVariables(content)
            .user(member.user)
            .guild(member.guild)
            .memberCount(member.guild)
            .toString();
    }
}
