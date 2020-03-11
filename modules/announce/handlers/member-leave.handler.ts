import EventHandler from "./event-handler";

export default class MemberLeaveHandler implements EventHandler {
    invoke(...args: any[]): void | Promise<any> {
        const member = args[0];
    }
}