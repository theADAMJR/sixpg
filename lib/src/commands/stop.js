"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var deps_1 = __importDefault(require("../utils/deps"));
var music_1 = __importDefault(require("../modules/music/music"));
var StopCommand = /** @class */ (function () {
    function StopCommand(music) {
        var _this = this;
        if (music === void 0) { music = deps_1.default.get(music_1.default); }
        this.music = music;
        this.aliases = ['leave'];
        this.name = 'stop';
        this.summary = 'Stop playback, clear list, and leave channel';
        this.precondition = 'SPEAK';
        this.cooldown = 5;
        this.module = 'Music';
        this.execute = function (ctx) {
            var player = _this.music.client.players.get(ctx.guild.id);
            if (!player)
                throw new TypeError('Not currently playing any track.');
            player.stop();
            player.leave();
        };
    }
    return StopCommand;
}());
exports.default = StopCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9zdG9wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsdURBQWlDO0FBQ2pDLGlFQUEyQztBQUUzQztJQVFJLHFCQUFvQixLQUE4QjtRQUFsRCxpQkFBc0Q7UUFBbEMsc0JBQUEsRUFBQSxRQUFRLGNBQUksQ0FBQyxHQUFHLENBQVEsZUFBSyxDQUFDO1FBQTlCLFVBQUssR0FBTCxLQUFLLENBQXlCO1FBUGxELFlBQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BCLFNBQUksR0FBRyxNQUFNLENBQUM7UUFDZCxZQUFPLEdBQUcsOENBQThDLENBQUM7UUFDekQsaUJBQVksR0FBZSxPQUFPLENBQUM7UUFDbkMsYUFBUSxHQUFHLENBQUMsQ0FBQztRQUNiLFdBQU0sR0FBRyxPQUFPLENBQUM7UUFJakIsWUFBTyxHQUFHLFVBQUMsR0FBbUI7WUFFMUIsSUFBTSxNQUFNLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQzFELElBQUksQ0FBQyxNQUFNO2dCQUNQLE1BQU0sSUFBSSxTQUFTLENBQUMsa0NBQWtDLENBQUMsQ0FBQztZQUU1RCxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDZCxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbkIsQ0FBQyxDQUFBO0lBVm9ELENBQUM7SUFXMUQsa0JBQUM7QUFBRCxDQUFDLEFBbkJELElBbUJDIn0=