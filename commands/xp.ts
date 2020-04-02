import { Command, CommandContext } from "./Command";
import CommandUtils from "../utils/command-utils";
import { ModuleString } from "../modules/module";
import config from '../config.json';

export default class XPCommand implements Command {
    name = 'xp';
    summary = 'Display the XP card of a user.';
    cooldown = 3;
    module: ModuleString = 'XP';

    execute = async(ctx: CommandContext, userMention: string) =>  {
        const target = (userMention) ?
            CommandUtils.getMemberFromMention(userMention, ctx.guild) : ctx.member;

        const xpCardURL = `${config.apiURL}/guilds/${ctx.guild.id}/members/${target.id}/xp-card`;             
        return ctx.channel.send({ files: [{
            attachment: xpCardURL,
            name: 'xp-card.png'
        }]});
    };
}
