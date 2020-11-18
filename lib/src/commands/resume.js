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
var ResumeCommand = /** @class */ (function () {
    function ResumeCommand(music) {
        var _this = this;
        if (music === void 0) { music = deps_1.default.get(music_1.default); }
        this.music = music;
        this.name = 'resume';
        this.summary = 'Resume playing a track if paused.';
        this.precondition = 'SPEAK';
        this.module = 'Music';
        this.execute = function (ctx) { return __awaiter(_this, void 0, void 0, function () {
            var player;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        player = this.music.joinAndGetPlayer(ctx.member.voice.channel, ctx.channel);
                        if (!player.isPaused)
                            throw new TypeError('Player is already resumed.');
                        return [4 /*yield*/, player.resume()];
                    case 1:
                        _a.sent();
                        ctx.channel.send("**Resumed**: `" + player.q.peek().title + "`");
                        return [2 /*return*/];
                }
            });
        }); };
    }
    return ResumeCommand;
}());
exports.default = ResumeCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL3Jlc3VtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHVEQUFpQztBQUNqQyxpRUFBMkM7QUFFM0M7SUFNSSx1QkFBb0IsS0FBOEI7UUFBbEQsaUJBQXNEO1FBQWxDLHNCQUFBLEVBQUEsUUFBUSxjQUFJLENBQUMsR0FBRyxDQUFRLGVBQUssQ0FBQztRQUE5QixVQUFLLEdBQUwsS0FBSyxDQUF5QjtRQUxsRCxTQUFJLEdBQUcsUUFBUSxDQUFDO1FBQ2hCLFlBQU8sR0FBRyxtQ0FBbUMsQ0FBQztRQUM5QyxpQkFBWSxHQUFlLE9BQU8sQ0FBQztRQUNuQyxXQUFNLEdBQUcsT0FBTyxDQUFDO1FBSWpCLFlBQU8sR0FBRyxVQUFPLEdBQW1COzs7Ozt3QkFDMUIsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFFbEYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFROzRCQUNoQixNQUFNLElBQUksU0FBUyxDQUFDLDRCQUE0QixDQUFDLENBQUM7d0JBRXRELHFCQUFNLE1BQU0sQ0FBQyxNQUFNLEVBQUUsRUFBQTs7d0JBQXJCLFNBQXFCLENBQUM7d0JBRXRCLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLG1CQUFrQixNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssTUFBSSxDQUFDLENBQUM7Ozs7YUFDakUsQ0FBQTtJQVhvRCxDQUFDO0lBWTFELG9CQUFDO0FBQUQsQ0FBQyxBQWxCRCxJQWtCQyJ9