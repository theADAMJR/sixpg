import { Message } from "discord.js";

export default interface Command {
    name: string;
    summary: string;
    cooldown: number;
    execute: (msg: Message) => any;
}