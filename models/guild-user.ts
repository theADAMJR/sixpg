import { model, Schema, Document } from 'mongoose';

const guildUserSchema = new Schema({
    _id: String,
    guildId: String,
    xpMessages: { type: Number, default: 0 },
    warnings: { type: Array, default: [] }
});

export interface GuildUser extends Document {
    _id: string;
    guildId: string;
    xpMessages: number;
    warnings: Warning[];
}

export interface Warning {
    reason: string;
    instigatorId: string;
    at: Date;
}

export const GuildUser = model<GuildUser>('guildUser', guildUserSchema);