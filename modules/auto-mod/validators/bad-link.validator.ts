import { GuildDocument, MessageFilter } from '../../../data/models/guild';
import { ContentValidator } from './content-validator';
import { ValidationError } from '../auto-mod';

export default class BadLinkValidator implements ContentValidator {
    filter = MessageFilter.Links;

    validate(content: string, guild: GuildDocument) {
        const isExplicit = guild.autoMod.banLinks
            .some(l => content.includes(l));
        if (isExplicit) {
            throw new ValidationError('Message contains banned links.', this.filter);
        }
    }
}