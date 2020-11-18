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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bots_1 = __importDefault(require("../../data/bots"));
var deps_1 = __importDefault(require("../../utils/deps"));
var AnnounceHandler = /** @class */ (function () {
    function AnnounceHandler(bots) {
        if (bots === void 0) { bots = deps_1.default.get(bots_1.default); }
        this.bots = bots;
    }
    AnnounceHandler.prototype.getEvent = function (guild) {
        return __awaiter(this, void 0, void 0, function () {
            var savedConfig, activeEvent;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bots.get(guild.client.user)];
                    case 1:
                        savedConfig = _a.sent();
                        activeEvent = savedConfig.announce.events.find(function (e) { return e.event === _this.event; });
                        return [2 /*return*/, (savedConfig.announce.enabled && activeEvent) ? activeEvent : null];
                }
            });
        });
    };
    AnnounceHandler.prototype.getChannel = function (config, guild) {
        return guild.channels.cache.find(function (c) { return c.name === (config === null || config === void 0 ? void 0 : config.channelName); });
    };
    AnnounceHandler.prototype.announce = function (guild, applyEventArgs) {
        return __awaiter(this, void 0, void 0, function () {
            var config, message, channel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getEvent(guild)];
                    case 1:
                        config = _a.sent();
                        if (!config)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.applyEventVariables.apply(this, __spread([config.message], applyEventArgs))];
                    case 2:
                        message = _a.sent();
                        if (message.length <= 0)
                            return [2 /*return*/];
                        channel = this.getChannel(config, guild);
                        return [4 /*yield*/, (channel === null || channel === void 0 ? void 0 : channel.send(message))];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return AnnounceHandler;
}());
exports.default = AnnounceHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ub3VuY2UtaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9oYW5kbGVycy9hbm5vdW5jZS1oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx5REFBbUM7QUFFbkMsMERBQW9DO0FBR3BDO0lBSUkseUJBQXNCLElBQTJCO1FBQTNCLHFCQUFBLEVBQUEsT0FBTyxjQUFJLENBQUMsR0FBRyxDQUFPLGNBQUksQ0FBQztRQUEzQixTQUFJLEdBQUosSUFBSSxDQUF1QjtJQUFHLENBQUM7SUFFckMsa0NBQVEsR0FBeEIsVUFBeUIsS0FBWTs7Ozs7OzRCQUNiLHFCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUE7O3dCQUFwRCxXQUFXLEdBQUcsU0FBc0M7d0JBRXBELFdBQVcsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsS0FBSyxLQUFLLEtBQUksQ0FBQyxLQUFLLEVBQXRCLENBQXNCLENBQUMsQ0FBQzt3QkFDbEYsc0JBQU8sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLE9BQU8sSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUM7Ozs7S0FDN0U7SUFFUyxvQ0FBVSxHQUFwQixVQUFxQixNQUFxQixFQUFFLEtBQVk7UUFDcEQsT0FBTyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxNQUFLLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxXQUFXLENBQUEsRUFBOUIsQ0FBOEIsQ0FBZ0IsQ0FBQztJQUN6RixDQUFDO0lBRWUsa0NBQVEsR0FBeEIsVUFBeUIsS0FBWSxFQUFFLGNBQXFCOzs7Ozs0QkFDekMscUJBQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBQTs7d0JBQW5DLE1BQU0sR0FBRyxTQUEwQjt3QkFDekMsSUFBSSxDQUFDLE1BQU07NEJBQUUsc0JBQU87d0JBRUoscUJBQU0sSUFBSSxDQUFDLG1CQUFtQixPQUF4QixJQUFJLFlBQXFCLE1BQU0sQ0FBQyxPQUFPLEdBQUssY0FBYyxJQUFDOzt3QkFBM0UsT0FBTyxHQUFHLFNBQWlFO3dCQUVqRixJQUFJLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQzs0QkFBRSxzQkFBTzt3QkFFNUIsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO3dCQUM3QyxzQkFBTSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsSUFBSSxDQUFDLE9BQU8sSUFBQzs7d0JBQTVCLFNBQTRCLENBQUM7Ozs7O0tBQ2hDO0lBS0wsc0JBQUM7QUFBRCxDQUFDLEFBaENELElBZ0NDIn0=