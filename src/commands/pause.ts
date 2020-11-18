import { Command, CommandContext, Permission } from './command';
import Deps from '../utils/deps';
import Music from '../modules/music/music';

export default class PauseCommand implements Command {
    name = 'pause';
    summary = 'Pause playback if playing.';
    precondition: Permission = 'SPEAK';
    module = 'Music';

    constructor(private music = Deps.get<Music>(Music)) {}
    
    execute = async (ctx: CommandContext) => {
        const player = this.music.joinAndGetPlayer(ctx.member.voice.channel, ctx.channel);

        if (player.isPaused)
            throw new TypeError('Player is already paused.');

        await player.pause();
        
        ctx.channel.send(`**Paused**: \`${player.q.peek()?.title}\``);
    }
}