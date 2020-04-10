import { model, Schema, Document } from 'mongoose';

export class Change {
    private at = new Date();

    constructor(
        private by: string,
        private oldValue: any,
        private newValue: any,
        private module: string) {}
}

const LogSchema = new Schema({
    _id: String,
    changes: { type: Array, default: [] }
});

export interface AuditLog extends Document {
    _id: string;
    changes: Change[];
}

export const SavedLog = model<AuditLog>('log', LogSchema);