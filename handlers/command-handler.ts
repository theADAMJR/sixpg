import fs from 'fs';
import { Collection, Message,  TextChannel, DMChannel } from "discord.js";
import { Command, CommandContext } from '../commands/command';
import { Leveling } from '../modules/xp';
import Guilds from '../data/guilds';

export default class CommandHandler {
    private static _commands: Collection<string, Command>;
    
    static initialize() {
        let commandCount = 0;
        const commands = new Collection<string, Command>();

        fs.readdir('./commands/', (err, files) => {
            err && console.error(err);

            for (const file of files) {
                const Command = require(`../commands/${file}`).default;
                if (!Command) continue;

                const name = new Command().name;
                commands.set(name, new Command());

                commandCount++;
            }
            console.log(`Loaded: ${commandCount} commands`);
        });
        CommandHandler._commands = commands;     
    }

    static async handle(msg: Message) {
        if (!msg.member || msg.author.bot) return;
        
        const prefix = '/'; // TODO: get from guild document
        const content = msg.content.toLowerCase();

        const isCommand = content?.startsWith(prefix);
        if (isCommand) {
            try {                
                await CommandHandler.validateChannel(msg.channel as TextChannel);

                await CommandHandler.findCommand(content)?.execute(new CommandContext(msg));
            }
            catch (error) {
                console.error(error);                
                msg.channel.send(error || 'Un unknown error occurred');
            }
        } else {
            try {
                Leveling.validateXPMsg(msg);
            } catch {}
        }
    }
    private static async validateChannel(channel: TextChannel) {
        const guild = await Guilds.get(channel.guild);
        const isIgnored = guild?.general.ignoredChannels
            .some((id: string) => id === channel.id);
        if (isIgnored) {
            throw new Error('Commands cannot be executed in this channel.');
        }
    }
    private static findCommand(content: string) {
        const name = content.split(' ')[0].substr(1, content.length);
        return CommandHandler._commands.get(name);
    }
}