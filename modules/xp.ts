import Module from "./module";
import { Message, GuildMember } from "discord.js";
import GuildUsers from "../data/guild-users";
import Guilds from "../data/guilds";
import { GuildDocument } from "../models/guild";

export class Leveling {
    static async validateXPMsg(msg: Message) {
        const guild = await Guilds.get(msg?.guild);
        if (!msg?.member || Leveling.hasIgnoredXPRole(msg.member, guild)) {
            console.log('wee woo');
            
            throw new Error();
        }

        const guildUser = await GuildUsers.get(msg.member);
        if (!guildUser) return;

        const oldLevel = Leveling.getLevel(guildUser.xpMessages, guild?.xp.xpPerMessage);
        guildUser.xpMessages++;
        const newLevel = Leveling.getLevel(guildUser.xpMessages, guild?.xp.xpPerMessage);

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
    static getLevel(messages: number, xpPerMessage: number) {
        const exp = xpPerMessage * messages;
        const preciseLevel = (-75 + Math.sqrt(Math.pow(75, 2) - 300 * (-150 - exp))) / 150;
        return Math.floor(preciseLevel);
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

    static xpForNextLevel(level: number, exp: number) {
        return ((75 * Math.pow(level + 1, 2)) + (75 * (level + 1)) - 150) - exp;
    }
}

export class XPModule extends Module {
    levelRoles: LevelRole[] = [];
    ignoredRoles: string[] = [];
    xpPerMessage = 50;
    xpCooldown = 5;
}

export interface LevelRole {
    level: number;
    role: string;
}
