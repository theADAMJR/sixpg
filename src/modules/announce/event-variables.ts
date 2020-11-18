import { User, Guild, Message } from "discord.js";

export default class EventVariables {
    constructor(private content: string) {}

    guild(guild: Guild) {
        this.content = this.content.replace(/\[GUILD\]/g, guild.name);
        return this;
    }

    memberCount(guild: Guild) {
        this.content = this.content.replace(/\[MEMBER_COUNT\]/g, guild.memberCount.toString());
        return this;
    }

    message(msg: Message) {
        this.content = this.content.replace(/\[MESSAGE\]/g, msg.content);
        return this;
    }

    oldLevel(level: number) {
        this.content = this.content.replace(/\[OLD_LEVEL\]/g, level.toString());
        return this;
    }
    newLevel(level: number) {
        this.content = this.content.replace(/\[NEW_LEVEL\]/g, level.toString());
        return this;
    }

    reason(punishment: { user: User, reason: string }) {
        this.content = this.content.replace(/\[REASON\]/g, punishment.reason);
        return this;
    }

    user(user: User) {
        this.content = this.content.replace(/\[USER\]/g, `<@!${user.id}>`);
        return this;
    }

    xp(xp: number) {
        this.content = this.content.replace(/\[XP\]/g, xp.toString());
        return this;
    }

    toString() { return this.content; }
}