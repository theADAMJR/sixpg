import { GuildDocument, MessageFilter } from '../../../data/models/guild';
import { ContentValidator } from './content-validator';
import { ValidationError } from '../auto-mod';

export default class MassCapsValidator implements ContentValidator {
    filter = MessageFilter.MassCaps;

    validate(content: string, guild: GuildDocument) {
        const pattern = /[A-Z]/g;
        const severity = guild.autoMod.filterThreshold;
        
        const invalid = content.length > 5 
            && (content.match(pattern)?.length / content.length) >= (severity / 10);
        if (invalid)
            throw new ValidationError('Message contains too many capital letters.', this.filter);
    }
}