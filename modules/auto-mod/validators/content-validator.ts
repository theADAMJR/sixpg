import { BotDocument, MessageFilter } from '../../../data/models/bot';

export interface ContentValidator {
    filter: MessageFilter;
    
    validate(content: string, guild: BotDocument): void;
}