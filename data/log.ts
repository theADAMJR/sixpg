import { Guild } from 'discord.js';
import DBWrapper from './db-wrapper';
import { AuditLog, SavedLog } from '../models/log';

export default class Users extends DBWrapper<Guild, AuditLog> {
    protected async getOrCreate(guild: Guild) {
        const savedLog = await SavedLog.findById(guild.id);
        return savedLog ?? this.create(guild);
    }

    protected async create(guild: Guild) {
        return new SavedLog({ _id: guild.id }).save();
    }
}
