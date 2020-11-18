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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var deps_1 = __importDefault(require("../utils/deps"));
var music_1 = __importDefault(require("../modules/music/music"));
var PlayCommand = /** @class */ (function () {
    function PlayCommand(music) {
        var _this = this;
        if (music === void 0) { music = deps_1.default.get(music_1.default); }
        this.music = music;
        this.aliases = ['p'];
        this.cooldown = 2;
        this.module = 'Music';
        this.name = 'play';
        this.precondition = 'SPEAK';
        this.summary = 'Join and play a YouTube result.';
        this.usage = 'play query';
        this.execute = function (ctx) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return __awaiter(_this, void 0, void 0, function () {
                var query, player, maxQueueSize, track;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            query = args === null || args === void 0 ? void 0 : args.join(' ');
                            if (!query)
                                throw new TypeError('Query must be provided.');
                            player = this.music.joinAndGetPlayer(ctx.member.voice.channel, ctx.channel);
                            maxQueueSize = 5;
                            if (player.q.length >= maxQueueSize)
                                throw new TypeError("Max queue size of `" + maxQueueSize + "` reached.");
                            return [4 /*yield*/, player.play(query)];
                        case 1:
                            track = _a.sent();
                            if (player.isPlaying)
                                return [2 /*return*/, ctx.channel.send("**Added**: `" + track.title + "` to list.")];
                            return [2 /*return*/];
                    }
                });
            });
        };
    }
    return PlayCommand;
}());
exports.default = PlayCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9wbGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsdURBQWlDO0FBRWpDLGlFQUEyQztBQUUzQztJQVNJLHFCQUFvQixLQUE4QjtRQUFsRCxpQkFBc0Q7UUFBbEMsc0JBQUEsRUFBQSxRQUFRLGNBQUksQ0FBQyxHQUFHLENBQVEsZUFBSyxDQUFDO1FBQTlCLFVBQUssR0FBTCxLQUFLLENBQXlCO1FBUmxELFlBQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLGFBQVEsR0FBRyxDQUFDLENBQUM7UUFDYixXQUFNLEdBQUcsT0FBTyxDQUFDO1FBQ2pCLFNBQUksR0FBRyxNQUFNLENBQUM7UUFDZCxpQkFBWSxHQUFlLE9BQU8sQ0FBQztRQUNuQyxZQUFPLEdBQUcsaUNBQWlDLENBQUM7UUFDNUMsVUFBSyxHQUFHLFlBQVksQ0FBQTtRQUlwQixZQUFPLEdBQUcsVUFBTSxHQUFtQjtZQUFFLGNBQWlCO2lCQUFqQixVQUFpQixFQUFqQixxQkFBaUIsRUFBakIsSUFBaUI7Z0JBQWpCLDZCQUFpQjs7Ozs7Ozs0QkFDNUMsS0FBSyxHQUFHLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQzlCLElBQUksQ0FBQyxLQUFLO2dDQUNOLE1BQU0sSUFBSSxTQUFTLENBQUMseUJBQXlCLENBQUMsQ0FBQzs0QkFFN0MsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQzs0QkFFNUUsWUFBWSxHQUFHLENBQUMsQ0FBQzs0QkFDdkIsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxZQUFZO2dDQUMvQixNQUFNLElBQUksU0FBUyxDQUFDLHdCQUF1QixZQUFZLGVBQWEsQ0FBQyxDQUFDOzRCQUU1RCxxQkFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFBOzs0QkFBaEMsS0FBSyxHQUFHLFNBQXdCOzRCQUN0QyxJQUFJLE1BQU0sQ0FBQyxTQUFTO2dDQUNoQixzQkFBTyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxpQkFBZ0IsS0FBSyxDQUFDLEtBQUssZUFBYSxDQUFDLEVBQUM7Ozs7O1NBQ3pFLENBQUE7SUFoQm9ELENBQUM7SUFpQjFELGtCQUFDO0FBQUQsQ0FBQyxBQTFCRCxJQTBCQyJ9