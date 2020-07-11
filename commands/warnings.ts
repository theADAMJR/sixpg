import { Command, CommandContext, Permission } from './command';
import Members from '../data/members';
import { TextChannel } from 'discord.js';
import { MemberDocument } from '../data/models/member';
import Deps from '../utils/deps';
import CommandUtils from '../utils/command-utils';

export default class WarningsCommand implements Command {
    name = 'warnings';
    summary = 'Display the warnings of a member.';
    precondition: Permission = 'VIEW_AUDIT_LOG';
    cooldown = 3;
    module = 'Auto-mod';

    constructor(
        private members = Deps.get<Members>(Members)) {}
    
    execute = async(ctx: CommandContext, userMention?: string, position?: string) => {
        const target = (userMention) ?
            CommandUtils.getMemberFromMention(userMention, ctx.guild) : ctx.member;

        const savedMember = await this.members.get(target);
        
        if (position)
            return this.displayWarning(+position, savedMember, ctx.channel);

        await ctx.channel.send(`User has \`${savedMember.warnings.length}\` warnings.`)
    }

    private async displayWarning(position: number, savedMember: MemberDocument, channel: TextChannel) {
        if (position <= 0 || position > savedMember.warnings.length)
            throw new TypeError('Warning at position not found on user.');

        const warning = savedMember.warnings[position - 1];
        const instigator = channel.client.users.cache.get(warning.instigatorId);
        channel.send(`**Warning #${position}**\n**By**: <@!${instigator ?? 'N/A'}>\n**For**: \`${warning.reason}\``);
    }
}
