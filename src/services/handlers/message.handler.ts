import EventHandler from './event-handler';
import Deps from '../../utils/deps';
import CommandService from '../command.service';
import Bots from '../../data/bots';
import AutoMod from '../../modules/auto-mod/auto-mod';
import Leveling from '../../modules/xp/leveling';
import { Message } from 'discord.js';

export default class MessageHandler implements EventHandler {
    on = 'message';

    constructor(
        private autoMod = Deps.get<AutoMod>(AutoMod),
        private commands = Deps.get<CommandService>(CommandService),
        private bots = Deps.get<Bots>(Bots),
        private leveling = Deps.get<Leveling>(Leveling)) {}

    async invoke(msg: Message) {
        if (msg.author.bot) return;

        const savedBot = await this.bots.get(msg.client.user);

        const isCommand = msg.content.startsWith(savedBot.general.prefix);
        if (isCommand)
            return await this.commands.handle(msg, savedBot);        

        
        if (savedBot.autoMod.enabled)
            await this.autoMod.validateMsg(msg, savedBot);
        if (savedBot.leveling.enabled)
            await this.leveling.validateXPMsg(msg, savedBot);
    }
}