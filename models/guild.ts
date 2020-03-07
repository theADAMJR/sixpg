import mongoose from 'mongoose';
import { XPModule } from '../modules/xp/XP';

const guildSchema = new mongoose.Schema({
    _id: String,
    // add all modules
    xp: XPModule
})

export mongoose.model('guild', guildSchema);