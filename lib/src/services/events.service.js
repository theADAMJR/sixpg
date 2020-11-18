"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var member_join_handler_1 = __importDefault(require("./handlers/member-join.handler"));
var member_leave_handler_1 = __importDefault(require("./handlers/member-leave.handler"));
var message_deleted_handler_1 = __importDefault(require("./handlers/message-deleted.handler"));
var ready_handler_1 = __importDefault(require("./handlers/ready.handler"));
var guildCreate_handler_1 = __importDefault(require("./handlers/guildCreate.handler"));
var message_handler_1 = __importDefault(require("./handlers/message.handler"));
var deps_1 = __importDefault(require("../utils/deps"));
var bots_1 = __importDefault(require("../data/bots"));
var crypto_js_1 = __importStar(require("crypto-js"));
var config_json_1 = __importDefault(require("../../config.json"));
var log_1 = __importDefault(require("../utils/log"));
var discord_js_1 = require("discord.js");
var bot_1 = require("../data/models/bot");
var EventsService = /** @class */ (function () {
    function EventsService(bots) {
        if (bots === void 0) { bots = deps_1.default.get(bots_1.default); }
        this.bots = bots;
        this.handlers = [
            new ready_handler_1.default(),
            new guildCreate_handler_1.default(),
            new message_handler_1.default(),
            new member_join_handler_1.default(),
            new member_leave_handler_1.default(),
            new message_deleted_handler_1.default()
        ];
    }
    EventsService.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var savedBots, loggedInCount, savedBots_1, savedBots_1_1, tokenHash, token, isValidToken, _a, e_1_1;
            var e_1, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.bots.getAll()];
                    case 1:
                        savedBots = _c.sent();
                        loggedInCount = 0;
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 10, 11, 12]);
                        savedBots_1 = __values(savedBots), savedBots_1_1 = savedBots_1.next();
                        _c.label = 3;
                    case 3:
                        if (!!savedBots_1_1.done) return [3 /*break*/, 9];
                        tokenHash = savedBots_1_1.value.tokenHash;
                        token = crypto_js_1.AES
                            .decrypt(tokenHash || '', config_json_1.default.encryptionKey)
                            .toString(crypto_js_1.default.enc.Utf8);
                        isValidToken = /^[A-Za-z\d]{24}\.[A-Za-z\d-]{6}\.[A-Za-z\d-_]{27}$/.test(token);
                        if (!isValidToken)
                            return [3 /*break*/, 8];
                        _c.label = 4;
                    case 4:
                        _c.trys.push([4, 6, , 8]);
                        return [4 /*yield*/, this.startBot(token)];
                    case 5:
                        _c.sent();
                        loggedInCount++;
                        return [3 /*break*/, 8];
                    case 6:
                        _a = _c.sent();
                        log_1.default.error("Invalid bot token.", 'events');
                        return [4 /*yield*/, bot_1.SavedBot.deleteOne({ tokenHash: tokenHash })];
                    case 7:
                        _c.sent();
                        return [3 /*break*/, 8];
                    case 8:
                        savedBots_1_1 = savedBots_1.next();
                        return [3 /*break*/, 3];
                    case 9: return [3 /*break*/, 12];
                    case 10:
                        e_1_1 = _c.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 12];
                    case 11:
                        try {
                            if (savedBots_1_1 && !savedBots_1_1.done && (_b = savedBots_1.return)) _b.call(savedBots_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 12:
                        log_1.default.info("Logged in " + loggedInCount + " bots", 'events');
                        return [2 /*return*/];
                }
            });
        });
    };
    EventsService.prototype.startBot = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var bot, handler, _a, _b, handler_1;
            var e_2, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        bot = new discord_js_1.Client();
                        handler = this.handlers[0];
                        bot.on('ready', function () { return handler.invoke(bot); });
                        return [4 /*yield*/, bot.login(token)];
                    case 1:
                        _d.sent();
                        try {
                            for (_a = __values(this.handlers.slice(1)), _b = _a.next(); !_b.done; _b = _a.next()) {
                                handler_1 = _b.value;
                                bot.on(handler_1.on, handler_1.invoke.bind(handler_1));
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        return [2 /*return*/, bot];
                }
            });
        });
    };
    return EventsService;
}());
exports.default = EventsService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvZXZlbnRzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1RkFBK0Q7QUFDL0QseUZBQWlFO0FBQ2pFLCtGQUFzRTtBQUV0RSwyRUFBb0Q7QUFDcEQsdUZBQWdFO0FBQ2hFLCtFQUF3RDtBQUN4RCx1REFBaUM7QUFDakMsc0RBQWdDO0FBQ2hDLHFEQUEwQztBQUMxQyxrRUFBdUM7QUFDdkMscURBQStCO0FBQy9CLHlDQUFvQztBQUNwQywwQ0FBOEM7QUFFOUM7SUFVSSx1QkFBb0IsSUFBMkI7UUFBM0IscUJBQUEsRUFBQSxPQUFPLGNBQUksQ0FBQyxHQUFHLENBQU8sY0FBSSxDQUFDO1FBQTNCLFNBQUksR0FBSixJQUFJLENBQXVCO1FBVDlCLGFBQVEsR0FBbUI7WUFDeEMsSUFBSSx1QkFBWSxFQUFFO1lBQ2xCLElBQUksNkJBQWtCLEVBQUU7WUFDeEIsSUFBSSx5QkFBYyxFQUFFO1lBQ3BCLElBQUksNkJBQWlCLEVBQUU7WUFDdkIsSUFBSSw4QkFBa0IsRUFBRTtZQUN4QixJQUFJLGlDQUFvQixFQUFFO1NBQzdCLENBQUM7SUFFZ0QsQ0FBQztJQUU3Qyw0QkFBSSxHQUFWOzs7Ozs7NEJBQ3NCLHFCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUE7O3dCQUFwQyxTQUFTLEdBQUcsU0FBd0I7d0JBRXRDLGFBQWEsR0FBRyxDQUFDLENBQUM7Ozs7d0JBQ00sY0FBQSxTQUFBLFNBQVMsQ0FBQTs7Ozt3QkFBeEIsU0FBUyxnQ0FBQTt3QkFDWixLQUFLLEdBQUcsZUFBRzs2QkFDWixPQUFPLENBQUMsU0FBUyxJQUFJLEVBQUUsRUFBRSxxQkFBTSxDQUFDLGFBQWEsQ0FBQzs2QkFDOUMsUUFBUSxDQUFDLG1CQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUMzQixZQUFZLEdBQUcsb0RBQW9ELENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUN0RixJQUFJLENBQUMsWUFBWTs0QkFBRSx3QkFBUzs7Ozt3QkFHeEIscUJBQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBQTs7d0JBQTFCLFNBQTBCLENBQUM7d0JBQzNCLGFBQWEsRUFBRSxDQUFDOzs7O3dCQUVoQixhQUFHLENBQUMsS0FBSyxDQUFDLG9CQUFvQixFQUFFLFFBQVEsQ0FBQyxDQUFDO3dCQUMxQyxxQkFBTSxjQUFRLENBQUMsU0FBUyxDQUFDLEVBQUUsU0FBUyxXQUFBLEVBQUUsQ0FBQyxFQUFBOzt3QkFBdkMsU0FBdUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7d0JBR2hELGFBQUcsQ0FBQyxJQUFJLENBQUMsZUFBYSxhQUFhLFVBQU8sRUFBRSxRQUFRLENBQUMsQ0FBQzs7Ozs7S0FDekQ7SUFFSyxnQ0FBUSxHQUFkLFVBQWUsS0FBYTs7Ozs7Ozt3QkFDbEIsR0FBRyxHQUFHLElBQUksbUJBQU0sRUFBRSxDQUFDO3dCQUNuQixPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDakMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQW5CLENBQW1CLENBQUMsQ0FBQzt3QkFFM0MscUJBQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBQTs7d0JBQXRCLFNBQXNCLENBQUM7OzRCQUV2QixLQUFzQixLQUFBLFNBQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0NBQXZDO2dDQUNELEdBQUcsQ0FBQyxFQUFFLENBQUMsU0FBTyxDQUFDLEVBQVMsRUFBRSxTQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFPLENBQUMsQ0FBQyxDQUFDOzZCQUFBOzs7Ozs7Ozs7d0JBRTVELHNCQUFPLEdBQUcsRUFBQzs7OztLQUNkO0lBQ0wsb0JBQUM7QUFBRCxDQUFDLEFBOUNELElBOENDIn0=