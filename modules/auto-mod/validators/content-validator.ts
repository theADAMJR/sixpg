import { GuildDocument, EventType } from '../../../models/guild';

export interface ContentValidator {
    validate(content: string, guild: GuildDocument): void;
}