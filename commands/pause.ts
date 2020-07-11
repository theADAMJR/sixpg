import { Command, CommandContext, Permission } from './command';
import Deps from '../utils/deps';
import Music from '../modules/music/music';

export default class PauseCommand implements Command {
    name = 'pause';
    summary = 'Pause playback if playing.';
    precondition: Permission = 'SPEAK';
    module = 'Music';

    constructor(private music = Deps.get<Music>(Music)) {}
    
    execute = (ctx: CommandContext) => {
        const player = this.music.joinAndGetPlayer(ctx.member, ctx.channel);

        if (!player.playing)
            throw new TypeError('Player is already paused.');
        
        player.pause(true);
        ctx.channel.send(`**Paused**: \`${player.queue[0].title}\``);
    }
}
