"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GuildCreateHandler = /** @class */ (function () {
    function GuildCreateHandler() {
        this.on = 'guildCreate';
    }
    GuildCreateHandler.prototype.invoke = function (guild) {
        return this.sendWelcomeMessage(guild === null || guild === void 0 ? void 0 : guild.systemChannel);
    };
    GuildCreateHandler.prototype.sendWelcomeMessage = function (channel) {
        return channel === null || channel === void 0 ? void 0 : channel.send("Hey, I'm 6PG!");
    };
    return GuildCreateHandler;
}());
exports.default = GuildCreateHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VpbGRDcmVhdGUuaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9oYW5kbGVycy9ndWlsZENyZWF0ZS5oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0E7SUFBQTtRQUNJLE9BQUUsR0FBRyxhQUFhLENBQUM7SUFTdkIsQ0FBQztJQVBHLG1DQUFNLEdBQU4sVUFBTyxLQUFtQjtRQUN0QixPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsYUFBYSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVPLCtDQUFrQixHQUExQixVQUEyQixPQUEyQjtRQUNsRCxPQUFPLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxJQUFJLENBQUMsZUFBZSxFQUFFO0lBQzFDLENBQUM7SUFDTCx5QkFBQztBQUFELENBQUMsQUFWRCxJQVVDIn0=