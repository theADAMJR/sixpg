import { model, Schema, Document } from 'mongoose';
import { PermissionsString } from 'discord.js';

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
    module: string;
    usage: string;
    precondition?: PermissionsString;
}

export const SavedCommand = model<CommandDocument>('command', commandSchema);