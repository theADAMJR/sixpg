import { Message, GuildMember } from "discord.js";
import { GuildDocument } from "../../models/guild";
import Members from "../../data/members";
import Deps from "../../utils/deps";

export default class Leveling {
    constructor(private members = Deps.get<Members>(Members)) {}

    async validateXPMsg(msg: Message, guild: GuildDocument) {
        if (!msg?.member || !guild || this.hasIgnoredXPRole(msg.member, guild)) {
            throw new TypeError('Member cannot earn XP');
        }

        const guildUser = await this.members.get(msg.member);
        if (!guildUser) return;

        const oldLevel = this.getLevel(guildUser.xpMessages, guild?.xp.xpPerMessage);
        guildUser.xpMessages++;
        const newLevel = this.getLevel(guildUser.xpMessages, guild?.xp.xpPerMessage);

        if (newLevel > oldLevel) {
            this.handleLevelUp(msg, newLevel, guild);
        }
        guildUser.save();
    }
    private hasIgnoredXPRole(member: GuildMember, guild: GuildDocument) {
        for (const entry of member.roles.cache) { 
            const role = entry[1];
            if (guild.xp.ignoredRoles.some(id => id === role.id)) {
                return true;
            }            
        }
        return false;
    }

    private handleLevelUp(msg: Message, newLevel: number, guild: GuildDocument) {
        msg.channel.send(`
            Level Up! ⭐\n**New Level**: \`${newLevel}\``);

        const levelRole = this.getLevelRole(newLevel, guild);
        if (levelRole) {
            msg.member?.roles.add(levelRole);
        }
    }
    private getLevelRole(level: number, guild: GuildDocument) {
        return guild.xp.levelRoles.find(r => r.level === level)?.role;
    }

    getLevel(messages: number, xpPerMessage: number) {
        const xp = xpPerMessage * messages;
        const preciseLevel = (-75 + Math.sqrt(Math.pow(75, 2) - 300 * (-150 - xp))) / 150;
        return Math.floor(preciseLevel);
    }
}
