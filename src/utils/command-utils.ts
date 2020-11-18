import { GuildMember } from "discord.js";

export default class CommandUtils {
    static getMemberFromMention(mention: string, guild: any): GuildMember {    
        const id = mention.replace(/^<@!?(\d+)>$/gm, '$1') ?? '';
        const member = guild.members.cache.get(id);
        if (!member)
            throw new TypeError('Member not found.');
        
        return member;
    }
}