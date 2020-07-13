import { model, Schema, Document } from 'mongoose';

export class Module {
    enabled = true;
}

export class AnnounceModule extends Module {
    events: AnnounceEvent[] = [];
}

export enum EventType { MemberJoin, MemberLeave, MessageDeleted }

export interface AnnounceEvent {
    event: EventType;
    channelName: string;
    message: string;
}

export class AutoModModule extends Module {
    ignoredRoleNames: string[] = [];
    autoDeleteMessages = true;
    filters: MessageFilter[] = [];
    banWords: string[] = [];
    banLinks: string[] = [];
    autoWarnUsers = true;
    filterThreshold = 5;
}

export class CommandsModule extends Module {
    configs: CommandConfig[] = [];
}

export enum MessageFilter {
    Links = 'LINKS',
    MassCaps = 'MASS_CAPS',
    MassMention = 'MASS_MENTION',
    Words = 'WORDS'
}

export class GeneralModule extends Module {
    prefix = '.';
    ignoredChannelNames: string[] = [];
    autoRoleNames: string[] = [];
}

export class LevelingModule extends Module {
    levelRoleNames: LevelRole[] = [];
    ignoredRoleNames: string[] = [];
    xpPerMessage = 50;
    xpCooldown = 5;
    maxMessagesPerMinute = 3;
}

export interface LevelRole {
    level: number;
    roleName: string;
}

export class MusicModule extends Module {
    
}

export interface CommandConfig {
    name: string;
    enabled: boolean;
}

export class DashboardSettings {
    privateLeaderboard = false;
}

const botSchema = new Schema({
    _id: String,
    announce: { type: Object, default: new AnnounceModule() }, 
    autoMod: { type: Object, default: new AutoModModule() }, 
    commands: { type: Object, default: new CommandsModule() },
    general: { type: Object, default: new GeneralModule() },
    leveling: { type: Object, default: new LevelingModule() },
    music: { type: Object, default: new MusicModule },
    ownerId: String,
    settings: { type: Object, default: new DashboardSettings() },
    tokenHash: String
});

export interface BotDocument extends Document {
    _id: string;
    announce: AnnounceModule;
    autoMod: AutoModModule;
    commands: CommandsModule;
    general: GeneralModule;
    leveling: LevelingModule;
    music: MusicModule;
    ownerId: string;
    tokenHash: string;
    settings: DashboardSettings;
}

export const SavedBot = model<BotDocument>('bot', botSchema);
