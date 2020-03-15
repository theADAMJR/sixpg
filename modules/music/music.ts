import config from '../../config.json';
import { ErelaClient } from 'erela.js';
import { bot } from '../../bot';
import Log from '../../utils/log';

const nodes = [{
    host: 'localhost',
    port: 2333,
    password: (config as any).lavalink.password,
}];

export default class Music {
    private _client = {} as ErelaClient;
    get client() { return this._client; }

    constructor() {
        bot.on('ready', this.initialize.bind(this));
    }

    private initialize() {
        const music = new ErelaClient(bot, nodes);
              
        music.on('nodeConnect', () => Log.info('Connected to Lavalink node', 'music'));
        music.on('nodeError', (node, error) => Log.error(error, 'music'));
        music.on('trackStuck', (player) => player.textChannel.send('❗ Error loading track.'));
        
        music.on('trackStart', (player, track) => player.textChannel.send(`**Now Playing**: \`${track.title}\` 🎵`));
        music.on('queueEnd', (player) => {
            player.textChannel.send('Queue has ended.')
            music.players.destroy(player.guild.id);
        });

        this._client = music;
    }
}