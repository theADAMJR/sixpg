import { Command, CommandContext } from "./Command";
import { Message } from "discord.js";

export default class XPCommand implements Command {
    name = 'xp';
    summary = 'Display the XP card of a user.';
    cooldown = 10;
    execute = (ctx: CommandContext) => ctx.msg.channel.send('Coming soon!');
}

