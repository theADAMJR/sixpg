import { Message, GuildMember, User } from "discord.js";
import { GuildDocument, MessageFilter } from "../../models/guild";
import { BadWordValidator } from "./validators/bad-word.validator";
import { BadLinkValidator } from "./validators/bad-link.validator";
import GuildUsers from "../../data/guild-users";

export default class AutoMod {
    static guildUsers = new GuildUsers();

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
                if (guild.autoMod.alertWarnedUsers && msg.member && msg.client.user) {
                    await AutoMod.warnMember(msg.member, msg.client.user, validation);
                }
                throw validation;
            }            
        }
    }

    static async warnMember(member: GuildMember, instigator: User, reason = "No reason specified.") {
        const savedMember = await GuildUsers.get(member);
        const warning = { reason, instigatorId: instigator.id, at: new Date() };
        
        savedMember.warnings.push(warning);
        await savedMember.save();

        await member.send(`${instigator} warned you for \`${reason}\``);
    }
}

