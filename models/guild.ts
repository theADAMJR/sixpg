import { model, Schema, Document } from 'mongoose';
import { GeneralModule } from '../modules/general';
import Module from '../modules/module';

export class XPModule extends Module {
    levelRoles: LevelRole[] = [];
    ignoredRoles: string[] = [];
    xpPerMessage = 50;
    xpCooldown = 5;
}

export interface LevelRole {
    level: number;
    role: string;
}

const guildSchema = new Schema({
    _id: String,
    general: { type: Object, default: new GeneralModule() },
    music: Object,
    xp: { type: Object, default: new XPModule() }
});

export interface GuildDocument extends Document {
    _id: string;
    general: GeneralModule;
    music: object;
    xp: XPModule;
}

export const SavedGuild = model<GuildDocument>('guild', guildSchema);