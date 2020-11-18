import { Client } from 'discord.js';

export default class GlobalBots {
  static get clients() { return this._clients.values(); }
  private static _clients = new Map<string, Client>();
  
  static add(bot: Client) {
    const exists = this._clients.has(bot.user.id);
    if (exists)
      throw new TypeError('Bot already exists!');
      
    this._clients.set(bot.user.id, bot);
  }

  static remove(id: string) {
    this.get(id).destroy();
  }
  
  static get(id: string) {
    return this._clients.get(id);
  }
}