import MemberJoinHandler from './handlers/member-join.handler';
import MemberLeaveHandler from './handlers/member-leave.handler';
import MessageDeleteHandler from './handlers/message-deleted.handler';
import EventHandler from './handlers/event-handler';
import ReadyHandler from './handlers/ready.handler';
import GuildCreateHandler from './handlers/guildCreate.handler';
import MessageHandler from './handlers/message.handler';
import Deps from '../utils/deps';
import Bots from '../data/bots';
import AES from 'crypto-js/aes';
import config from '../config.json';
import Log from '../utils/log';
import { Client } from 'discord.js';

export default class EventsService {
    private readonly handlers: EventHandler[] = [
        new ReadyHandler(),
        new GuildCreateHandler(),
        new MessageHandler(),
        new MemberJoinHandler(),
        new MemberLeaveHandler(),
        new MessageDeleteHandler()
    ];

    constructor(private bots = Deps.get<Bots>(Bots)) {}

    async init() {
        const savedBots = await this.bots.getAll();
        console.log(savedBots.length);

        let loggedInCount = 0;
        for (const { tokenHash } of savedBots) {
            const isValidToken = /^[A-Za-z\d]{24}\.[A-Za-z\d-]{6}\.[A-Za-z\d-_]{27}$/.test(tokenHash);
            if (!isValidToken) continue;
            
            await this.startBot(tokenHash);
            loggedInCount++;
        }
        Log.info(`Logged in ${loggedInCount} bots`, 'events');
    }

    async startBot(tokenHash: string) {
        const token = AES.decrypt(tokenHash, config.encryptionKey);

        const bot = new Client();
        const handler = this.handlers[0];
        bot.on('ready', handler.invoke.bind(handler));

        for (const handler of this.handlers)
            bot.on(handler.on, () => handler.invoke(bot));

        await bot.login(token);
    }
}