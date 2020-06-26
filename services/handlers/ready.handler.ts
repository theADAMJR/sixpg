import Log from '../../utils/log';
import EventHandler from './event-handler';
import Deps from '../../utils/deps';
import Music from '../../modules/music/music';
import { bot } from '../../bot';
import CommandService from '../command.service';
import config from '../../config.json';

export default class ReadyHandler implements EventHandler {
    started = false;
    on = 'ready';
    
    constructor(
        private commandService = Deps.get<CommandService>(CommandService),        
        private music = Deps.get<Music>(Music)) {}

    async invoke() {
        Log.info(`Bot is live!`, `events`);
        
        if (!this.started) return;
        
        await this.commandService.init();

        this.music.initialize();
        bot.user?.setActivity(config.bot.activity);
    }
}
