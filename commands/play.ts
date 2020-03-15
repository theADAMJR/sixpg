import { Command, CommandContext } from "./Command";
import Deps from "../utils/deps";
import { GuildMember } from "discord.js";
import Music from "../modules/music/music";

export default class PlayCommand implements Command {
    name = 'play';
    summary = 'Join and play a youtube result.';
    cooldown = 5;

    constructor(private music = Deps.get<Music>(Music)) {}
    
    execute = async(ctx: CommandContext) => {
        const query = ctx.args.join();        
        if (!query)
            throw new Error('Query must be provided.');

        const player = this.joinAndGetPlayer(ctx);

        const maxQueueSize = 5;
        if (player.queue.size >= maxQueueSize)
            throw new Error(`Max queue size of \`${maxQueueSize}\` reached.`);

        const track = await this.searchForTrack(query, ctx.member);

        player.queue.add(track);

        if (player.playing)
            return ctx.channel.send(`**Added**: \`${track.title}\` to list.`);
        player.play();
    }

    private joinAndGetPlayer(ctx: CommandContext) {
        const voiceChannel = ctx.member.voice.channel;
        if (!voiceChannel)
            throw new Error('You must be in a voice channel to play music.');

        return this.music.client.players.spawn({
            guild: ctx.guild,
            voiceChannel: voiceChannel,
            textChannel: ctx.channel,
        });
    }

    private async searchForTrack(query: string, requestor: GuildMember) {
        const res = await this.music.client.search(query, requestor);    
        return res.tracks[0];
    }
}
