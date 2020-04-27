import fs from 'fs';
import { Message,  TextChannel, GuildMember, User } from 'discord.js';
import { Command, CommandContext } from '../commands/command';
import Leveling from '../modules/xp/leveling';
import Guilds from '../data/guilds';
import AutoMod from '../modules/auto-mod/auto-mod';
import Log from '../utils/log';
import Deps from '../utils/deps';
import Commands from '../data/commands';
import { SavedCommand } from '../models/command';
import Logs from '../data/logs';
import { GuildDocument } from '../models/guild';
import Cooldowns from './cooldowns';

export default class CommandService {
    private commands = new Map<string, Command>();

    constructor(
        private guilds = Deps.get<Guilds>(Guilds),
        private autoMod = Deps.get<AutoMod>(AutoMod),
        private leveling = Deps.get<Leveling>(Leveling),
        private logs = Deps.get<Logs>(Logs),
        private cooldowns = Deps.get<Cooldowns>(Cooldowns),
        commands = Deps.get<Commands>(Commands)) {
        this.loadCommandFiles(commands); 
    }

    private loadCommandFiles(commands: Commands) {
        fs.readdir('./commands/', (err, files) => {
            err && Log.error(err, 'cmds');
            for (const file of files) {
                const Command = require(`../commands/${file}`).default;
                if (!Command) continue;
                
                const command = new Command();
                this.commands.set(command.name, command);
                commands.save(new SavedCommand(command));
            }
            Log.info(`Loaded: ${this.commands.size} commands`, `cmds`);
        });
    }

    async handle(msg: Message) {
        if (!(msg.member && msg.content && msg.guild && !msg.author.bot)) return;
        
        const guild = await this.guilds.get(msg.guild);
        const prefix = guild.general.prefix;

        if (msg.content.startsWith(prefix))
            return this.handleCommand(msg, guild);
            
        try {
            guild.autoMod.enabled && await this.autoMod.validateMsg(msg, guild);
            guild.xp.enabled && await this.leveling.validateXPMsg(msg, guild);
        } catch {}
    }
    private async handleCommand(msg: Message, guild: GuildDocument) {
        const content = msg.content.toLowerCase();
        try {
            await this.validateChannel(msg.channel as TextChannel);

            const command = this.findCommand(content);
            if (!command || this.cooldowns.active(msg.author, command)) return;

            this.validateCommand(command, guild);
            this.validatePreconditions(command, msg.member);
            
            await command.execute(new CommandContext(msg), 
                ...this.getCommandArgs(msg.content));

            this.cooldowns.add(msg.author, command);

            await this.logCommand(msg, command);
        } catch (error) {
            const content = error?.message ?? 'Un unknown error occurred';          
            msg.channel.send(':warning: ' + content);
        }        
    }
    private async validateCommand(command: Command, guild: GuildDocument) {
        const config = guild.commands.configs.find(c => c.name === command.name);
        if (config && !config.enabled)
            throw new TypeError('Command not enabled!');
    }
    private async logCommand(msg: Message, command: Command) {
        const log = await this.logs.get(msg.guild);
        log.commands.push({
            name: command.name,
            by: msg.author.id,
            at: new Date()
        });
        await this.logs.save(log);
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
