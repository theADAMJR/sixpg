import { Command, CommandContext } from "./Command";
import Members from "../data/members";
import Leveling from "../modules/xp/leveling";
import Guilds from "../data/guilds";
import Deps from "../utils/deps";
import CommandUtils from "../utils/command-utils";
import { ModuleString } from "../modules/module";

export default class XPCommand implements Command {
    name = 'xp';
    summary = 'Display the XP card of a user.';
    cooldown = 3;
    module: ModuleString = 'XP';

    constructor(private members = Deps.get<Members>(Members)) {}

    execute = async(ctx: CommandContext, userMention: string) =>  {
        const target = (userMention) ?
            CommandUtils.getMemberFromMention(userMention, ctx.guild) : ctx.member;

        const guildUser = await this.members.get(target);
        const guild = await new Guilds().get(ctx.guild);

        const info = Leveling.xpInfo(guildUser.xpMessages, guild.xp.xpPerMessage);

        await ctx.channel.send(`
            **Level**: ${info.level}\n**XP**: ${info.exp}\n**Next Level**: ${info.xpForNextLevel}`);
    };
}
