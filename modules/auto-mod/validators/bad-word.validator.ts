import { BotDocument, MessageFilter } from '../../../data/models/bot';
import { ContentValidator } from './content-validator';
import { ValidationError } from '../auto-mod';

export default class BadWordValidator implements ContentValidator {
    filter = MessageFilter.Words;

    validate(content: string, guild: BotDocument) {
        const msgWords = content.split(' ');
        for (const word of msgWords) {
            const isExplicit = guild.autoMod.banWords
                .some(w => w.toLowerCase() === word.toLowerCase());
            if (isExplicit) {
                throw new ValidationError('Message contains banned words.', this.filter);
            }
        }
    }
}