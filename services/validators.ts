import { Command } from "../commands/command";
import { GuildMember, TextChannel } from "discord.js";
import Guilds from "../data/guilds";
import Deps from "../utils/deps";
import { GuildDocument } from "../data/models/guild";

export default class Validators {
    constructor(private guilds = Deps.get<Guilds>(Guilds)) {}

    async checkCommand(command: Command, guild: GuildDocument) {
        const config = guild.commands.configs.find(c => c.name === command.name);
        if (config && !config.enabled)
            throw new TypeError('Command not enabled!');
    }
    
    checkPreconditions(command: Command, executor: GuildMember) {
        if (command.precondition && !executor.hasPermission(command.precondition))
            throw new TypeError(`**Required Permission**: \`${command.precondition}\``);
    }
    async checkChannel(channel: TextChannel) {
        const guild = await this.guilds.get(channel.guild);

        const isIgnored = guild?.general.ignoredChannels
            .some(id => id === channel.id);
        if (isIgnored)
            throw new TypeError('Commands cannot be executed in this channel.');
    }
}