"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validators = /** @class */ (function () {
    function Validators() {
    }
    Validators.prototype.checkCommand = function (command, guild, msg) {
        var config = guild.commands.configs.find(function (c) { return c.name === command.name; });
        if (!config)
            return;
        if (!config.enabled)
            throw new TypeError('Command not enabled!');
    };
    Validators.prototype.checkPreconditions = function (command, executor) {
        if (command.precondition && !executor.hasPermission(command.precondition))
            throw new TypeError("**Required Permission**: `" + command.precondition + "`");
    };
    Validators.prototype.checkChannel = function (channel, savedGuild) {
        var isIgnored = savedGuild.general.ignoredChannelNames
            .some(function (name) { return name === channel.name; });
        if (isIgnored)
            throw new TypeError('Commands cannot be executed in this channel.');
    };
    return Validators;
}());
exports.default = Validators;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy92YWxpZGF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUE7SUFBQTtJQW9CQSxDQUFDO0lBbkJHLGlDQUFZLEdBQVosVUFBYSxPQUFnQixFQUFFLEtBQWtCLEVBQUUsR0FBWTtRQUMzRCxJQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxJQUFJLEVBQXZCLENBQXVCLENBQUMsQ0FBQztRQUN6RSxJQUFJLENBQUMsTUFBTTtZQUFFLE9BQU87UUFFcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPO1lBQ2YsTUFBTSxJQUFJLFNBQVMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCx1Q0FBa0IsR0FBbEIsVUFBbUIsT0FBZ0IsRUFBRSxRQUFxQjtRQUN0RCxJQUFJLE9BQU8sQ0FBQyxZQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUM7WUFDckUsTUFBTSxJQUFJLFNBQVMsQ0FBQywrQkFBOEIsT0FBTyxDQUFDLFlBQVksTUFBSSxDQUFDLENBQUM7SUFDcEYsQ0FBQztJQUVELGlDQUFZLEdBQVosVUFBYSxPQUFvQixFQUFFLFVBQXVCO1FBQ3RELElBQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsbUJBQW1CO2FBQ25ELElBQUksQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksS0FBSyxPQUFPLENBQUMsSUFBSSxFQUFyQixDQUFxQixDQUFDLENBQUM7UUFDekMsSUFBSSxTQUFTO1lBQ1QsTUFBTSxJQUFJLFNBQVMsQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFDTCxpQkFBQztBQUFELENBQUMsQUFwQkQsSUFvQkMifQ==