import fs from 'fs';
import { Message,  TextChannel, GuildMember, User } from 'discord.js';
import { Command, CommandContext } from '../commands/command';
import Leveling from '../modules/xp/leveling';
import Guilds from '../data/guilds';
import AutoMod from '../modules/auto-mod/auto-mod';
import Log from '../utils/log';
import Deps from '../utils/deps';
import Commands from '../data/commands';

export default class CommandService {
    private commands = new Map<string, Command>();
    private cooldowns: CommandCooldown[] = [];

    constructor(
        private guilds = Deps.get<Guilds>(Guilds),
        private autoMod = Deps.get<AutoMod>(AutoMod),
        private leveling = Deps.get<Leveling>(Leveling),
        commands = Deps.get<Commands>(Commands)) {
        fs.readdir('./commands/', (err, files) => {
            err && Log.error(err, 'cmds');

            for (const file of files) {
                const Command = require(`../commands/${file}`).default;
                if (!Command) continue;

                const command = new Command();
                this.commands.set(command.name, command);
                
                commands.get(command);
            }
            Log.info(`Loaded: ${this.commands.size} commands`, `cmds`);
        }); 
    }

    async handle(msg: Message) {
        if (!(msg.member && msg.content && msg.guild && !msg.author.bot)) return;
        
        const guild = await this.guilds.get(msg.guild);
        const prefix = guild.general.prefix;
        const content = msg.content.toLowerCase();

        if (content.startsWith(prefix)) {
            try {
                await this.validateChannel(msg.channel as TextChannel);

                const command = this.findCommand(content);
                if (!command || this.inCooldown(msg.author, command)) return;

                this.validatePreconditions(command, msg.member);
                
                await command.execute(new CommandContext(msg), 
                    ...this.getCommandArgs(msg.content));

                this.addCooldown(msg.author, command);
            } catch (error) {
                const content = error?.message ?? 'Un unknown error occurred';          
                msg.channel.send(':warning: ' + content);
            }
        } else {
            try {
                guild.autoMod.enabled && await this.autoMod.validateMsg(msg, guild);
                guild.xp.enabled && await this.leveling.validateXPMsg(msg, guild);
            } catch {}
        }
    }
    private inCooldown(author: User, command: Command) {
        return this.cooldowns
            .some(c => c.userId === author.id && c.commandName === command.name);
    }
    private addCooldown(user: User, command: Command) {
        const cooldown = { userId: user.id, commandName: command.name };

        if (!this.inCooldown(user, command))
            this.cooldowns.push(cooldown);

        const seconds = (command.cooldown ?? 0) * 1000;
        setTimeout(() => this.removeCooldown(user, command), seconds);
    }
    private removeCooldown(user: User, command: Command) {
        const index = this.cooldowns
            .findIndex(c => c.userId === user.id && c.commandName === command.name);
        this.cooldowns.splice(index, 1);
    }

    private validatePreconditions(command: Command, executor: GuildMember) {
        if (command.precondition && !executor.hasPermission(command.precondition))
            throw new TypeError(`**Required Permission**: \`${command.precondition}\``);
    }

    private async validateChannel(channel: TextChannel) {
        const guild = await this.guilds.get(channel.guild);

        const isIgnored = guild?.general.ignoredChannels
            .some(id => id === channel.id);
        if (isIgnored)
            throw new TypeError('Commands cannot be executed in this channel.');
    }
    private findCommand(content: string) {        
        const name = content.split(' ')[0].substring(1, content.length);
        return this.commands.get(name);
    }

    private getCommandArgs(content: string) {
        let args = content.split(' ');
        return args.splice(1, args.length);
    }
}

export interface CommandCooldown {
    userId: string;
    commandName: string;
}
