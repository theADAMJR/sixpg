import { SavedMember, MemberDocument } from "../../models/member";
import { GuildMember } from "discord.js";

export default class Ranks {
    static get(member: GuildMember, savedMembers: MemberDocument[]) {
        const savedMember = savedMembers
            .sort((a, b) => b.xpMessages - a.xpMessages)
            .find(m => m.userId === member.id);
        
        return savedMembers.indexOf(savedMember) + 1;
    }
}
