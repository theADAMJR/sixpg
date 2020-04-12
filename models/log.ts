import { model, Schema, Document } from 'mongoose';

export class Change {
    public at = new Date();

    constructor(
        public by: string,
        public changes: { old: {}, new: {}},
        public module: string) {}
}

const LogSchema = new Schema({
    id: String,
    changes: { type: Array, default: [] }
});

export interface AuditLog extends Document {
    id: string;
    changes: Change[];
}

export const SavedLog = model<AuditLog>('log', LogSchema);