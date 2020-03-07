import Command from "./Command";
import { Message } from "discord.js";

export default class PingCommand implements Command {
    name = 'ping';
    summary = 'Probably the best command ever created.';
    cooldown = 5;
    execute = (msg: Message) => msg.reply('Pong!');
}