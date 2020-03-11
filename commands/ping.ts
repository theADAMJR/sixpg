import { Command, CommandContext } from "./Command";

export default class PingCommand implements Command {
    name = 'ping';
    summary = 'Probably the best command ever created.';
    cooldown = 5;
    
    execute = (ctx: CommandContext) => ctx.channel.send(`🏓 Pong! \`${ctx.bot.ws.ping}ms\``);
}
