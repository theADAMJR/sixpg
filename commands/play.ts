import { Command, CommandContext } from "./Command";
import Deps from "../deps";
import { music } from "../modules/music/music";
import { VoiceChannel, Message, User, GuildMember } from "discord.js";

export default class PlayCommand implements Command {
    name = 'play';
    summary = 'Join and play a youtube result.';
    cooldown = 5;
    
    execute = async(ctx: CommandContext) => {
        const query = ctx.args.join();        
        if (!query) {
            throw new Error('Query must be provided.');
        }

        const player = this.joinAndGetPlayer(ctx);

        const maxQueueSize = 5;
        if (player.queue.size >= maxQueueSize) {
            throw new Error(`Max queue size of \`${maxQueueSize}\` reached.`);
        }
        const track = await this.searchForTrack(query, ctx.member);

        player.queue.add(track);
        
        if (player.playing) {
            return ctx.channel.send(`**Added**: \`${track.title}\` to list.`);
        }
        player.play();
    }

    private joinAndGetPlayer(ctx: CommandContext) {
        const voiceChannel = ctx.member.voice.channel;
        if (!voiceChannel) {
            throw new Error('You must be in a voice channel to play music.');
        }

        return music.players.spawn({
            guild: ctx.guild,
            voiceChannel: voiceChannel,
            textChannel: ctx.channel,
        });
    }

    private async searchForTrack(query: string, requestor: GuildMember) {
        const res = await music.search(query, requestor);    
        return res.tracks[0];
    }
}
