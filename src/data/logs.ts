import { Guild, Message } from 'discord.js';
import DBWrapper from './db-wrapper';
import { LogDocument, SavedLog } from './models/log';
import { Command } from '../commands/command';
import SnowflakeEntity from './snowflake-entity';

export default class Logs extends DBWrapper<SnowflakeEntity, LogDocument> {
    protected async getOrCreate({ id }: SnowflakeEntity) {
        const savedLog = await SavedLog.findById(id);
        return savedLog ?? this.create({ id });
    }

    protected async create({ id }: SnowflakeEntity) {
        return new SavedLog({ _id: id }).save();
    }
    
    async logCommand(msg: Message, command: Command) {
        const log = await this.get(msg.client.user);
        log.commands.push({
            name: command.name,
            by: msg.author.id,
            at: new Date()
        });
        await this.save(log);
    }
}
