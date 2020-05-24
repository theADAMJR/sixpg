import { GuildDocument, EventType } from '../../../data/models/guild';

export interface ContentValidator {
    validate(content: string, guild: GuildDocument): void;
}