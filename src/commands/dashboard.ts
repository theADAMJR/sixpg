import { Command, CommandContext, Permission } from './command';
import config from '../../config.json';

export default class DashboardCommand implements Command {
    name = 'dashboard';
    summary = `Get a link to the server's dashboard`;
    precondition: Permission = 'MANAGE_GUILD';
    cooldown = 3;
    module = 'General';
    
    async execute(ctx: CommandContext) {
        return ctx.channel.send(`${config.dashboardURL}/servers/${ctx.guild.id}`);
    }
}
