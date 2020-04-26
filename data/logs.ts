import { Guild } from 'discord.js';
import DBWrapper from './db-wrapper';
import { LogDocument, SavedLog } from '../models/log';

export default class Logs extends DBWrapper<Guild, LogDocument> {
    protected async getOrCreate(guild: Guild) {
        const savedLog = await SavedLog.findById(guild.id);
        return savedLog ?? this.create(guild);
    }

    protected async create(guild: Guild) {
        return new SavedLog({ _id: guild.id }).save();
    }
}
