import { Message, GuildMember } from 'discord.js';
import { GuildDocument } from '../../models/guild';
import Members from '../../data/members';
import Deps from '../../utils/deps';
import { MemberDocument } from '../../models/member';

export default class Leveling {
    constructor(private members = Deps.get<Members>(Members)) {}

    async validateXPMsg(msg: Message, guild: GuildDocument) {
        if (!msg?.member || !guild || this.hasIgnoredXPRole(msg.member, guild))
            throw new TypeError('Member cannot earn XP');

        const savedMember = await this.members.get(msg.member);
        if (!savedMember) return;

        const oldLevel = this.getLevel(savedMember.xp);
        savedMember.xp += guild.xp.xpPerMessage;
        const newLevel = this.getLevel(savedMember.xp);

        if (newLevel > oldLevel) {
            this.handleLevelUp(msg, newLevel, guild);
        }
        savedMember.save();
    }
    private hasIgnoredXPRole(member: GuildMember, guild: GuildDocument) {
        for (const entry of member.roles.cache) { 
            const role = entry[1];
            if (guild.xp.ignoredRoles.some(id => id === role.id))
                return true;
        }
        return false;
    }

    private handleLevelUp(msg: Message, newLevel: number, guild: GuildDocument) {
        msg.channel.send(`Level Up! ⭐\n**New Level**: \`${newLevel}\``);

        const levelRole = this.getLevelRole(newLevel, guild);
        if (levelRole)
            msg.member?.roles.add(levelRole);
    }
    private getLevelRole(level: number, guild: GuildDocument) {
        return guild.xp.levelRoles.find(r => r.level === level)?.role;
    }

    getLevel(xp: number) {
        const preciseLevel = (-75 + Math.sqrt(Math.pow(75, 2) - 300 * (-150 - xp))) / 150;            
        return Math.floor(preciseLevel);
    }
    static xpInfo(xp: number) {
        const preciseLevel = (-75 + Math.sqrt(Math.pow(75, 2) - 300 * (-150 - xp))) / 150;
        const level = Math.floor(preciseLevel);

        const xpForNextLevel = this.xpForNextLevel(level, xp);
        const nextLevelXP = xp + xpForNextLevel;        
         
        const levelCompletion = preciseLevel - level;

        return { level, xp, xpForNextLevel, levelCompletion, nextLevelXP };
    }
    private static xpForNextLevel(currentLevel: number, xp: number) {
        return ((75 * Math.pow(currentLevel + 1, 2)) + (75 * (currentLevel + 1)) - 150) - xp;
    }

    static getRank(member: MemberDocument, members: MemberDocument[]) {
        return members
            .sort((a, b) => b.xp - a.xp)
            .findIndex(m => m.id === member.id) + 1;
    }
}
