import MemberJoinHandler from './handlers/member-join.handler';
import MemberLeaveHandler from './handlers/member-leave.handler';
import MessageDeleteHandler from './handlers/message-deleted.handler';
import EventHandler from './handlers/event-handler';
import ReadyHandler from './handlers/ready.handler';
import GuildCreateHandler from './handlers/guildCreate.handler';
import MessageHandler from './handlers/message.handler';
import Deps from '../utils/deps';
import Bots from '../data/bots';
import CryptoJS, { AES } from 'crypto-js';
import Log from '../utils/log';
import { Client } from 'discord.js';
import { SavedBot } from '../data/models/bot';

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

        let loggedInCount = 0;
        for (const { tokenHash } of savedBots) {
            const token = AES
                .decrypt(tokenHash || '', process.env.ENCRYPTION_KEY)
                .toString(CryptoJS.enc.Utf8);
            const isValidToken = /^[A-Za-z\d]{24}\.[A-Za-z\d-]{6}\.[A-Za-z\d-_]{27}$/.test(token);
            if (!isValidToken) continue;
            
            try {
                await this.startBot(token);
                loggedInCount++;
            } catch {
                Log.error(`Invalid bot token.`, 'events');
                await SavedBot.deleteOne({ tokenHash });
            }
        }
        Log.info(`Logged in ${loggedInCount} bots`, 'events');
    }

    async startBot(token: string) {
        const bot = new Client();
        const handler = this.handlers[0];
        bot.on('ready', () => handler.invoke(bot));

        await bot.login(token);

        for (const handler of this.handlers.slice(1))
            bot.on(handler.on as any, handler.invoke.bind(handler));

        return bot;
    }
}