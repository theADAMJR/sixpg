import { User } from "discord.js";
import { SavedUser, UserDocument } from "../models/user";

export default class Users {
    get(user: User) {
        return this.getOrCreate(user);
    }

    private async getOrCreate(user: User) {
        if (user.bot)
            throw new Error(`Bots don't have accounts`);

        const savedUser = await SavedUser.findById(user.id);
        return savedUser ?? this.create(user);
    }

    private create(user: User) {
        return SavedUser.create(user);
    }

    save(user: UserDocument) {
        return user.save();
    }
}