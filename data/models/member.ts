import { model, Schema, Document } from 'mongoose';

const memberSchema = new Schema({
    userId: String,
    guildId: String,
    recentMessages: { type: Array, default: [] },
    warnings: { type: Array, default: [] },
    xp: { type: Number, default: 0 }
});

export interface MemberDocument extends Document {
    userId: string;
    guildId: string;
    recentMessages: Date[];
    warnings: Warning[];
    xp: number;
}

export interface Warning {
    reason: string;
    instigatorId: string;
    at: Date;
}

export const SavedMember = model<MemberDocument>('member', memberSchema);