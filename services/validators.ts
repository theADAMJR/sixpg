import { Command } from "../commands/command";
import { GuildMember, TextChannel, Message } from "discord.js";
import { GuildDocument } from "../data/models/guild";

export default class Validators {
    checkCommand(command: Command, guild: GuildDocument, msg: Message) {
        const config = guild.commands.configs.find(c => c.name === command.name);
        if (!config) return;

        if (!config.enabled)
            throw new TypeError('Command not enabled!');
    }

    checkPreconditions(command: Command, executor: GuildMember) {
        if (command.precondition && !executor.hasPermission(command.precondition))
            throw new TypeError(`**Required Permission**: \`${command.precondition}\``);
    }

    checkChannel(channel: TextChannel, savedGuild: GuildDocument) {
        const isIgnored = savedGuild.general.ignoredChannels
            .some(id => id === channel.id);
        if (isIgnored)
            throw new TypeError('Commands cannot be executed in this channel.');
    }
}