import { ErelaClient } from 'erela.js';
import { bot } from '../../bot';
import Log from '../../utils/log';

export default class Music {
    private nodes = [{
        host: "localhost",
        port: 2333,
        password: "youshallnotpass",
    }];

    constructor() {
        this.initialize();
    }

    private initialize() {
        bot.on('ready', () =>
        {
            const music = new ErelaClient(bot, this.nodes);
            
            music.on("nodeConnect", node => console.log("New node connected"));
            music.on("nodeError", (node, error) => console.log(`Node error: ${error.message}`));
            music.on("trackStart", (player, track) => player.textChannel.send(`Now playing: ${track.title}`));
            music.on("queueEnd", player => {
            player.textChannel.send("Queue has ended.")
            music.players.destroy(player.guild.id);
        });
    });
    }
}