import { Command, CommandContext } from "./Command";
import Deps from "../utils/deps";
import Music from "../modules/music/music";

export default class PauseCommand implements Command {
    name = 'pause';
    summary = 'Pause playback if playing.';

    constructor(private music = Deps.get<Music>(Music)) {}
    
    execute = (ctx: CommandContext) => {
        const player = this.joinAndGetPlayer(ctx);

        if (!player.playing)
            throw new Error('Player is already paused.');
        
        player.pause(true);
        ctx.channel.send(`**Paused**: \`${player.queue[0].title}\``);
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
