import { GuildMember } from 'discord.js';
import { MemberDocument, SavedMember } from '../models/member';
import DBWrapper from './db-wrapper';

export default class Members extends DBWrapper<GuildMember, MemberDocument> {
    protected async getOrCreate(member: GuildMember) {
        if (member.user.bot)
            throw new TypeError(`Bots don't have accounts`);

        const user = await SavedMember.findById(member.id);
        return user ?? this.create(member);
    }

    protected async create(member: GuildMember) {
        const newMember = new SavedMember();
        newMember.id = member.id;
        newMember.guildId = member.guild.id;
        return newMember.save();
    }
}