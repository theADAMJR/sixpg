import { Command, CommandContext } from "./Command";
import config from '../config.json';
import { ModuleString } from "../modules/module";

export default class HelpCommand implements Command {
    name = 'help';
    summary = 'Send help...';
    cooldown = 3;
    module: ModuleString = 'General';
    
    execute = async(ctx: CommandContext) => {
        ctx.channel.send(`${config.webappURL}/commands`);
    }
}
