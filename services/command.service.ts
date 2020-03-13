import fs from 'fs';
import { Message,  TextChannel, GuildMember } from "discord.js";
import { Command, CommandContext } from '../commands/command';
import Leveling from '../modules/xp/leveling';
import Guilds from '../data/guilds';
import AutoMod from '../modules/auto-mod/auto-mod';
import Log from '../utils/log';
import Deps from '../deps';

export default class CommandService {
    private commands = new Map<string, Command>();

    constructor(
        private guilds = Deps.get<Guilds>(Guilds),
        private autoMod = Deps.get<AutoMod>(AutoMod),
        private leveling = Deps.get<Leveling>(Leveling)) {
            this.initialize();
        }
    
    initialize() {
        fs.readdir('./commands/', (err, files) => {
            err && Log.error(err, 'cmds');

            for (const file of files) {
                const Command = require(`../commands/${file}`).default;
                if (!Command) continue;

                const name = new Command().name;                
                this.commands.set(name, new Command());
            }
            Log.info(`Loaded: ${this.commands.size} commands`, `cmds`);
        }); 
    }

    async handle(msg: Message) {
        if (!msg.member || !msg.content || !msg.guild || msg.author.bot) return;
        
        const guild = await this.guilds.get(msg.guild);
        const prefix = guild.general.prefix;
        const content = msg.content.toLowerCase();

        if (content?.startsWith(prefix)) {
            try {
                await this.validateChannel(msg.channel as TextChannel);

                const command = this.findCommand(content);
                if (!command) return;

                this.validatePreconditions(command, msg.member);
                
                await command.execute(new CommandContext(msg));
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

    validatePreconditions(command: Command, executor: GuildMember) {
        if (command.precondition && !executor.hasPermission(command.precondition))
            throw new Error(`**Required Permission**: \`${command.precondition}\``);
    }

    private async validateChannel(channel: TextChannel) {
        const guild = await this.guilds.get(channel.guild);
        const isIgnored = guild?.general.ignoredChannels
            .some((id: string) => id === channel.id);
        if (isIgnored) {
            throw new Error('Commands cannot be executed in this channel.');
        }
    }
    private findCommand(content: string) {        
        const name = content.split(' ')[0].substr(1, content.length);
        return this.commands.get(name);
    }
}
