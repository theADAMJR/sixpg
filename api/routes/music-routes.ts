import { Router } from 'express';
import Music from '../../modules/music/music';
import Deps from '../../utils/deps';
import { validateBotOwner } from './bots-routes';
import { AuthClient } from '../server';
import Users from '../../data/users';
import GlobalBots from '../../global-bots';

export const router = Router({ mergeParams: true });

const music = Deps.get<Music>(Music),
      users = Deps.get<Users>(Users);

router.get('/pause', async (req, res) => {
    try {
        const { player } = await getMusic(req.params.botId, req.params.guildId, req.query.key);
        player.pause(true);

        res.status(200).send({ success: true });
    } catch (error) { res.status(400).send(error?.message); }
});

router.get('/resume', async (req, res) => {
    try {
        const { player } = await getMusic(req.params.botId, req.params.guildId, req.query.key);
        player.pause(false);

        res.status(200).send({ success: true });
    } catch (error) { res.status(400).send(error?.message); }
});

router.get('/list', async (req, res) => {
    try {
        const { player } = await getMusic(req.params.botId, req.params.guildId, req.query.key);

        for (const track of player.queue) {
            const durationInSeconds = track.duration / 1000;  
            track.durationString = `${Math.floor(durationInSeconds / 60)}:${Math.floor(durationInSeconds % 60)
                .toString().padStart(2, '0')}`;
        }

        res.status(200).json(player.queue);
    } catch (error) { res.status(400).send(error?.message); }
});

router.get('/skip', async (req, res) => {
    try {
        const { player } = await getMusic(req.params.botId, req.params.guildId, req.query.key);
        
        music.skip(player);

        res.status(200).send({ success: true });
    } catch (error) { res.status(400).send(error?.message); }
});

router.get('/seek/:position', async (req, res) => {
    try {
        const { player } = await getMusic(req.params.botId, req.params.guildId, req.query.key);

        player.seek(req.params.position * 1000);

        res.status(200).send({ success: true });
    } catch (error) { res.status(400).send(error?.message); }
});

router.get('/remove/:number', async (req, res) => {
    try {
        const { player } = await getMusic(req.params.botId, req.params.guildId, req.query.key);
        
        const track = player.queue.remove(Number(req.params.number));

        res.status(200).json(track);
    } catch (error) { res.status(400).send(error?.message); }
});

router.get('/play', async (req, res) => {
    try {
        const { player, requestor, hasPremium } = await getMusic(req.params.botId, req.params.guildId, req.query.key);
        const track = await music.findTrack(
            req.query.query, requestor, req.query.maxTrackLength ?? 2);
        
        const maxSize = (hasPremium) ? 10 : 5;
        if (player.queue.size >= maxSize)
            throw new Error('Queue limit reached.');

        player.queue.add(track);
        if (!player.playing)
            player.play();

        res.status(200).json(track);
    } catch (error) { res.status(400).send(error?.message); }
});

router.get('/set-volume/:value', async (req, res) => {
    try {
        const { player } = await getMusic(req.params.botId, req.params.guildId, req.query.key);

        player.setVolume(Number(req.params.value));

        res.status(200).send({ success: true });
    } catch (error) { res.status(400).send(error?.message); }    
});

router.get('/shuffle', async (req, res) => {
    try {
        const { player } = await getMusic(req.params.botId, req.params.guildId, req.query.key);

        player.queue.shuffle();

        res.status(200).send({ success: true });
    } catch (error) { res.status(400).send(error?.message); }    
});

router.get('/stop', async (req, res) => {
    try {
        await validateBotOwner(req.query.key, req.params.botId);

        music.getClient({ id: req.params.botId }).players
            .destroy(req.params.guildId);

        res.status(200).send({ success: true });
    } catch (error) { res.status(400).send(error?.message); }
});

async function getMusic(botId: string, guildId: string, key: string) {
    const bot = GlobalBots.get(botId);
    
    const { id } = await AuthClient.getUser(key);

    const user = bot.users.cache.get(id);
    const guild = bot.guilds.cache.get(guildId);
    const member = guild?.members.cache.get(id);
    if (!member)
        throw new TypeError('Member not found.');

    const savedUser = await users.get(user);

    return {
        player: music.joinAndGetPlayer(member, null),
        requestor: member,
        hasPremium: savedUser.premium
    };
}
