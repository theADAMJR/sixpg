import { Message, GuildMember } from "discord.js";
import { GuildDocument } from "../../models/guild";
import Members from "../../data/members";

export default class Leveling {
    constructor(private members = new Members()) {}

    async validateXPMsg(msg: Message, guild: GuildDocument) {
        if (!msg?.member || !guild || this.hasIgnoredXPRole(msg.member, guild)) {
            throw new Error('Member cannot earn XP');
        }

        const guildUser = await this.members.get(msg.member);
        if (!guildUser) return;

        const oldLevel = Leveling.xpInfo(guildUser.xpMessages, guild?.xp.xpPerMessage).level;
        guildUser.xpMessages++;
        const newLevel = Leveling.xpInfo(guildUser.xpMessages, guild?.xp.xpPerMessage).level;

        if (newLevel > oldLevel) {
            this.handleLevelUp(msg, newLevel, guild);
        }
        guildUser.save();
    }
    private hasIgnoredXPRole(member: GuildMember, guild: GuildDocument) {
        member.roles.cache.forEach(role => {            
            if (guild.xp.ignoredRoles.some(id => id == role.id)) {
                return true;
            }
        });
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
        return guild.xp.levelRoles.find(r => r.level == level)?.role;
    }

    static xpInfo(messages: number, xpPerMessage: number) { // TODO: replace with getLevel
        const xp = xpPerMessage * messages;

        const preciseLevel = (-75 + Math.sqrt(Math.pow(75, 2) - 300 * (-150 - xp))) / 150;
        const level = ~~preciseLevel;

        const xpForNextLevel = this.xpForNextLevel(level, xp);
        return { level, exp: xp, xpForNextLevel };
    }
    private static xpForNextLevel(currentLevel: number, xp: number) { // TODO: remove - will be handled in webapp xp card
        return ((75 * Math.pow(currentLevel + 1, 2)) + (75 * (currentLevel + 1)) - 150) - xp;
    }
}
