import { User } from 'discord.js';
import { SavedUser, UserDocument } from '../models/user';
import DBWrapper from './db-wrapper';

export default class Users extends DBWrapper<User, UserDocument> {
    protected async getOrCreate(user: User) {
        if (user.bot)
            throw new TypeError(`Bots don't have accounts`);

        const savedUser = await SavedUser.findById(user.id);
        return savedUser ?? this.create(user);
    }

    protected async create(user: User) {
        return new SavedUser({ id: user.id }).save();
    }
}