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
var deps_1 = __importDefault(require("../../utils/deps"));
var command_service_1 = __importDefault(require("../command.service"));
var bots_1 = __importDefault(require("../../data/bots"));
var auto_mod_1 = __importDefault(require("../../modules/auto-mod/auto-mod"));
var leveling_1 = __importDefault(require("../../modules/xp/leveling"));
var MessageHandler = /** @class */ (function () {
    function MessageHandler(autoMod, commands, bots, leveling) {
        if (autoMod === void 0) { autoMod = deps_1.default.get(auto_mod_1.default); }
        if (commands === void 0) { commands = deps_1.default.get(command_service_1.default); }
        if (bots === void 0) { bots = deps_1.default.get(bots_1.default); }
        if (leveling === void 0) { leveling = deps_1.default.get(leveling_1.default); }
        this.autoMod = autoMod;
        this.commands = commands;
        this.bots = bots;
        this.leveling = leveling;
        this.on = 'message';
    }
    MessageHandler.prototype.invoke = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var savedBot, isCommand;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (msg.author.bot)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.bots.get(msg.client.user)];
                    case 1:
                        savedBot = _a.sent();
                        isCommand = msg.content.startsWith(savedBot.general.prefix);
                        if (!isCommand) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.commands.handle(msg, savedBot)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        if (!savedBot.autoMod.enabled) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.autoMod.validateMsg(msg, savedBot)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        if (!savedBot.leveling.enabled) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.leveling.validateXPMsg(msg, savedBot)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return MessageHandler;
}());
exports.default = MessageHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NlcnZpY2VzL2hhbmRsZXJzL21lc3NhZ2UuaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDBEQUFvQztBQUNwQyx1RUFBZ0Q7QUFDaEQseURBQW1DO0FBQ25DLDZFQUFzRDtBQUN0RCx1RUFBaUQ7QUFHakQ7SUFHSSx3QkFDWSxPQUFvQyxFQUNwQyxRQUFtRCxFQUNuRCxJQUEyQixFQUMzQixRQUF1QztRQUh2Qyx3QkFBQSxFQUFBLFVBQVUsY0FBSSxDQUFDLEdBQUcsQ0FBVSxrQkFBTyxDQUFDO1FBQ3BDLHlCQUFBLEVBQUEsV0FBVyxjQUFJLENBQUMsR0FBRyxDQUFpQix5QkFBYyxDQUFDO1FBQ25ELHFCQUFBLEVBQUEsT0FBTyxjQUFJLENBQUMsR0FBRyxDQUFPLGNBQUksQ0FBQztRQUMzQix5QkFBQSxFQUFBLFdBQVcsY0FBSSxDQUFDLEdBQUcsQ0FBVyxrQkFBUSxDQUFDO1FBSHZDLFlBQU8sR0FBUCxPQUFPLENBQTZCO1FBQ3BDLGFBQVEsR0FBUixRQUFRLENBQTJDO1FBQ25ELFNBQUksR0FBSixJQUFJLENBQXVCO1FBQzNCLGFBQVEsR0FBUixRQUFRLENBQStCO1FBTm5ELE9BQUUsR0FBRyxTQUFTLENBQUM7SUFNdUMsQ0FBQztJQUVqRCwrQkFBTSxHQUFaLFVBQWEsR0FBWTs7Ozs7O3dCQUNyQixJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRzs0QkFBRSxzQkFBTzt3QkFFVixxQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFBOzt3QkFBL0MsUUFBUSxHQUFHLFNBQW9DO3dCQUUvQyxTQUFTLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzs2QkFDOUQsU0FBUyxFQUFULHdCQUFTO3dCQUNGLHFCQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsRUFBQTs0QkFBaEQsc0JBQU8sU0FBeUMsRUFBQzs7NkJBR2pELFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUF4Qix3QkFBd0I7d0JBQ3hCLHFCQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsRUFBQTs7d0JBQTdDLFNBQTZDLENBQUM7Ozs2QkFDOUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQXpCLHdCQUF5Qjt3QkFDekIscUJBQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxFQUFBOzt3QkFBaEQsU0FBZ0QsQ0FBQzs7Ozs7O0tBQ3hEO0lBQ0wscUJBQUM7QUFBRCxDQUFDLEFBeEJELElBd0JDIn0=