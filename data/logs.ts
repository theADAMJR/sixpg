import { Guild, Message } from 'discord.js';
import DBWrapper from './db-wrapper';
import { LogDocument, SavedLog } from './models/log';
import { Command } from '../commands/command';

export default class Logs extends DBWrapper<Guild, LogDocument> {
    protected async getOrCreate(guild: Guild) {
        const savedLog = await SavedLog.findById(guild.id);
        return savedLog ?? this.create(guild);
    }

    protected async create(guild: Guild) {
        return new SavedLog({ _id: guild.id }).save();
    }
    
    async logCommand(msg: Message, command: Command) {
        const log = await this.get(msg.guild);
        log.commands.push({
            name: command.name,
            by: msg.author.id,
            at: new Date()
        });
        await this.save(log);
    }
}
