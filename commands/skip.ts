import { Command, CommandContext } from "./Command";
import Deps from "../utils/deps";
import Music from "../modules/music/music";

export default class SkipCommand implements Command {
    name = 'skip';
    summary = 'Skip current playing track';
    cooldown = 5;

    constructor(private music = Deps.get<Music>(Music)) {}
    
    execute = async(ctx: CommandContext) => {
        const player = this.joinAndGetPlayer(ctx);
        if (player.queue.size <= 1)
            throw new Error('No tracks to skip');
        player.stop();
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
}
