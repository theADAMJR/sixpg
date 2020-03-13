import { ErelaClient } from 'erela.js';
import { bot } from '../../bot';
import Log from '../../utils/log';

const nodes = [{
    host: "localhost",
    port: 2333,
    password: "youshallnotpass",
}];

export let music: ErelaClient;

bot.on('ready', () =>
{
    music = new ErelaClient(bot, nodes);
    
    music.on("nodeConnect", node => Log.info("New node connected"));
    music.on("nodeError", (node, error) => console.log(`Node error: ${error.message}`));
    music.on("trackStart", (player, track) => player.textChannel.send(`Now playing: ${track.title}`));
    music.on("queueEnd", player => {
        player.textChannel.send("Queue has ended.")
        music.players.destroy(player.guild.id);
    });
});