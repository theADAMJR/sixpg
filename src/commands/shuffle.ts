import { Command, CommandContext, Permission } from './command';
import Deps from '../utils/deps';
import Music from '../modules/music/music';

export default class ShuffleCommand implements Command {
    precondition: Permission = 'SPEAK';
    name = 'shuffle';
    summary = 'Shuffle a playlist.';
    cooldown = 3;
    module = 'Music';

    constructor(private music = Deps.get<Music>(Music)) {}
    
    execute = async(ctx: CommandContext) => {
        const player = this.music.joinAndGetPlayer(ctx.member.voice.channel, ctx.channel);
        player.q.shuffle();
        
        return ctx.channel.send('List shuffled.');
    }
}