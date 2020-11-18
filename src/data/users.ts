import { User } from 'discord.js';
import { SavedUser, UserDocument } from './models/user';
import DBWrapper from './db-wrapper';

export default class Users extends DBWrapper<PartialUser, UserDocument> {
    protected async getOrCreate(user: PartialUser) {
        if (user.bot)
            throw new TypeError(`Bots don't have accounts`);

        const savedUser = await SavedUser.findById(user.id);
        return savedUser ?? this.create(user);
    }

    async delete(user: PartialUser) {
        return await SavedUser.findByIdAndDelete(user.id);
    }

    protected async create(user: PartialUser) {
        return new SavedUser({ _id: user.id }).save();
    }
}

export interface PartialUser { id: string, bot: boolean }