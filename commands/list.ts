import { Command, CommandContext } from './Command';
import Deps from '../utils/deps';
import Music from '../modules/music/music';
import { ModuleString } from '../data/models/guild';

export default class ListCommand implements Command {
    name = 'list';
    summary = 'Display the current track list.';
    cooldown = 3;
    module: ModuleString = 'Music';

    constructor(private music = Deps.get<Music>(Music)) {}
    
    execute = async(ctx: CommandContext) => {
        const { queue } = this.music.joinAndGetPlayer(ctx);

        let details = '';
        for (let i = 0; i < queue.length; i++) {            
            const track = queue[i];
            const prefix = (i === 0) ? `**Now Playing**:` : `**[${i + 1}]**`;
            details += `${prefix} \`${track.title}\` from <@${track.requester.user.id}>\n`;
        }
        return ctx.channel.send(details || 'No tracks in list.');
    }
}
