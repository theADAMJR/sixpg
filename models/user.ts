import mongoose from 'mongoose';

declare var XPCard: XPCard;

const userSchema = new mongoose.Schema({
    _id: String,
    votes: Number,
    xpCard: XPCard
});

export interface XPCard {
    backgroundURL: string;
    primary: string;
    secondary: string;
}

export const User = mongoose.model('user', userSchema);