import { Command, CommandContext } from "./Command";
import Deps from "../utils/deps";
import Music from "../modules/music/music";

export default class ResumeCommand implements Command {
    name = 'resume';
    summary = 'Resume playing a track if paused.';

    constructor(private music = Deps.get<Music>(Music)) {}
    
    execute = (ctx: CommandContext) => {
        const player = this.joinAndGetPlayer(ctx);

        if (player.playing)
            throw new Error('Player is already resumed.');
            
        player.pause(false);
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
