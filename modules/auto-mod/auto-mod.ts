import { Message, GuildMember, User } from 'discord.js';
import { BotDocument, MessageFilter } from '../../data/models/bot';
import Deps from '../../utils/deps';
import Members from '../../data/members';
import Log from '../../utils/log';
import { ContentValidator } from './validators/content-validator';
import { promisify } from 'util';
import fs from 'fs';

const readdir = promisify(fs.readdir);

export default class AutoMod {
    private validators: ContentValidator[] = [];

    constructor(private members = Deps.get<Members>(Members)) {}

    async init() {
        const directory = './modules/auto-mod/validators';
        const files = await readdir(directory);

        for (const file of files) {
            const Validator = require(`./validators/${file}`).default;
            if (!Validator) continue;

            this.validators.push(new Validator());
        }
        Log.info(`Loaded: ${this.validators.length} validators`, `automod`);
    }
    
    async validateMsg(msg: Message, guild: BotDocument) {
        const activeFilters = guild.autoMod.filters;
        for (const filter of activeFilters) {
            try {                
                const validator = this.validators.find(v => v.filter === filter);
                validator?.validate(msg.content, guild);
            } catch (validation) {
                if (guild.autoMod.autoDeleteMessages)
                    await msg.delete({ reason: validation.message });
                if (guild.autoMod.autoWarnUsers && msg.member && msg.client.user)
                    await this.warn(msg.member, msg.client.user, validation.message);

                throw validation;
            }
        }
    }

    async warn(member: GuildMember, instigator: User, reason = 'No reason specified.') {
        if (member.id === instigator.id)
            throw new TypeError('You cannot warn yourself.');
        if (member.user.bot)
            throw new TypeError('Bots cannot be warned.');

        const savedMember = await this.members.get(member);
        const warning = { reason, instigatorId: instigator.id, at: new Date() };
        
        savedMember.warnings.push(warning);        
        await this.members.save(savedMember);

        try {
            await member.send(`<@!${instigator}> warned you for \`${reason}\``);
        } catch {}
    }
}

export class ValidationError extends Error {
    constructor(message: string, public filter: MessageFilter) {
        super(message);
    }
}
