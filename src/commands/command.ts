import { Message, GuildMember, TextChannel, Guild, User, Client, PermissionString } from 'discord.js';

export type Permission = '' | PermissionString;

export interface Command {
    cooldown?: number;
    module: string;
    name: string;
    precondition?: Permission;
    summary: string;
    usage?: string;
    
    execute: (ctx: CommandContext, ...args: any) => Promise<any> | void;
}

export class CommandContext {
    msg: Message;
    member: GuildMember;
    channel: TextChannel;
    guild: Guild;
    user: User;
    bot: Client;
    
    constructor(msg: any) {
        this.msg = msg;
        this.member = msg.member;
        this.channel = msg.channel;
        this.guild = msg.guild;
        this.user = msg.member.user;
        this.bot = msg.client;
    }
}