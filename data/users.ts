import { User } from "discord.js";
import { SavedUser, UserDocument } from "../models/user";
import DBWrapper from "./db-wrapper";

export default class Users implements DBWrapper<UserDocument, User> {
    get(user: User) {
        return this.getOrCreate(user);
    }

    private async getOrCreate(user: User) {
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