import EventHandler from "./event-handler";
import { Message } from "discord.js";

export default class MessageDeleteHandler implements EventHandler {
    async invoke(...args: any[]) {
        const msg: Message = args[0];
        
        await msg.channel.send(`Message Deleted: \`${msg.content}\``);
    }
}
