"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PingCommand = /** @class */ (function () {
    function PingCommand() {
        this.name = 'ping';
        this.summary = 'Probably the best command ever created.';
        this.precondition = '';
        this.cooldown = 3;
        this.module = 'General';
        this.execute = function (ctx) { return ctx.channel.send("\uD83C\uDFD3 Pong! `" + ctx.bot.ws.ping + "ms`"); };
    }
    return PingCommand;
}());
exports.default = PingCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9waW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7SUFBQTtRQUNJLFNBQUksR0FBRyxNQUFNLENBQUM7UUFDZCxZQUFPLEdBQUcseUNBQXlDLENBQUM7UUFDcEQsaUJBQVksR0FBZSxFQUFFLENBQUM7UUFDOUIsYUFBUSxHQUFHLENBQUMsQ0FBQztRQUNiLFdBQU0sR0FBRyxTQUFTLENBQUM7UUFFbkIsWUFBTyxHQUFHLFVBQUMsR0FBbUIsSUFBSyxPQUFBLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHlCQUFjLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksUUFBTSxDQUFDLEVBQXJELENBQXFELENBQUM7SUFDN0YsQ0FBQztJQUFELGtCQUFDO0FBQUQsQ0FBQyxBQVJELElBUUMifQ==