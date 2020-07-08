import { Command, CommandContext, Permission } from './command';
import config from '../config.json';

export default class HelpCommand implements Command {
    name = 'help';
    summary = 'Send help...';
    precondition: Permission = '';
    cooldown = 3;
    module = 'General';
    
    execute = async(ctx: CommandContext) => {
        ctx.channel.send(`${config.dashboard.url}/commands`);
    }
}
