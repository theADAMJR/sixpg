import { Command, CommandContext } from "./Command";
import AutoMod from "../modules/auto-mod/auto-mod";
import Deps from "../deps";

export default class PingCommand implements Command {
    name = 'warn';
    summary = 'Warn a user and add a warning to their account.';
    cooldown = 5;
    constructor(private autoMod = Deps.get<AutoMod>(AutoMod)) {}
    
    execute = async(ctx: CommandContext) => {
        const target = ctx.msg.mentions.members?.first();        
        if (!target) {
            throw new Error('User could not be found.');
        }

        const reason = ctx.args[1];
        
        await this.autoMod.warnMember(target, ctx.user, reason);

        await ctx.channel.send(`${target} was warned for ${reason}`);
    };
}
