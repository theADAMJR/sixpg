import EventHandler from "./event-handler";

export default class MemberJoinHandler implements EventHandler {
    invoke(...args: any[]): void | Promise<any> {
        const member = args[0];
    }
}