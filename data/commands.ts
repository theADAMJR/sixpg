import DBWrapper from './db-wrapper';
import { AuditLog as LogDocument, SavedLog } from '../models/log';
import { Command } from '../commands/command';
import { SavedCommand } from '../models/command';

export default class Commands extends DBWrapper<Command, LogDocument> {
    protected async getOrCreate(command: Command) {
        return this.create(command);
    }

    protected async create(command: Command) {                
        return SavedCommand.updateOne({ name: command.name },
                { ...command, usage: this.getCommandUsage(command) }, 
                { upsert: true });
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
