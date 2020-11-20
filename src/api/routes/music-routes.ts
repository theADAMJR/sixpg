import { Router } from 'express';
import Music from '../../modules/music/music';
import Deps from '../../utils/deps';
import { AuthClient } from '../server';
import Users from '../../data/users';
import GlobalBots from '../../global-bots';

export const router = Router({ mergeParams: true });

const music = Deps.get<Music>(Music),
      users = Deps.get<Users>(Users);

router.get('/pause', async (req, res) => {
    try {
        const { player } = await getMusic(req.params.botId, req.params.guildId, req.query.key);
        await player.pause();

        res.status(200).send({ success: true });
    } catch (error) { res.status(400).send(error?.message); }
});

router.get('/resume', async (req, res) => {
    try {
        const { player } = await getMusic(req.params.botId, req.params.guildId, req.query.key);
        await player.resume();

        res.status(200).send({ success: true });
    } catch (error) { res.status(400).send(error?.message); }
});

router.get('/list', async (req, res) => {
    try {
        const { player } = await getMusic(req.params.botId, req.params.guildId, req.query.key);

        for (const track of player.q.items)
            track['durationString'] = `${track.duration}`;

        res.status(200).json(player.q.items);
    } catch (error) { res.status(400).send(error?.message); }
});

router.get('/skip', async (req, res) => {
    try {
        const { player } = await getMusic(req.params.botId, req.params.guildId, req.query.key);
        await player.skip();

        res.status(200).send({ success: true });
    } catch (error) { res.status(400).send(error?.message); }
});

// FIXME: make work
// router.get('/seek/:position', async (req, res) => {
//     try {
//         const { player } = await getMusic(req.params.guildId, req.query.key);

//         player.seek(+req.params.position * 1000);

//         res.status(200).send({ success: true });
//     } catch (error) { res.status(400).send(error?.message); }
// });

router.get('/remove/:number', async (req, res) => {
    try {
        const { player } = await getMusic(req.params.botId, req.params.guildId, req.query.key);
        
        const track = player.q.items.splice(+req.params.number - 1);

        res.status(200).json(track);
    } catch (error) { res.status(400).send(error?.message); }
});

router.get('/play', async (req, res) => {
    try {
        const { player, hasPremium } = await getMusic(req.params.botId, req.params.guildId, req.query.key);
        const track = await player.play(req.query.query?.toString());
        
        const maxSize = (hasPremium) ? 10 : 5;
        if (player.q.length >= maxSize)
            throw new TypeError('Queue limit reached.');

        res.status(200).json(track);
    } catch (error) { res.status(400).send(error?.message); }
});

router.get('/set-volume/:value', async (req, res) => {
    try {
        const { player } = await getMusic(req.params.botId, req.params.guildId, req.query.key);
        await player.setVolume(+req.params.value / 100);

        res.status(200).send({ success: true });
    } catch (error) { res.status(400).send(error?.message); }    
});

router.get('/shuffle', async (req, res) => {
    try {
        const { player } = await getMusic(req.params.botId, req.params.guildId, req.query.key);

        player.q.shuffle();

        res.status(200).send({ success: true });
    } catch (error) { res.status(400).send(error?.message); }    
});

router.get('/stop', async (req, res) => {
    try {
        const { player } = await getMusic(req.params.botId, req.params.guildId, req.query.key);
        await player.stop();

        res.status(200).send({ success: true });
    } catch (error) { res.status(400).send(error?.message); }
});

async function getMusic(botId: string, guildId: string, key: any) {
    const bot = GlobalBots.get(botId);
    const { id } = await AuthClient.getUser(key);

    const user = bot.users.cache.get(id);
    const member = bot.guilds.cache
        .get(guildId)?.members.cache
        .get(id);
    if (!member)
        throw new TypeError('Member not found.');

    const savedUser = await users.get(user);

    return {
        player: music.joinAndGetPlayer(member.voice.channel),
        requestor: member,
        hasPremium: savedUser.premium
    };
}
