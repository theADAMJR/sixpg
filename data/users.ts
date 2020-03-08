import { User as DiscordUser } from "discord.js";
import { User } from "../models/user";

export default class Users {
    static async get(user: DiscordUser) {
        return this.getOrCreate(user);
    }

    private static async getOrCreate(user: DiscordUser) {
        if (user == null) {
            return null;
        }

        const savedUser = await User.findById(user.id);
        return savedUser ?? this.create(user);
    }

    private static async create(user: DiscordUser) {
        return User.create(user);
    }
}