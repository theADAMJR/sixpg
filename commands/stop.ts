import { Command, CommandContext } from "./Command";
import { music } from "../modules/music/music";

export default class StopCommand implements Command {
    name = 'stop';
    summary = 'Stop playback, clear list, and leave channel';
    cooldown = 5;
    
    execute = async(ctx: CommandContext) => {
        music.players.destroy(ctx.guild.id);
    }
}
