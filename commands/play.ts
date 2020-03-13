import { Command, CommandContext } from "./Command";
import Deps from "../deps";
import { music } from "../modules/music/music";
import { VoiceChannel, Message } from "discord.js";

export default class PlayCommand implements Command {
    name = 'play';
    summary = 'Join and play a youtube result.';
    cooldown = 5;
    
    execute = async(ctx: CommandContext) => {
        const voiceChannel = ctx.member.voice.channel;
        if (!voiceChannel) {
            throw new Error('You must be in a voice channel to play music.');
        }        
        const query = ctx.args[0];
        if (!query) {
            throw new Error('Query must be provided.');
        }

        const player = this.joinAndGetPlayer(ctx, voiceChannel);

        const res = await music.search(query, ctx.user);
        player.queue.add(res.tracks[0]);
    }

    private joinAndGetPlayer(ctx: CommandContext, voiceChannel: VoiceChannel) {
        return music.players.spawn({
            guild: ctx.guild,
            voiceChannel: voiceChannel,
            textChannel: ctx.channel,
        });
    }
}
