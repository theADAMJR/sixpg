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
var auto_mod_1 = __importDefault(require("../modules/auto-mod/auto-mod"));
var deps_1 = __importDefault(require("../utils/deps"));
var command_utils_1 = __importDefault(require("../utils/command-utils"));
var WarnCommand = /** @class */ (function () {
    function WarnCommand(autoMod) {
        var _this = this;
        if (autoMod === void 0) { autoMod = deps_1.default.get(auto_mod_1.default); }
        this.autoMod = autoMod;
        this.name = 'warn';
        this.summary = 'Warn a user and add a warning to their account.';
        this.precondition = 'KICK_MEMBERS';
        this.cooldown = 5;
        this.module = 'Auto-mod';
        this.execute = function (ctx, targetMention, reason) { return __awaiter(_this, void 0, void 0, function () {
            var target;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        target = (targetMention) ?
                            command_utils_1.default.getMemberFromMention(targetMention, ctx.guild) : ctx.member;
                        return [4 /*yield*/, this.autoMod.warn(target, ctx.user, reason)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, ctx.channel.send(target + " was warned for " + reason)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
    }
    return WarnCommand;
}());
exports.default = WarnCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Fybi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy93YXJuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsMEVBQW1EO0FBQ25ELHVEQUFpQztBQUNqQyx5RUFBa0Q7QUFFbEQ7SUFPSSxxQkFBb0IsT0FBb0M7UUFBeEQsaUJBQTREO1FBQXhDLHdCQUFBLEVBQUEsVUFBVSxjQUFJLENBQUMsR0FBRyxDQUFVLGtCQUFPLENBQUM7UUFBcEMsWUFBTyxHQUFQLE9BQU8sQ0FBNkI7UUFOeEQsU0FBSSxHQUFHLE1BQU0sQ0FBQztRQUNkLFlBQU8sR0FBRyxpREFBaUQsQ0FBQztRQUM1RCxpQkFBWSxHQUFlLGNBQWMsQ0FBQztRQUMxQyxhQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsV0FBTSxHQUFHLFVBQVUsQ0FBQztRQUlwQixZQUFPLEdBQUcsVUFBTSxHQUFtQixFQUFFLGFBQXFCLEVBQUUsTUFBZTs7Ozs7d0JBQ2pFLE1BQU0sR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7NEJBQzVCLHVCQUFZLENBQUMsb0JBQW9CLENBQUMsYUFBYSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQzt3QkFFN0UscUJBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEVBQUE7O3dCQUFqRCxTQUFpRCxDQUFDO3dCQUVsRCxxQkFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBSSxNQUFNLHdCQUFtQixNQUFRLENBQUMsRUFBQTs7d0JBQTVELFNBQTRELENBQUM7Ozs7YUFDaEUsQ0FBQztJQVR5RCxDQUFDO0lBVWhFLGtCQUFDO0FBQUQsQ0FBQyxBQWpCRCxJQWlCQyJ9