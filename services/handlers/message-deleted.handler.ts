import AnnounceHandler from "./announce-handler";
import { Message, TextChannel } from "discord.js";
import { EventType } from "../../models/guild";
import EventHandler from "./event-handler";

export default class MessageDeleteHandler extends AnnounceHandler implements EventHandler {
    on = 'messageDelete';

    async invoke(...args: any[]) {
        const msg: Message = args[0];
        if (msg.author.bot || !msg.guild) return;
        
        const event = await super.getEvent(EventType.MessageDeleted, msg.guild);
        if (!event) return;

        const channel = msg.guild.channels.cache.get(event.channel) as TextChannel;
        await channel?.send(`Message Deleted: \`${msg.content}\``);
    }
    
    protected applyGuildVariables(...args: any[]): string {
        throw new TypeError("Method not implemented.");
    }
}
