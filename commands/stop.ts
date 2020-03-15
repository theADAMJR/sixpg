import { Command, CommandContext } from "./Command";
import Deps from "../utils/deps";
import Music from "../modules/music/music";

export default class StopCommand implements Command {
    name = 'stop';
    summary = 'Stop playback, clear list, and leave channel';
    cooldown = 5;

    constructor(private music = Deps.get<Music>(Music)) {}
    
    execute = (ctx: CommandContext) => {
        const players = this.music.client.players;
        if (!players)
            throw new Error('Not currently playing any track.');

        players.destroy(ctx.guild.id);
    }
}
