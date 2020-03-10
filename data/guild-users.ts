import { GuildMember, Guild } from "discord.js";
import { GuildUser } from "../models/guild-user";
import DBWrapper from "./db-wrapper";

export default class GuildUsers implements DBWrapper<GuildUser, GuildMember> {
    async get(member: GuildMember) {
        return this.getOrCreate(member);
    }

    private async getOrCreate(member: GuildMember) {
        const user = await GuildUser.findById(member.id);
        return user ?? this.create(member);
    }

    private async create(member: GuildMember) {
        const user = new GuildUser();
        user._id = member.id;
        user.guildId = member.guild.id;
        return user.save();
    }
}