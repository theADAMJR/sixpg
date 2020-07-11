import { Client } from 'discord.js';
import EventsService from './services/events.service';
import Deps from './utils/deps';
import Bots from './data/bots';
import Log from './utils/log';
import SHA256 from 'crypto-js/sha256';

export default class GlobalBots {
  static get clients() { return this._clients.values(); }
  private static _clients = new Map<string, Client>();
  
  static add(bot: Client) {
    this._clients.set(bot.user.id, bot);
  }

  static remove(bot: Client) {
    this._clients.delete(bot.user.id);
  }
  
  static get(id: string) {
    return this._clients.get(id);
  }

  static async init() {
    const savedBots = await Deps.get<Bots>(Bots).getAll();
    for (const { tokenHash } of savedBots) {
      const token = SHA256(tokenHash);

      const bot = new Client();
      this.add(bot);

      bot.login(token);
    }
    Log.info(`Logged in ${this._clients.size} bots`, 'global');

    await Deps.get<EventsService>(EventsService).init();
  }
}