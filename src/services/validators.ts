import { Command } from "../commands/command";
import { GuildMember, TextChannel, Message } from "discord.js";
import { BotDocument } from "../data/models/bot";

export default class Validators {
    checkCommand(command: Command, guild: BotDocument, msg: Message) {
        const config = guild.commands.configs.find(c => c.name === command.name);
        if (!config) return;

        if (!config.enabled)
            throw new TypeError('Command not enabled!');
    }

    checkPreconditions(command: Command, executor: GuildMember) {
        if (command.precondition && !executor.hasPermission(command.precondition))
            throw new TypeError(`**Required Permission**: \`${command.precondition}\``);
    }

    checkChannel(channel: TextChannel, savedGuild: BotDocument) {
        const isIgnored = savedGuild.general.ignoredChannelNames
            .some(name => name === channel.name);
        if (isIgnored)
            throw new TypeError('Commands cannot be executed in this channel.');
    }
}