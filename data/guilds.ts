import { Guild } from "discord.js";
import { GuildDocument, SavedGuild } from "../models/guild";
import DBWrapper from "./db-wrapper";

export default class Guilds implements DBWrapper<GuildDocument, Guild> {
    get(guild: Guild) {
        return this.getOrCreate(guild);
    }

    private async getOrCreate(guild: Guild) {
        const savedGuild = await SavedGuild.findById(guild.id);
        return savedGuild ?? this.create(guild);
    }

    private create(guild: Guild) {
        const newGuild = new SavedGuild();
        newGuild._id = guild.id;

        return newGuild.save();
    }
}