"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var music_1 = require("@2pg/music");
var Music = /** @class */ (function () {
    function Music() {
        this._client = {};
    }
    Object.defineProperty(Music.prototype, "client", {
        get: function () { return this._client; },
        enumerable: false,
        configurable: true
    });
    Music.prototype.initialize = function () {
        this._client = new music_1.MusicClient();
        this.hookEvents();
    };
    Music.prototype.hookEvents = function () {
        this.client.on('trackStart', function (player, track) { var _a; return (_a = player.textChannel) === null || _a === void 0 ? void 0 : _a.send("**Now Playing**: `" + track.title + "` \uD83C\uDFB5"); });
        this.client.on('queueEnd', function (player) { var _a; return (_a = player.textChannel) === null || _a === void 0 ? void 0 : _a.send("**Queue has Ended** \uD83C\uDFB5"); });
    };
    Music.prototype.joinAndGetPlayer = function (voiceChannel, textChannel) {
        var _a;
        if (!voiceChannel)
            throw new TypeError('You must be in a voice channel to play music.');
        return (_a = this.client.get(voiceChannel.guild.id)) !== null && _a !== void 0 ? _a : this.client.create(voiceChannel.guild.id, { textChannel: textChannel, voiceChannel: voiceChannel });
    };
    Music.prototype.getDuration = function (player, track) {
        if (!player.isPlaying)
            throw new TypeError('No track is currently playing.');
        var positionInSeconds = (track === player.q.peek())
            ? player.position / 1000
            : 0;
        track = (track !== null && track !== void 0 ? track : player.q.peek());
        return Math.floor(positionInSeconds / 60) + ":" + Math.floor(positionInSeconds % 60).toString().padStart(2, '0') + " / " +
            (Math.floor(track.duration.seconds / 60) + ":" + Math.floor(track.duration.seconds % 60).toString().padStart(2, '0'));
    };
    Music.prototype.findTrack = function (query, maxTrackLength) {
        return __awaiter(this, void 0, void 0, function () {
            var track, maxHoursInSeconds;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.searchForTrack(query)];
                    case 1:
                        track = _a.sent();
                        maxHoursInSeconds = maxTrackLength * 60 * 60;
                        if (track.duration.seconds > maxHoursInSeconds)
                            throw new TypeError("Track length must be less than or equal to `" + maxTrackLength + " hours`");
                        return [2 /*return*/, track];
                }
            });
        });
    };
    Music.prototype.searchForTrack = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var videos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.search(query)];
                    case 1:
                        videos = _a.sent();
                        return [2 /*return*/, videos[0]];
                }
            });
        });
    };
    return Music;
}());
exports.default = Music;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVzaWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9tdXNpYy9tdXNpYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG9DQUF3RDtBQUV4RDtJQUFBO1FBQ1ksWUFBTyxHQUFHLEVBQWlCLENBQUM7SUFnRHhDLENBQUM7SUEvQ0csc0JBQUkseUJBQU07YUFBVixjQUFlLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBRXJDLDBCQUFVLEdBQVY7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksbUJBQVcsRUFBRSxDQUFDO1FBRWpDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRU8sMEJBQVUsR0FBbEI7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsVUFBQyxNQUFNLEVBQUUsS0FBSyx5QkFBSyxNQUFNLENBQUMsV0FBVywwQ0FBRSxJQUFJLENBQUMsdUJBQXNCLEtBQUssQ0FBQyxLQUFLLG1CQUFPLElBQUMsQ0FBQyxDQUFDO1FBQ3BILElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxVQUFDLE1BQU0seUJBQUssTUFBTSxDQUFDLFdBQVcsMENBQUUsSUFBSSxDQUFDLGtDQUF3QixJQUFDLENBQUMsQ0FBQztJQUMvRixDQUFDO0lBRUQsZ0NBQWdCLEdBQWhCLFVBQWlCLFlBQTBCLEVBQUUsV0FBeUI7O1FBQ2xFLElBQUksQ0FBQyxZQUFZO1lBQ2IsTUFBTSxJQUFJLFNBQVMsQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO1FBRXpFLGFBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsbUNBQ3RDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsV0FBVyxhQUFBLEVBQUUsWUFBWSxjQUFBLEVBQUUsQ0FBQyxDQUFDO0lBQ3BGLENBQUM7SUFFRCwyQkFBVyxHQUFYLFVBQVksTUFBYyxFQUFFLEtBQWE7UUFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTO1lBQ2pCLE1BQU0sSUFBSSxTQUFTLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztRQUUxRCxJQUFNLGlCQUFpQixHQUFHLENBQUMsS0FBSyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDakQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSTtZQUN4QixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1IsS0FBSyxHQUFHLENBQUMsS0FBSyxhQUFMLEtBQUssY0FBTCxLQUFLLEdBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBVSxDQUFDO1FBRTVDLE9BQVUsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUMsU0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLFFBQUs7YUFDNUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsU0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFHLENBQUEsQ0FBQztJQUM1SCxDQUFDO0lBRUsseUJBQVMsR0FBZixVQUFnQixLQUFhLEVBQUUsY0FBc0I7Ozs7OzRCQUM1QixxQkFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxFQUFBOzt3QkFBL0MsS0FBSyxHQUFVLFNBQWdDO3dCQUUvQyxpQkFBaUIsR0FBRyxjQUFjLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQzt3QkFDbkQsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxpQkFBaUI7NEJBQzFDLE1BQU0sSUFBSSxTQUFTLENBQUMsaURBQWdELGNBQWMsWUFBVSxDQUFDLENBQUM7d0JBQ2xHLHNCQUFPLEtBQUssRUFBQzs7OztLQUNoQjtJQUVhLDhCQUFjLEdBQTVCLFVBQTZCLEtBQWE7Ozs7OzRCQUN2QixxQkFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBQTs7d0JBQXhDLE1BQU0sR0FBRyxTQUErQjt3QkFDOUMsc0JBQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFDOzs7O0tBQ3BCO0lBQ0wsWUFBQztBQUFELENBQUMsQUFqREQsSUFpREMifQ==