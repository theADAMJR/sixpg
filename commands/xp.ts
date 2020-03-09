import { Command, CommandContext } from "./Command";
import GuildUsers from "../data/guild-users";
import { Leveling } from "../modules/xp";

export default class XPCommand implements Command {
    name = 'xp';
    summary = 'Display the XP card of a user.';
    cooldown = 10;
    execute = async(ctx: CommandContext) =>  {
        const guildUser = await GuildUsers.get(ctx.member);
        console.log(guildUser);
        

        await ctx.channel.send(`
            **XP**: ${guildUser?.xpMessages}\n**Next Level**: 123`);
    };
}

