import Module from "./module";
import { Message, GuildMember } from "discord.js";
import GuildUsers from "../data/guild-users";
import Guilds from "../data/guilds";
import { GuildDocument } from "../models/guild";

export class Leveling {
    static async validateXPMsg(msg: Message) {
        const guild = msg.guild ? await Guilds.get(msg.guild) : null;
        if (!msg?.member || !guild || Leveling.hasIgnoredXPRole(msg.member, guild)) {
            throw new Error();
        }

        const guildUser = await GuildUsers.get(msg.member);
        if (!guildUser) return;

        const oldLevel = Leveling.getXPInfo(guildUser.xpMessages, guild?.xp.xpPerMessage).level;
        guildUser.xpMessages++;
        const newLevel = Leveling.getXPInfo(guildUser.xpMessages, guild?.xp.xpPerMessage).level;

        if (newLevel > oldLevel) {
            Leveling.handleLevelUp(msg, newLevel, guild);
        }
        guildUser.save();
    }
    private static hasIgnoredXPRole(member: GuildMember, guild: GuildDocument) {
        member.roles.cache.forEach(role => {
            if (guild.xp.ignoredRoles.some(id => id == role.id)) {
                return true;
            }
        });
        return false;
    }

    private static handleLevelUp(msg: Message, newLevel: number, guild: GuildDocument) {
        msg.channel.send(`
            Level Up! ⭐\n 
            **New Level**: ${newLevel}`);

        const levelRole = Leveling.getLevelRole(newLevel, guild);
        if (levelRole) {
            msg.member?.roles.add(levelRole);
        }
    }
    private static getLevelRole(level: number, guild: GuildDocument) {
        return guild.xp.levelRoles.find(r => r.level == level)?.role;
    }

    static getXPInfo(messages: number, xpPerMessage: number) {
        const exp = xpPerMessage * messages;
        const preciseLevel = (-75 + Math.sqrt(Math.pow(75, 2) - 300 * (-150 - exp))) / 150;

        const xpForNextLevel = this.xpForNextLevel();
        const level = Math.floor(preciseLevel);
        return { level, exp, xpForNextLevel };
    }
    private static xpForNextLevel(currentLevel: number, xp: number) {
        return ((75 * Math.pow(currentLevel + 1, 2)) + (75 * (currentLevel + 1)) - 150) - xp;
    }
}
