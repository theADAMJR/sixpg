import MemberJoinHandler from './handlers/member-join.handler';
import MemberLeaveHandler from './handlers/member-leave.handler';
import MessageDeleteHandler from './handlers/message-deleted.handler';
import EventHandler from './handlers/event-handler';
import ReadyHandler from './handlers/ready.handler';
import GuildCreateHandler from './handlers/guildCreate.handler';
import MessageHandler from './handlers/message.handler';
import GlobalBots from '../global-bots';

export default class EventsService {
    // TODO: add auto loading
    private readonly handlers: EventHandler[] = [
        new ReadyHandler(),
        new GuildCreateHandler(),
        new MessageHandler(),
        new MemberJoinHandler(),
        new MemberLeaveHandler(),
        new MessageDeleteHandler()
    ];

    async init() {
        const clients = GlobalBots.clients;
        for (const client of clients)
            for (const handler of this.handlers)
                client.on(handler.on, handler.invoke.bind(handler));  
    }
}