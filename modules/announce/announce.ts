import { bot } from "../../bot";
import MemberJoinHandler from "./handlers/member-join.handler";
import MemberLeaveHandler from "./handlers/member-leave.handler";
import EventHandler from "./handlers/event-handler";
import MessageDeleteHandler from "./handlers/message-deleted.handler";

export default class Announce {
    private readonly events: Map<string, EventHandler> = new Map([
        ['guildMemberAdd', new MemberJoinHandler()],
        ['guildMemberRemove', new MemberLeaveHandler()],
        ['messageDelete', new MessageDeleteHandler()],
    ]);

    constructor() {        
        this.subscribeToEvents();
    }

    private subscribeToEvents() {                
        for (const event of this.events.keys()) {            
            const handler = this.events.get(event);
            
            handler && bot.on(event, handler.invoke);
        }
    }
}
