import { Message, Collection } from "discord.js";
import { GuildDocument, MessageFilter } from "../../models/guild";
import { BadWordValidator } from "./validators/bad-word.validator";
import { BadLinkValidator } from "./validators/bad-link.validator";
import { ContentValidator } from "./validators/content-validator";

export default class AutoMod {
    static readonly validators : Map<MessageFilter, typeof BadWordValidator> = new Map([
        [MessageFilter.Words, BadWordValidator],
        [MessageFilter.Links, BadLinkValidator]
    ]);
    
    static async validateMsg(msg: Message, guild: GuildDocument) {
        const activeFilters = guild.autoMod.filters;
        for (const filter of activeFilters) {
            try {
                const Validator = AutoMod.validators.get(filter);
                
                Validator && new Validator().validate(msg.content, guild);
            } catch (validation) {
                if (guild.autoMod.autoDeleteMessages) {
                    await msg.delete({ reason: validation });
                }
                throw validation;
            }            
        }
    }
}

