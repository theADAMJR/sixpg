import { User } from 'discord.js';
import { SavedUser, UserDocument } from './models/user';
import DBWrapper from './db-wrapper';
import { AuthUser } from '../api/routes/user-routes';

export default class Users extends DBWrapper<User | AuthUser, UserDocument> {
    protected async getOrCreate(user: User | AuthUser) {
        if (user.bot)
            throw new TypeError(`Bots don't have accounts`);

        const savedUser = await SavedUser.findById(user.id);
        return savedUser ?? this.create(user);
    }

    async delete(user: User | AuthUser) {
        return await SavedUser.findByIdAndDelete(user.id);
    }

    protected async create(user: User | AuthUser) {
        return new SavedUser({ _id: user.id }).save();
    }
}