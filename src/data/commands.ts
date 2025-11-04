import DBWrapper from './db-wrapper';
import { LogDocument } from './models/log';
import { Command } from '../commands/command';
import { SavedCommand, CommandDocument } from './models/command';

export default class Commands extends DBWrapper<Command, CommandDocument> {
    protected async getOrCreate(command: Command) {
        await this.create(command);
        return SavedCommand.findOne({ name: command.name });
    }

    protected async create(command: Command): Promise<CommandDocument> {        
        await SavedCommand.updateOne(
            { name: command.name },
            { ...command, usage: command.usage ?? this.getCommandUsage(command) } as any,
            { upsert: true }
        );
        return SavedCommand.findOne({ name: command.name }) as Promise<CommandDocument>;
    }

    getCommandUsage(command: Command) {
        const args = command.execute
            .toString()
            .split('{')[0]
            .replace(/function \(|\)/g, '')
            .replace(/,/g, '')
            .replace(/ctx/, '')
            .trim();
        return (args) ? `${command.name} ${args}` : command.name;
    }
}
