import Log from '../../utils/log';
import EventHandler from './event-handler';
import Deps from '../../utils/deps';
import Music from '../../modules/music/music';
import { Client } from 'discord.js';
import GlobalBots from '../../global-bots';

export default class ReadyHandler implements EventHandler {
    startedBots: string[] = [];
    on = 'ready';

    constructor(private music = Deps.get<Music>(Music)) {}

    async invoke(bot: Client) {
        Log.info(`Bot '${bot.user.username}' is live!`, `events`);
        
        if (this.startedBots.includes(bot.user.id)) return;
        this.startedBots.push(bot.user.id);

        this.music.initialize();
        bot.user?.setActivity(process.env.DASHBOARD_URL);
        
        GlobalBots.add(bot);
    }
}
