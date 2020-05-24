import { model, Schema, Document } from 'mongoose';

export type ModuleString = 'Auto-mod' | 'Announce' | 'General' | 'Music' | 'XP';

export class Module {
    enabled = true;
}

export class AnnounceModule extends Module {
    events: AnnounceEvent[] = [];
}

export enum EventType { MemberJoin, MemberLeave, MessageDeleted }

export interface AnnounceEvent {
    event: EventType;
    channel: string;
    message: string;
}

export class AutoModModule extends Module {
    ignoredRoles: string[] = [];
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
    prefix = '/';
    ignoredChannels: string[] = [];
    autoRoles: string[] = [];
}

export class LevelingModule extends Module {
    levelRoles: LevelRole[] = [];
    ignoredRoles: string[] = [];
    xpPerMessage = 50;
    xpCooldown = 5;
}

export interface LevelRole {
    level: number;
    role: string;
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

const guildSchema = new Schema({
    _id: String,
    announce: { type: Object, default: new AnnounceModule() }, 
    autoMod: { type: Object, default: new AutoModModule() }, 
    commands: { type: Object, default: new CommandsModule() },
    general: { type: Object, default: new GeneralModule() },
    leveling: { type: Object, default: new LevelingModule() },
    music: { type: Object, default: new MusicModule },
    settings: { type: Object, default: new DashboardSettings() }
});

export interface GuildDocument extends Document {
    _id: string;
    announce: AnnounceModule;
    autoMod: AutoModModule;
    general: GeneralModule;
    music: MusicModule;
    leveling: LevelingModule;
    commands: CommandsModule;
    settings: DashboardSettings;
}

export const SavedGuild = model<GuildDocument>('guild', guildSchema);
