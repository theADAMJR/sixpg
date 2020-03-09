import { Guild as DiscordGuild } from "discord.js";
import { GuildDocument, SavedGuild } from "../models/guild";

export default class Guilds {
    static get(guild: DiscordGuild) {
        return this.getOrCreate(guild);
    }

    private static async getOrCreate(guild: DiscordGuild) {
        const savedGuild = await SavedGuild.findById(guild.id);
        return savedGuild ?? this.create(guild);
    }

    private static create(guild: DiscordGuild) {
        const newGuild = new SavedGuild();
        newGuild._id = guild.id;

        return newGuild.save();
    }
}