import { GuildDocument } from '../../../data/models/guild';
import { ContentValidator } from './content-validator';

export class BadLinkValidator implements ContentValidator {
    validate(content: string, guild: GuildDocument) {
        const isExplicit = guild.autoMod.banLinks
            .some(l => content.includes(l));
        if (isExplicit) {
            throw new TypeError('Message contains banned links.');
        }
    }
}