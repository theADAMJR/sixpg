import { Command, CommandContext } from './Command';
import { ModuleString } from '../data/models/guild';

export default class PingCommand implements Command {
    name = 'ping';
    summary = 'Probably the best command ever created.';
    cooldown = 3;
    module: ModuleString = 'General';
    
    execute = (ctx: CommandContext) => ctx.channel.send(`🏓 Pong! \`${ctx.bot.ws.ping}ms\``);
}
