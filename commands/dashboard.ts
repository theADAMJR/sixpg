import { Command, CommandContext } from "./Command";
import config from '../config.json';
import { ModuleString } from "../modules/module";

export default class HelpCommand implements Command {
    name = 'dashboard';
    summary = `Get a link to the server's dashboard`;
    cooldown = 3;
    module: ModuleString = 'General';
    
    execute = async(ctx: CommandContext) => {
        ctx.channel.send(`${config.webappURL}/servers/${ctx.guild.id}`);
    }
}
