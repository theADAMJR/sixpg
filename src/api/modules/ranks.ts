import { MemberDocument } from "../../data/models/member";
import { GuildMember } from "discord.js";

export default class Ranks {
    static get(member: GuildMember, savedMembers: MemberDocument[]) {
        return savedMembers
            .sort((a, b) => b.xp - a.xp)
            .findIndex(m => m.userId === member.id) + 1;
    }
}
