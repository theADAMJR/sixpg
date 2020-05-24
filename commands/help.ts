import { Command, CommandContext } from './Command';
import config from '../config.json';
import { ModuleString } from '../data/models/guild';

export default class HelpCommand implements Command {
    name = 'help';
    summary = 'Send help...';
    cooldown = 3;
    module: ModuleString = 'General';
    
    execute = async(ctx: CommandContext) => {
        ctx.channel.send(`${config.webapp.url}/commands`);
    }
}
