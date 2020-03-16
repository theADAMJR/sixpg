import { Command, CommandContext } from "./Command";
import config from '../config.json';

export default class HelpCommand implements Command {
    name = 'leaderboard';
    summary = 'Get a link to the server\'s leaderboard';
    cooldown = 3;
    
    execute = async(ctx: CommandContext) => {
        ctx.channel.send(`${config.webappURL}/${ctx.guild.id}/leaderboard`);
    }
}
