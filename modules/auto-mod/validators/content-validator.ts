import { GuildDocument, EventType, MessageFilter } from '../../../data/models/guild';

export interface ContentValidator {
    filter: MessageFilter;
    
    validate(content: string, guild: GuildDocument): void;
}