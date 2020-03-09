import { Message, GuildMember, TextChannel, Guild } from "discord.js";

export interface Command {
    name: string;
    summary: string;
    cooldown: number;
    execute: (ctx: CommandContext) => Promise<any> | void;
}

export class CommandContext {
    msg: Message;
    member: GuildMember;
    channel: TextChannel;
    guild: Guild;
    args: string[];
    
    constructor(msg: any) {
        this.msg = msg;
        this.member = msg.member;
        this.channel = msg.channel;
        this.guild = msg.guild;
        this.args = this.getCommandArgs(msg.content);
    }

    private getCommandArgs(content: string) {
        return content.split(' ').splice(0, 1);
    }
}