"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GlobalBots = /** @class */ (function () {
    function GlobalBots() {
    }
    Object.defineProperty(GlobalBots, "clients", {
        get: function () { return this._clients.values(); },
        enumerable: false,
        configurable: true
    });
    GlobalBots.add = function (bot) {
        var exists = this._clients.has(bot.user.id);
        if (exists)
            throw new TypeError('Bot already exists!');
        this._clients.set(bot.user.id, bot);
    };
    GlobalBots.remove = function (id) {
        this.get(id).destroy();
    };
    GlobalBots.get = function (id) {
        return this._clients.get(id);
    };
    GlobalBots._clients = new Map();
    return GlobalBots;
}());
exports.default = GlobalBots;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLWJvdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZ2xvYmFsLWJvdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQTtJQUFBO0lBbUJBLENBQUM7SUFsQkMsc0JBQVcscUJBQU87YUFBbEIsY0FBdUIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFHaEQsY0FBRyxHQUFWLFVBQVcsR0FBVztRQUNwQixJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzlDLElBQUksTUFBTTtZQUNSLE1BQU0sSUFBSSxTQUFTLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUU3QyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRU0saUJBQU0sR0FBYixVQUFjLEVBQVU7UUFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRU0sY0FBRyxHQUFWLFVBQVcsRUFBVTtRQUNuQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFoQmMsbUJBQVEsR0FBRyxJQUFJLEdBQUcsRUFBa0IsQ0FBQztJQWlCdEQsaUJBQUM7Q0FBQSxBQW5CRCxJQW1CQztrQkFuQm9CLFVBQVUifQ==