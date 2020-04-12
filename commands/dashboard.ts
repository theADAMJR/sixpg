import { Command, CommandContext } from './Command';
import config from '../config.json';
import { ModuleString } from '../models/guild';

export default class HelpCommand implements Command {
    name = 'dashboard';
    summary = `Get a link to the server's dashboard`;
    cooldown = 3;
    module: ModuleString = 'General';
    
    execute = async(ctx: CommandContext) => {
        return ctx.channel.send(`${config.webapp.url}/servers/${ctx.guild.id}`);
    }
}
