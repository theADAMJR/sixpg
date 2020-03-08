import mongoose from 'mongoose';
import { XPModule } from '../modules/xp';

const guildSchema = new mongoose.Schema({
    _id: String,
    general: Object,
    music: Object,
    xp: Object
});

export interface GuildDocument extends Document {
    _id: string;
    general: object;
    music: object;
    xp: XPModule;
}

export const SavedGuild = mongoose.model<GuildDocument>('guild', guildSchema);