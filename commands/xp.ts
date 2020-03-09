import { Command, CommandContext } from "./Command";
import GuildUsers from "../data/guild-users";
import Leveling from "../modules/leveling";
import Guilds from "../data/guilds";

export default class XPCommand implements Command {
    name = 'xp';
    summary = 'Display the XP card of a user.';
    cooldown = 10;
    execute = async(ctx: CommandContext) =>  {
        const guildUser = await GuildUsers.get(ctx.member);
        const guild = await Guilds.get(ctx.guild);

        const info = Leveling.xpInfo(guildUser.xpMessages, guild.xp.xpPerMessage);

        await ctx.channel.send(`
            **Level**: ${info.level}\n**XP**: ${info.exp}\n**Next Level**: ${info.xpForNextLevel}`);
    };
}

