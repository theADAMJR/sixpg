import { Command, CommandContext } from "./Command";
import { Message } from "discord.js";

export default class PingCommand implements Command {
    name = 'ping';
    summary = 'Probably the best command ever created.';
    cooldown = 5;
    execute = (ctx: CommandContext) => ctx.msg.channel.send('Pong!');
}