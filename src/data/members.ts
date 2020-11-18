import { GuildMember } from 'discord.js';
import { MemberDocument, SavedMember } from './models/member';
import DBWrapper from './db-wrapper';

export default class Members extends DBWrapper<GuildMember, MemberDocument> {
    protected async getOrCreate(member: GuildMember) {
        if (member.user.bot)
            throw new TypeError(`Bots don't have accounts`);

        const user = await SavedMember.findOne({
            userId: member.id,
            guildId: member.guild.id
        });
        return user ?? this.create(member);
    }

    protected create(member: GuildMember) {
        return new SavedMember({
            userId: member.id,
            guildId: member.guild.id
        }).save();
    }
}