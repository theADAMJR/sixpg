import { BotDocument, SavedBot } from './models/bot';
import DBWrapper from './db-wrapper';
import { Client } from 'discord.js';

export default class Bots extends DBWrapper<Client, BotDocument> {
    protected async getOrCreate(client: Client) {
        const savedBot = await SavedBot.findById(client.user.id);
        return savedBot ?? this.create(client);
    }

    protected create(client: Client) {
        return new SavedBot({ _id: client.user.id }).save();
    }

    async getAll() {
        return await SavedBot.find();
    }
}