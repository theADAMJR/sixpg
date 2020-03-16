import { Command, CommandContext } from "./command";
import Members from "../data/members";
import { TextChannel, PermissionFlags, PermissionString } from "discord.js";
import { MemberDocument } from "../models/member";
import Deps from "../utils/deps";

export default class WarningsCommand implements Command {
    name = 'warnings';
    summary = 'Display the warnings of a member.';
    cooldown = 5;
    precondition: PermissionString = 'KICK_MEMBERS';

    constructor(private members = Deps.get<Members>(Members)) {}
    
    execute = async(ctx: CommandContext, position?: number) => {
        const target = ctx.msg.mentions.members?.first() ?? ctx.member;
        const savedMember = await this.members.get(target);    

        if (position && Number.isInteger(position))
            return this.displayWarning(position, savedMember, ctx.channel);

        await ctx.channel.send(`User has \`${savedMember.warnings.length}\` warnings.`)
    }

    private async displayWarning(position: number, savedMember: MemberDocument, channel: TextChannel) {
        if (position <= 0 || position > savedMember.warnings.length)
            throw new Error('Warning at position not found on user.');

        const warning = savedMember.warnings[position - 1];
        const instigator = channel.client.users.cache.get(warning.instigatorId);
        channel.send(`**Warning #${position}**\n**By**: <@!${instigator ?? 'N/A'}>\n**For**: \`${warning.reason}\``);
    }
}
