import { model, Schema, Document } from 'mongoose';

export class Change {
    public at = new Date();

    constructor(
        public by: string,
        public changes: { old: {}, new: {}},
        public module: string) {}
}

export interface CommandLog {
    name: string,
    by: string,
    at: Date
}

const LogSchema = new Schema({
    _id: String,
    changes: { type: Array, default: [] },
    commands: { type: Array, default: [] }
});

export interface LogDocument extends Document {
    _id: string;
    changes: Change[];
    commands: CommandLog[]
}

export const SavedLog = model<LogDocument>('log', LogSchema);