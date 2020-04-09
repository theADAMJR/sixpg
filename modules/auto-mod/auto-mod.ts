import { Message, GuildMember, User, Guild } from 'discord.js';
import { GuildDocument, MessageFilter } from '../../models/guild';
import { BadWordValidator } from './validators/bad-word.validator';
import { BadLinkValidator } from './validators/bad-link.validator';
import Deps from '../../utils/deps';
import Members from '../../data/members';

export default class AutoMod {
    constructor(private members = Deps.get<Members>(Members)) {}

    readonly validators = new Map([
        [MessageFilter.Words, BadWordValidator],
        [MessageFilter.Links, BadLinkValidator]
    ]);
    
    async validateMsg(msg: Message, guild: GuildDocument) {
        const activeFilters = guild.autoMod.filters;
        for (const filter of activeFilters) {
            try {
                const Validator = this.validators.get(filter);

                Validator && new Validator().validate(msg.content, guild);
            } catch (validation) {
                if (guild.autoMod.autoDeleteMessages) {
                    await msg.delete({ reason: validation });
                }
                if (guild.autoMod.autoWarnUsers && msg.member && msg.client.user) {
                    await this.warnMember(msg.member, msg.client.user, validation?.message);
                }
                throw validation;
            }
        }
    }

    async warnMember(member: GuildMember, instigator: User, reason = 'No reason specified.') {
        if (member.id === instigator.id) {
            throw new TypeError('You cannot warn yourself.');
        }
        if (member.user.bot) {
            throw new TypeError('Bots cannot be warned.');
        }
        const savedMember = await this.members.get(member);
        const warning = { reason, instigatorId: instigator.id, at: new Date() };
        
        savedMember.warnings.push(warning);        
        await this.members.save(savedMember);

        try { // TODO: add CommandUtils.mention(id: string)
            await member.send(`<@!${instigator}> warned you for \`${reason}\``);
        } catch {}
    }
}
