import { Command, CommandContext, Permission } from './command';
import AutoMod from '../modules/auto-mod/auto-mod';
import Deps from '../utils/deps';
import CommandUtils from '../utils/command-utils';

export default class WarnCommand implements Command {
    name = 'warn';
    summary = 'Warn a user and add a warning to their account.';
    precondition: Permission = 'KICK_MEMBERS';
    cooldown = 5;
    module = 'Auto-mod';
    
    constructor(private autoMod = Deps.get<AutoMod>(AutoMod)) {}
    
    execute = async(ctx: CommandContext, targetMention: string, reason?: string) => {
        const target = (targetMention) ?
            CommandUtils.getMemberFromMention(targetMention, ctx.guild) : ctx.member;
        
        await this.autoMod.warn(target, ctx.user, reason);

        await ctx.channel.send(`${target} was warned for ${reason}`);
    };
}
