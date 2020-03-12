import fs from 'fs';
import { Message,  TextChannel } from "discord.js";
import { Command, CommandContext } from '../commands/command';
import Leveling from '../modules/xp/leveling';
import Guilds from '../data/guilds';
import AutoMod from '../modules/auto-mod/auto-mod';
import Log from '../utils/log';
import Service from './service';

export default class CommandService implements Service {
    private commands = new Map<string, Command>();

    constructor(
        private guilds = new Guilds(),
        private autoMod = new AutoMod(),
        private leveling = new Leveling()) {}
    
    initialize() {
        fs.readdir('./commands/', (err, files) => {
            err && console.error(err);

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

        const isCommand = content?.startsWith(prefix);
        if (isCommand) {
            try {
                await this.validateChannel(msg.channel as TextChannel);
                
                await this.findCommand(content)?.execute(new CommandContext(msg));
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
