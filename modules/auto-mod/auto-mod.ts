import { Message, GuildMember, User, Guild } from "discord.js";
import { GuildDocument, MessageFilter } from "../../models/guild";
import { BadWordValidator } from "./validators/bad-word.validator";
import { BadLinkValidator } from "./validators/bad-link.validator";
import Members from "../../data/members";

export default class AutoMod {
    static members = new Members();

    static readonly validators : Map<MessageFilter, typeof BadWordValidator> = new Map([
        [MessageFilter.Words, BadWordValidator],
        [MessageFilter.Links, BadLinkValidator]
    ]);
    
    static async validateMsg(msg: Message, guild: GuildDocument) {
        const activeFilters = guild.autoMod.filters;
        for (const filter of activeFilters) {
            try {
                const Validator = this.validators.get(filter);

                Validator && new Validator().validate(msg.content, guild);
            } catch (validation) {
                if (guild.autoMod.autoDeleteMessages) {
                    await msg.delete({ reason: validation });
                }
                if (guild.autoMod.alertWarnedUsers && msg.member && msg.client.user) {
                    await AutoMod.warnMember(msg.member, msg.client.user, validation);
                }
                throw validation;
            }
        }
    }

    static async warnMember(member: GuildMember, instigator: User, reason = "No reason specified.") {
        if (member.id === instigator.id) {
            throw new Error('You cannot warn yourself.');
        }
        
        const savedMember = await this.members.get(member);
        const warning = { reason, instigatorId: instigator.id, at: new Date() };
        
        savedMember.warnings.push(warning);
        this.members.save(savedMember);

        await member.send(`${instigator} warned you for \`${reason}\``);
    }
}
