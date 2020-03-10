import { GuildMember, Guild } from "discord.js";
import { MemberDocument, Member } from "../models/guild-user";
import DBWrapper from "./db-wrapper";

export default class GuildUsers implements DBWrapper<MemberDocument, GuildMember> {
    async get(member: GuildMember) {
        return this.getOrCreate(member);
    }

    private async getOrCreate(member: GuildMember) {
        const user = await Member.findById(member.id);
        return user ?? this.create(member);
    }

    private async create(member: GuildMember) {
        const user = new Member();
        user._id = member.id;
        user.guildId = member.guild.id;
        return user.save();
    }
}