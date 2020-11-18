"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cooldowns = /** @class */ (function () {
    function Cooldowns() {
        this.cooldowns = [];
    }
    Cooldowns.prototype.active = function (author, command) {
        return this.cooldowns
            .some(function (c) { return c.userId === author.id && c.commandName === command.name; });
    };
    Cooldowns.prototype.add = function (user, command) {
        var _this = this;
        var _a;
        var cooldown = { userId: user.id, commandName: command.name };
        if (!this.active(user, command))
            this.cooldowns.push(cooldown);
        var seconds = ((_a = command.cooldown) !== null && _a !== void 0 ? _a : 0) * 1000;
        setTimeout(function () { return _this.remove(user, command); }, seconds);
    };
    Cooldowns.prototype.remove = function (user, command) {
        var index = this.cooldowns
            .findIndex(function (c) { return c.userId === user.id && c.commandName === command.name; });
        this.cooldowns.splice(index, 1);
    };
    return Cooldowns;
}());
exports.default = Cooldowns;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29vbGRvd25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL2Nvb2xkb3ducy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBO0lBQUE7UUFDWSxjQUFTLEdBQXNCLEVBQUUsQ0FBQztJQW9COUMsQ0FBQztJQWxCRywwQkFBTSxHQUFOLFVBQU8sTUFBWSxFQUFFLE9BQWdCO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLFNBQVM7YUFDaEIsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxXQUFXLEtBQUssT0FBTyxDQUFDLElBQUksRUFBeEQsQ0FBd0QsQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFDRCx1QkFBRyxHQUFILFVBQUksSUFBVSxFQUFFLE9BQWdCO1FBQWhDLGlCQVFDOztRQVBHLElBQU0sUUFBUSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsV0FBVyxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVoRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDO1lBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRWxDLElBQU0sT0FBTyxHQUFHLE9BQUMsT0FBTyxDQUFDLFFBQVEsbUNBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQy9DLFVBQVUsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEVBQTFCLENBQTBCLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUNELDBCQUFNLEdBQU4sVUFBTyxJQUFVLEVBQUUsT0FBZ0I7UUFDL0IsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVM7YUFDdkIsU0FBUyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxXQUFXLEtBQUssT0FBTyxDQUFDLElBQUksRUFBdEQsQ0FBc0QsQ0FBQyxDQUFDO1FBQzVFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQUFDLEFBckJELElBcUJDIn0=