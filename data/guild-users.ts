import { GuildMember, User } from "discord.js";
import { GuildUser } from "../models/guild-user";

export default class GuildUsers {
    static async get(member: GuildMember) {
        return this.getOrCreate(member);
    }

    private static async getOrCreate(member: GuildMember) {
        const user = await GuildUser.findById(member.id);
        return user ?? this.create(member);
    }

    private static async create(member: GuildMember) {
        const user = new GuildUser();
        user._id = member.id;
        user.guildId = member.guild.id;
        return user.save();
    }
}