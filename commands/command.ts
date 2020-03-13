import { Message, GuildMember, TextChannel, Guild, User, Client, PermissionString } from "discord.js";

export interface Command {
    name: string;
    summary: string;
    cooldown: number;
    precondition?: PermissionString;
    
    execute: (ctx: CommandContext) => Promise<any> | void;
}

export class CommandContext {
    msg: Message;
    member: GuildMember;
    channel: TextChannel;
    guild: Guild;
    user: User;
    bot: Client;
    args: string[];
    
    constructor(msg: any) {
        this.msg = msg;
        this.member = msg.member;
        this.channel = msg.channel;
        this.guild = msg.guild;
        this.user = msg.member.user;
        this.bot = msg.client;
        this.args = this.getCommandArgs(msg.content);
    }

    private getCommandArgs(content: string) {
        return content.split(' ').splice(1, 1);
    }
}