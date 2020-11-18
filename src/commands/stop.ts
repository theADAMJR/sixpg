import { Command, CommandContext, Permission } from './command';
import Deps from '../utils/deps';
import Music from '../modules/music/music';

export default class StopCommand implements Command {
    aliases = ['leave'];
    name = 'stop';
    summary = 'Stop playback, clear list, and leave channel';
    precondition: Permission = 'SPEAK';
    cooldown = 5;
    module = 'Music';

    constructor(private music = Deps.get<Music>(Music)) {}
    
    execute = (ctx: CommandContext) => {

        const player = this.music.client.players.get(ctx.guild.id)
        if (!player)
            throw new TypeError('Not currently playing any track.');
        
        player.stop();        
        player.leave();        
    }
}