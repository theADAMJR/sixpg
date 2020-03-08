import { Guild as DiscordGuild } from "discord.js";
import { SavedGuild } from "../models/guild";

export default class Guilds {
    static async get(guild: DiscordGuild | null) {
        return this.getOrCreate(guild);
    }

    private static async getOrCreate(guild: DiscordGuild | null) {
        if (!guild) {
            return null;
        }

        const user = await SavedGuild.findById(guild.id);
        return user ?? this.create(guild);
    }

    private static async create(guild: DiscordGuild) {
        return SavedGuild.create(guild);
    }
}