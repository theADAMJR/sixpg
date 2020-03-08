import mongoose, { Schema, Document } from 'mongoose';

const guildUserSchema = new mongoose.Schema({
    _id: String,
    guildId: String,
    xpMessages: Number,
    warnings: Number
});

export interface GuildUser extends Document {
    _id: string;
    guildId: string;
    xpMessages: number;
    warnings: number;
}

export const GuildUser = mongoose.model<GuildUser>('guildUser', guildUserSchema);