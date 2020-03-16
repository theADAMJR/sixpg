import EventHandler from "./event-handler";
import Deps from "../../utils/deps";
import CommandService from "../command.service";

export default class MessageHandler implements EventHandler {
    on = 'message';

    constructor(private commands = Deps.get<CommandService>(CommandService)) {}

    async invoke(msg: any) {        
        await this.commands.handle(msg);
    }
}