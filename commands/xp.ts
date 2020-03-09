import { Command, CommandContext } from "./Command";
import GuildUsers from "../data/guild-users";
import { Leveling } from "../modules/leveling";
import Guilds from "../data/guilds";

export default class XPCommand implements Command {
    name = 'xp';
    summary = 'Display the XP card of a user.';
    cooldown = 10;
    execute = async(ctx: CommandContext) =>  {
        const guildUser = await GuildUsers.get(ctx.member);
        const guild = await Guilds.get(ctx.guild);

        const level = Leveling.getLevel(guildUser.xpMessages, guild.xp.xpPerMessage);   
        const xp = guild.xp.xpPerMessage * guildUser.xpMessages;     
        const xpForNextLevel = Leveling.xpForNextLevel(level, xp);      

        await ctx.channel.send(`
            **Level**: ${level}\n**XP**: ${xp}\n**Next Level**: ${xpForNextLevel}`);
    };
}

