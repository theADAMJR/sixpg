import { Command, CommandContext } from "./Command";
import config from '../config.json';

export default class HelpCommand implements Command {
    name = 'help';
    summary = 'Send help...';
    cooldown = 3;
    
    execute = async(ctx: CommandContext) => {
        ctx.channel.send(`${config.webappURL}/commands`);
    }
}
