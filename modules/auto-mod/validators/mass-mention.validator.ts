import { GuildDocument, MessageFilter } from '../../../data/models/guild';
import { ContentValidator } from './content-validator';
import { ValidationError } from '../auto-mod';

export default class MassMentionValidator implements ContentValidator {
    filter = MessageFilter.MassMention;
    
    validate(content: string, guild: GuildDocument) {
        const pattern = /<@![0-9]{18}>/gm;
        const severity = guild.autoMod.filterThreshold;       

        const invalid = content.match(pattern)?.length >= severity;
        if (invalid)
            throw new ValidationError('Message contains too many mentions.', this.filter);
    }
}