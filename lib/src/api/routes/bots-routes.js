"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
exports.getManageableBots = exports.validateBotOwner = exports.router = void 0;
var express_1 = require("express");
var config_json_1 = __importDefault(require("../../../config.json"));
var member_1 = require("../../data/models/member");
var server_1 = require("../server");
var deps_1 = __importDefault(require("../../utils/deps"));
var members_1 = __importDefault(require("../../data/members"));
var ranks_1 = __importDefault(require("../modules/ranks"));
var users_1 = __importDefault(require("../../data/users"));
var bots_1 = __importDefault(require("../../data/bots"));
var logs_1 = __importDefault(require("../../data/logs"));
var audit_logger_1 = __importDefault(require("../modules/audit-logger"));
var leveling_1 = __importDefault(require("../../modules/xp/leveling"));
var user_routes_1 = require("./user-routes");
var api_routes_1 = require("./api-routes");
var global_bots_1 = __importDefault(require("../../global-bots"));
var aes_1 = __importDefault(require("crypto-js/aes"));
var events_service_1 = __importDefault(require("../../services/events.service"));
var xp_card_generator_1 = require("../modules/image/xp-card-generator");
exports.router = express_1.Router();
var events = deps_1.default.get(events_service_1.default), logs = deps_1.default.get(logs_1.default), members = deps_1.default.get(members_1.default), users = deps_1.default.get(users_1.default), bots = deps_1.default.get(bots_1.default);
exports.router.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var clients, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, getManageableBots(req.query.key.toString())];
            case 1:
                clients = _a.sent();
                res.json(clients);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                api_routes_1.sendError(res, 400, error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.router.post('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authUser, bot, savedBot, exists, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, user_routes_1.getUser(req.query.key)];
            case 1:
                authUser = _a.sent();
                return [4 /*yield*/, events.startBot(req.body.token)];
            case 2:
                bot = _a.sent();
                return [4 /*yield*/, bots.get(bot.user)];
            case 3:
                savedBot = _a.sent();
                return [4 /*yield*/, bots.exists(bot.user)];
            case 4:
                exists = _a.sent();
                if (!exists) {
                    savedBot.id = bot.user.id;
                    savedBot.ownerId = authUser.id;
                }
                savedBot.tokenHash = aes_1.default.encrypt(req.body.token, config_json_1.default.encryptionKey);
                return [4 /*yield*/, savedBot.save()];
            case 5:
                _a.sent();
                res.json(savedBot);
                return [3 /*break*/, 7];
            case 6:
                error_2 = _a.sent();
                api_routes_1.sendError(res, 400, error_2);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
exports.router.patch('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var bot, error_3, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, events.startBot(req.body.token)];
            case 2:
                bot = _a.sent();
                res.json(bot.user);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                throw new TypeError('Invalid token, reverting back.');
            case 4: return [3 /*break*/, 6];
            case 5:
                error_4 = _a.sent();
                api_routes_1.sendError(res, 400, error_4);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
exports.router.delete('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                global_bots_1.default.remove(id);
                return [4 /*yield*/, bots.delete(id)];
            case 1:
                _a.sent();
                res.json({ success: true });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                api_routes_1.sendError(res, 400, error_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.router.put('/:id/:module', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, module_1, user, savedConfig, change, log, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                _a = req.params, id = _a.id, module_1 = _a.module;
                return [4 /*yield*/, validateBotOwner(req.query.key.toString(), id)];
            case 1:
                _b.sent();
                return [4 /*yield*/, user_routes_1.getUser(req.query.key)];
            case 2:
                user = _b.sent();
                return [4 /*yield*/, bots.get({ id: id })];
            case 3:
                savedConfig = _b.sent();
                change = audit_logger_1.default.getChanges({
                    old: savedConfig[module_1],
                    new: req.body
                }, module_1, user.id);
                savedConfig[module_1] = req.body;
                return [4 /*yield*/, bots.save(savedConfig)];
            case 4:
                _b.sent();
                return [4 /*yield*/, logs.get({ id: id })];
            case 5:
                log = _b.sent();
                log.changes.push(change);
                return [4 /*yield*/, log.save()];
            case 6:
                _b.sent();
                res.json(savedConfig);
                return [3 /*break*/, 8];
            case 7:
                error_6 = _b.sent();
                api_routes_1.sendError(res, 400, error_6);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
exports.router.get('/:id/config', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var savedConfig, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, bots.get({ id: req.params.id })];
            case 1:
                savedConfig = _a.sent();
                res.json(savedConfig);
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                api_routes_1.sendError(res, 400, error_7);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.router.get('/:id/log', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var bot, log, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                bot = global_bots_1.default.get(req.params.id);
                return [4 /*yield*/, logs.get(bot.user)];
            case 1:
                log = _a.sent();
                res.send(log);
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                api_routes_1.sendError(res, 400, error_8);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.router.get('/:id/public', function (req, res) {
    var bot = global_bots_1.default.get(req.params.id);
    res.json(bot);
});
exports.router.get('/:botId/guilds', function (req, res) {
    try {
        var botId = req.params.botId;
        var bot = global_bots_1.default.get(botId);
        if (!bot)
            throw new TypeError('Bot not found.');
        res.json(bot.guilds.cache);
    }
    catch (error) {
        api_routes_1.sendError(res, 400, error);
    }
});
exports.router.get('/:botId/guilds/:guildId', function (req, res) {
    try {
        var _a = req.params, botId = _a.botId, guildId = _a.guildId;
        var bot = global_bots_1.default.get(botId);
        if (!bot)
            throw new TypeError('Bot not found.');
        var guild = bot.guilds.cache.get(guildId);
        res.json(guild);
    }
    catch (error) {
        api_routes_1.sendError(res, 400, error);
    }
});
exports.router.get('/:botId/guilds/:guildId/members', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, botId, guildId, bot, savedMembers, rankedMembers, savedMembers_1, savedMembers_1_1, member, user, xpInfo, error_9;
    var e_1, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                _a = req.params, botId = _a.botId, guildId = _a.guildId;
                bot = global_bots_1.default.get(botId);
                return [4 /*yield*/, member_1.SavedMember.find({ guildId: guildId }).lean()];
            case 1:
                savedMembers = _c.sent();
                rankedMembers = [];
                try {
                    for (savedMembers_1 = __values(savedMembers), savedMembers_1_1 = savedMembers_1.next(); !savedMembers_1_1.done; savedMembers_1_1 = savedMembers_1.next()) {
                        member = savedMembers_1_1.value;
                        user = bot.users.cache.get(member.userId);
                        if (!user)
                            continue;
                        xpInfo = leveling_1.default.xpInfo(member.xp);
                        rankedMembers.push(leaderboardMember(user, xpInfo));
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (savedMembers_1_1 && !savedMembers_1_1.done && (_b = savedMembers_1.return)) _b.call(savedMembers_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                rankedMembers.sort(function (a, b) { return b.xp - a.xp; });
                res.json(rankedMembers);
                return [3 /*break*/, 3];
            case 2:
                error_9 = _c.sent();
                api_routes_1.sendError(res, 400, error_9);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.router.get('/:botId/guilds/:guildId/members/:memberId/xp-card', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, botId, guildId, memberId, bot, guild, member, user, savedUser, savedMember, savedMembers, rank, generator, image, error_10;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.params, botId = _a.botId, guildId = _a.guildId, memberId = _a.memberId;
                bot = global_bots_1.default.get(botId);
                guild = bot.guilds.cache.get(guildId);
                member = guild === null || guild === void 0 ? void 0 : guild.members.cache.get(memberId);
                if (!member)
                    throw Error();
                user = bot.users.cache.get(memberId);
                return [4 /*yield*/, users.get(user)];
            case 1:
                savedUser = _b.sent();
                return [4 /*yield*/, members.get(member)];
            case 2:
                savedMember = _b.sent();
                return [4 /*yield*/, member_1.SavedMember.find({ guildId: guildId })];
            case 3:
                savedMembers = _b.sent();
                rank = ranks_1.default.get(member, savedMembers);
                generator = new xp_card_generator_1.XPCardGenerator(user, savedUser, rank);
                return [4 /*yield*/, generator.generate(savedMember)];
            case 4:
                image = _b.sent();
                res.set({ 'Content-Type': 'image/png' }).send(image);
                return [3 /*break*/, 6];
            case 5:
                error_10 = _b.sent();
                api_routes_1.sendError(res, 400, error_10);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
function validateBotOwner(key, botId) {
    return __awaiter(this, void 0, void 0, function () {
        var manageableBots, isManageable;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!key)
                        throw new TypeError('No key provided.');
                    return [4 /*yield*/, getManageableBots(key)];
                case 1:
                    manageableBots = _a.sent();
                    isManageable = manageableBots.some(function (b) { return b.id === botId; });
                    if (!isManageable)
                        throw new TypeError('You cannot manage this bot.');
                    return [2 /*return*/];
            }
        });
    });
}
exports.validateBotOwner = validateBotOwner;
function getManageableBots(key) {
    return __awaiter(this, void 0, void 0, function () {
        var authUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, server_1.AuthClient.getUser(key)];
                case 1:
                    authUser = _a.sent();
                    return [2 /*return*/, bots.getManageableBots(authUser.id)];
            }
        });
    });
}
exports.getManageableBots = getManageableBots;
function leaderboardMember(user, xpInfo) {
    return __assign({ id: user.id, username: user.username, tag: '#' + user.discriminator, displayAvatarURL: user.displayAvatarURL({ dynamic: true }) }, xpInfo);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm90cy1yb3V0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBpL3JvdXRlcy9ib3RzLXJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUNBQWlDO0FBQ2pDLHFFQUEwQztBQUMxQyxtREFBdUQ7QUFDdkQsb0NBQXVDO0FBQ3ZDLDBEQUFvQztBQUNwQywrREFBeUM7QUFDekMsMkRBQXFDO0FBQ3JDLDJEQUFxQztBQUNyQyx5REFBbUM7QUFDbkMseURBQW1DO0FBQ25DLHlFQUFrRDtBQUVsRCx1RUFBaUQ7QUFDakQsNkNBQXdDO0FBQ3hDLDJDQUF5QztBQUN6QyxrRUFBMkM7QUFDM0Msc0RBQWdDO0FBQ2hDLGlGQUEwRDtBQUMxRCx3RUFBcUU7QUFFeEQsUUFBQSxNQUFNLEdBQUcsZ0JBQU0sRUFBRSxDQUFDO0FBRS9CLElBQU0sTUFBTSxHQUFHLGNBQUksQ0FBQyxHQUFHLENBQWdCLHdCQUFhLENBQUMsRUFDL0MsSUFBSSxHQUFHLGNBQUksQ0FBQyxHQUFHLENBQU8sY0FBSSxDQUFDLEVBQzNCLE9BQU8sR0FBRyxjQUFJLENBQUMsR0FBRyxDQUFVLGlCQUFPLENBQUMsRUFDcEMsS0FBSyxHQUFHLGNBQUksQ0FBQyxHQUFHLENBQVEsZUFBSyxDQUFDLEVBQzlCLElBQUksR0FBRyxjQUFJLENBQUMsR0FBRyxDQUFPLGNBQUksQ0FBQyxDQUFDO0FBRWxDLGNBQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFVBQU8sR0FBRyxFQUFFLEdBQUc7Ozs7OztnQkFFUCxxQkFBTSxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFBOztnQkFBM0QsT0FBTyxHQUFHLFNBQWlEO2dCQUVqRSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8s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