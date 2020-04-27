import EventHandler from './event-handler';
import Deps from '../../utils/deps';
import CommandService from '../command.service';
import Guilds from '../../data/guilds';
import AutoMod from '../../modules/auto-mod/auto-mod';
import Leveling from '../../modules/xp/leveling';

export default class MessageHandler implements EventHandler {
    on = 'message';

    constructor(
        private autoMod = Deps.get<AutoMod>(AutoMod),
        private commands = Deps.get<CommandService>(CommandService),
        private guilds = Deps.get<Guilds>(Guilds),
        private leveling = Deps.get<Leveling>(Leveling)) {}

    async invoke(msg: any) {
        if (msg.author.bot) return;

        const guild = await this.guilds.get(msg.guild);
        const handled = await this.commands.handle(msg, guild);
        if (handled) return;
        
        guild.autoMod.enabled && await this.autoMod.validateMsg(msg, guild);
        guild.xp.enabled && await this.leveling.validateXPMsg(msg, guild);
    }
}