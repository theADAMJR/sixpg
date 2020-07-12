import Log from '../../utils/log';
import EventHandler from './event-handler';
import Deps from '../../utils/deps';
import Music from '../../modules/music/music';
import CommandService from '../command.service';
import config from '../../config.json';
import { Client } from 'discord.js';
import GlobalBots from '../../global-bots';

export default class ReadyHandler implements EventHandler {
    started = false;
    on = 'ready';
    
    constructor(
        private commandService = Deps.get<CommandService>(CommandService),        
        private music = Deps.get<Music>(Music)) {}

    async invoke(bot: Client) {
        Log.info(`Bot is live!`, `events`);

        if (this.started) return;
        this.started = true;
        
        await this.commandService.init();

        this.music.initialize(bot);
        // TODO: add custom activity to bot config
        bot.user?.setActivity(config.dashboard.url);
        
        GlobalBots.add(bot);
    }
}
