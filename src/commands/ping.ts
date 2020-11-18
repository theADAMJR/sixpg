import { Command, CommandContext, Permission } from './command';

export default class PingCommand implements Command {
    name = 'ping';
    summary = 'Probably the best command ever created.';
    precondition: Permission = '';
    cooldown = 3;
    module = 'General';
    
    execute = (ctx: CommandContext) => ctx.channel.send(`🏓 Pong! \`${ctx.bot.ws.ping}ms\``);
}
