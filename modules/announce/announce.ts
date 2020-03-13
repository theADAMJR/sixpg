import { bot } from "../../bot";

import MemberJoinHandler from "./handlers/member-join.handler";
import MemberLeaveHandler from "./handlers/member-leave.handler";
import MessageDeleteHandler from "./handlers/message-deleted.handler";
import Log from "../../utils/log";

export default class Announce {
    private readonly handlers = [
        new MemberJoinHandler(),
        new MemberLeaveHandler(),
        new MessageDeleteHandler()
    ];
    constructor() {
        this.initialize();
    }

    initialize() {
        for (const handler of this.handlers) {
            bot.on(handler.on, handler.invoke);
        }
        Log.info(`Loaded: ${this.handlers.length} handlers`);
    }
}
