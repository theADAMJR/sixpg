import * as config from '../../config.json';
import { ErelaClient, Player, Track } from 'erela.js';
import Log from '../../utils/log';
import { GuildMember, TextChannel, Client, ClientUser } from 'discord.js';
import SnowflakeEntity from '../../data/snowflake-entity';

export default class Music {
    readonly clients = new Map<string, ErelaClient>();

    initialize(bot: Client) {
        const nodes = [{
            host: 'localhost',
            port: 2333,
            password: config.lavalink.password,
        }];
        const musicClient = new ErelaClient(bot, nodes);

        this.hookEvents(musicClient);

        this.clients.set(bot.user.id, musicClient);
    }

    getClient({ id }: SnowflakeEntity) {
        return this.clients.get(id);
    }

    private hookEvents(music: ErelaClient) {
        music.on('nodeConnect', () => Log.info('Connected to Lavalink node', 'music'));
        music.on('nodeError', (node, error) => Log.error(error, 'music'));
        music.on('trackStuck', (player) => player.textChannel.send('❗ Error loading track.'));
        music.on('trackStart', (player, track) => player.textChannel?.send(`**Now Playing**: \`${track.title}\` 🎵`));
        music.on('queueEnd', (player) => {
            player.textChannel?.send('Queue has ended.');
            music.players.destroy(player.guild.id);
        });
    }
    
    joinAndGetPlayer(member: GuildMember, textChannel?: TextChannel) {
        const voiceChannel = member?.voice.channel;
        if (!voiceChannel)
            throw new TypeError('You must be in a voice channel to play music.');
            
        return this.clients
            .get(member.client.user.id).players
            ?.spawn({
                guild: member.guild,
                textChannel,
                voiceChannel
            });
    }

    getDurationString(player: Player, track?: Track) {
        if (!player.playing)
            throw new TypeError('No track is currently playing.');

        const positionInSeconds = player.position / 1000;
        const durationInSeconds = (track ?? player.queue[0]).duration / 1000;        

        return `${Math.floor(positionInSeconds / 60)}:${Math.floor(positionInSeconds % 60).toString().padStart(2, '0')} / ` +
            `${Math.floor(durationInSeconds / 60)}:${Math.floor(durationInSeconds % 60).toString().padStart(2, '0')}`;
    }

    async findTrack(query: string, requestor: GuildMember, maxTrackLength: number) {
        const track = await this.searchForTrack(query, requestor);

        const maxHours = maxTrackLength * 60 * 60 * 1000;      
        if (track.duration > maxHours)
            throw new TypeError(`Track length must be less than or equal to \`${maxTrackLength} hours\``);
        return track;
    }

    skip(player: Player) {
        if (player.queue.size <= 1)
            throw new TypeError('No tracks to skip');
        player.stop();
    }

    private async searchForTrack(query: string, requestor: GuildMember) {
        const res = await this.clients
            .get(requestor.client.user.id)
            .search(query, requestor);    
        return res.tracks[0];
    }
}
