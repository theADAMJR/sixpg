import { User } from "discord.js";
import { Command } from "../commands/command";

export default class Cooldowns {
    private cooldowns: CommandCooldown[] = [];

    active(author: User, command: Command) {
        return this.cooldowns
            .some(c => c.userId === author.id && c.commandName === command.name);
    }
    add(user: User, command: Command) {
        const cooldown = { userId: user.id, commandName: command.name };

        if (!this.active(user, command))
            this.cooldowns.push(cooldown);

        const seconds = (command.cooldown ?? 0) * 1000;
        setTimeout(() => this.remove(user, command), seconds);
    }
    remove(user: User, command: Command) {
        const index = this.cooldowns
            .findIndex(c => c.userId === user.id && c.commandName === command.name);
        this.cooldowns.splice(index, 1);
    }
}

export interface CommandCooldown {
    userId: string;
    commandName: string;
}
