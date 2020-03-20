import { Command, CommandContext } from "./Command";
import { ModuleString } from "../modules/module";

export default class PingCommand implements Command {
    name = 'ping';
    summary = 'Probably the best command ever created.';
    cooldown = 5;
    module: ModuleString = 'General';
    
    execute = (ctx: CommandContext) => ctx.channel.send(`🏓 Pong! \`${ctx.bot.ws.ping}ms\``);
}
