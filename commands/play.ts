import { Command, CommandContext } from './Command';
import Deps from '../utils/deps';
import { GuildMember } from 'discord.js';
import Music from '../modules/music/music';
import { ModuleString } from '../data/models/guild';

export default class PlayCommand implements Command {
    name = 'play';
    summary = 'Join and play a youtube result.';
    cooldown = 2;
    module: ModuleString = 'Music';

    constructor(private music = Deps.get<Music>(Music)) {}
    
    execute = async(ctx: CommandContext, ...args: string[]) => {
        const query = args.join('');
        if (!query)
            throw new TypeError('Query must be provided.');

        const player = this.music.joinAndGetPlayer(ctx);

        const maxQueueSize = 5;
        if (player.queue.size >= maxQueueSize)
            throw new TypeError(`Max queue size of \`${maxQueueSize}\` reached.`);

        const track = await this.searchForTrack(query, ctx.member);

        player.queue.add(track);
        if (player.playing)
            return ctx.channel.send(`**Added**: \`${track.title}\` to list.`);

        player.play();
    }

    private async searchForTrack(query: string, requestor: GuildMember) {
        const res = await this.music.client.search(query, requestor);    
        return res.tracks[0];
    }
}
