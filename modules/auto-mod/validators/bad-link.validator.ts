import { BotDocument, MessageFilter } from '../../../data/models/bot';
import { ContentValidator } from './content-validator';
import { ValidationError } from '../auto-mod';

export default class BadLinkValidator implements ContentValidator {
    filter = MessageFilter.Links;

    validate(content: string, guild: BotDocument) {
        const isExplicit = guild.autoMod.banLinks
            .some(l => content.includes(l));
        if (isExplicit) {
            throw new ValidationError('Message contains banned links.', this.filter);
        }
    }
}