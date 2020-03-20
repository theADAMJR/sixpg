import { Command, CommandContext } from "./Command";
import Deps from "../utils/deps";
import Music from "../modules/music/music";
import { ModuleString } from "../modules/module";

export default class ResumeCommand implements Command {
    name = 'resume';
    summary = 'Resume playing a track if paused.';
    module: ModuleString = 'Music';

    constructor(private music = Deps.get<Music>(Music)) {}
    
    execute = (ctx: CommandContext) => {
        const player = this.music.joinAndGetPlayer(ctx);

        if (player.playing)
            throw new Error('Player is already resumed.');
            
        player.pause(false);
        ctx.channel.send(`**Resumed**: \`${player.queue[0].title}\``);
    }
}
