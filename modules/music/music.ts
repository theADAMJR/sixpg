import config from '../../config.json';
import { ErelaClient } from 'erela.js';
import { bot } from '../../bot';
import Log from '../../utils/log';

const nodes = [{
    host: 'localhost',
    port: 2333,
    password: (config as any).lavalink.password,
}];

export let music: ErelaClient;

export class Music {
    constructor() {
        this.initialize();
    }

    private initialize() {
        music = new ErelaClient(bot, nodes);
        
        music.on('nodeConnect', () => Log.info('New node connected'));
        music.on('nodeError', (node, error) => Log.error(error, 'music'));
        music.on('trackStuck', (player) => player.textChannel.send('❗ Error loading track.'));
        
        music.on('trackStart', (player, track) => player.textChannel.send(`**Now Playing**: \`${track.title}\` 🎵`));
        music.on('queueEnd', (player) => {
            player.textChannel.send('Queue has ended.')
            music.players.destroy(player.guild.id);
        });
    }
}