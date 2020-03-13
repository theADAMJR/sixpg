import { Command, CommandContext } from "./Command";
import { music } from "../modules/music/music";

export default class StopCommand implements Command {
    name = 'skip';
    summary = 'Skip current playing track';
    cooldown = 5;
    
    execute = async(ctx: CommandContext) => {
        const player = this.joinAndGetPlayer(ctx);
        if (player.queue.size <= 1) {
            throw new Error('No tracks to skip');
        }
        // player.play();
        player.stop();
        // player.queue.shift();
        // player.seek(0);
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
}
