import fs from 'fs';
import { Collection, Message, PartialMessage } from "discord.js";
import Command from '../commands/Command';

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
        const prefix = '/';
        const content = msg.content.toLowerCase();
        if (content?.startsWith(prefix)) {                  
            await CommandHandler.findCommand(content)?.execute(msg);
        }
    }

    private static findCommand(content: string) {
        const name = content.split(' ')[0].substr(1, content.length);
        return CommandHandler._commands.get(name);
    }
}