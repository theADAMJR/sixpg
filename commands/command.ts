import { Message } from "discord.js";

export interface Command {
    name: string;
    summary: string;
    cooldown: number;
    execute: (ctx: CommandContext) => any;
}

export interface CommandContext {
    msg: Message;
    args: string[];
}