import { model, Schema, Document } from 'mongoose';
import { ModuleString } from './guild';
import { PermissionString } from 'discord.js';

const commandSchema = new Schema({
    name: String,
    summary: String,
    module: String,
    usage: String,
    precondition: String
});

export interface CommandDocument extends Document {
    name: string;
    summary: string;
    module: ModuleString;
    usage: string;
    precondition?: PermissionString;
}

export const SavedCommand = model<CommandDocument>('command', commandSchema);