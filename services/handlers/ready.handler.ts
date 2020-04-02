import Log from "../../utils/log";
import EventHandler from "./event-handler";
import Deps from "../../utils/deps";
import Music from "../../modules/music/music";
import { bot } from "../../bot";

export default class ReadyHandler implements EventHandler {
    on = 'ready';
    
    constructor(private music = Deps.get<Music>(Music)) {}

    async invoke(...args: any) {        
        Log.info(`It's live!`, `events`);
        
        this.music.initialize();
        bot.user?.setActivity('2pg.xyz');
    }
}
