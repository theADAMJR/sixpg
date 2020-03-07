import mongoose from 'mongoose';

const guildUserSchema = new mongoose.Schema({
    _id: String,
    xpMessages: Number,
    warnings: Number
});

export const GuildUser = mongoose.model('guildUser', guildUserSchema);