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
exports.router = void 0;
var express_1 = require("express");
var music_1 = __importDefault(require("../../modules/music/music"));
var deps_1 = __importDefault(require("../../utils/deps"));
var server_1 = require("../server");
var users_1 = __importDefault(require("../../data/users"));
var global_bots_1 = __importDefault(require("../../global-bots"));
exports.router = express_1.Router({ mergeParams: true });
var music = deps_1.default.get(music_1.default), users = deps_1.default.get(users_1.default);
exports.router.get('/pause', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var player, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, getMusic(req.params.botId, req.params.id, req.query.key)];
            case 1:
                player = (_a.sent()).player;
                return [4 /*yield*/, player.pause()];
            case 2:
                _a.sent();
                res.status(200).send({ success: true });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                res.status(400).send(error_1 === null || error_1 === void 0 ? void 0 : error_1.message);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.router.get('/resume', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var player, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, getMusic(req.params.botId, req.params.id, req.query.key)];
            case 1:
                player = (_a.sent()).player;
                return [4 /*yield*/, player.resume()];
            case 2:
                _a.sent();
                res.status(200).send({ success: true });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                res.status(400).send(error_2 === null || error_2 === void 0 ? void 0 : error_2.message);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.router.get('/list', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var player, _a, _b, track, error_3;
    var e_1, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 2, , 3]);
                return [4 /*yield*/, getMusic(req.params.botId, req.params.id, req.query.key)];
            case 1:
                player = (_d.sent()).player;
                try {
                    for (_a = __values(player.q.items), _b = _a.next(); !_b.done; _b = _a.next()) {
                        track = _b.value;
                        track['durationString'] = "" + track.duration;
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                res.status(200).json(player.q.items);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _d.sent();
                res.status(400).send(error_3 === null || error_3 === void 0 ? void 0 : error_3.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.router.get('/skip', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var player, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, getMusic(req.params.botId, req.params.id, req.query.key)];
            case 1:
                player = (_a.sent()).player;
                return [4 /*yield*/, player.skip()];
            case 2:
                _a.sent();
                res.status(200).send({ success: true });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                res.status(400).send(error_4 === null || error_4 === void 0 ? void 0 : error_4.message);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// FIXME: make work
// router.get('/seek/:position', async (req, res) => {
//     try {
//         const { player } = await getMusic(req.params.id, req.query.key);
//         player.seek(+req.params.position * 1000);
//         res.status(200).send({ success: true });
//     } catch (error) { res.status(400).send(error?.message); }
// });
exports.router.get('/remove/:number', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var player, track, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, getMusic(req.params.botId, req.params.id, req.query.key)];
            case 1:
                player = (_a.sent()).player;
                track = player.q.items.splice(+req.params.number - 1);
                res.status(200).json(track);
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                res.status(400).send(error_5 === null || error_5 === void 0 ? void 0 : error_5.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.router.get('/play', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, player, hasPremium, track, maxSize, error_6;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                return [4 /*yield*/, getMusic(req.params.botId, req.params.id, req.query.key)];
            case 1:
                _a = _c.sent(), player = _a.player, hasPremium = _a.hasPremium;
                return [4 /*yield*/, player.play((_b = req.query.query) === null || _b === void 0 ? void 0 : _b.toString())];
            case 2:
                track = _c.sent();
                maxSize = (hasPremium) ? 10 : 5;
                if (player.q.length >= maxSize)
                    throw new TypeError('Queue limit reached.');
                res.status(200).json(track);
                return [3 /*break*/, 4];
            case 3:
                error_6 = _c.sent();
                res.status(400).send(error_6 === null || error_6 === void 0 ? void 0 : error_6.message);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.router.get('/set-volume/:value', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var player, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, getMusic(req.params.botId, req.params.id, req.query.key)];
            case 1:
                player = (_a.sent()).player;
                return [4 /*yield*/, player.setVolume(+req.params.value / 100)];
            case 2:
                _a.sent();
                res.status(200).send({ success: true });
                return [3 /*break*/, 4];
            case 3:
                error_7 = _a.sent();
                res.status(400).send(error_7 === null || error_7 === void 0 ? void 0 : error_7.message);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.router.get('/shuffle', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var player, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, getMusic(req.params.botId, req.params.id, req.query.key)];
            case 1:
                player = (_a.sent()).player;
                player.q.shuffle();
                res.status(200).send({ success: true });
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                res.status(400).send(error_8 === null || error_8 === void 0 ? void 0 : error_8.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.router.get('/stop', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var player, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, getMusic(req.params.botId, req.params.id, req.query.key)];
            case 1:
                player = (_a.sent()).player;
                return [4 /*yield*/, player.stop()];
            case 2:
                _a.sent();
                res.status(200).send({ success: true });
                return [3 /*break*/, 4];
            case 3:
                error_9 = _a.sent();
                res.status(400).send(error_9 === null || error_9 === void 0 ? void 0 : error_9.message);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
function getMusic(botId, guildId, key) {
    return __awaiter(this, void 0, void 0, function () {
        var bot, id, user, guild, member, savedUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bot = global_bots_1.default.get(botId);
                    return [4 /*yield*/, server_1.AuthClient.getUser(key)];
                case 1:
                    id = (_a.sent()).id;
                    user = bot.users.cache.get(id);
                    guild = bot.guilds.cache.get(guildId);
                    member = guild === null || guild === void 0 ? void 0 : guild.members.cache.get(id);
                    if (!member)
                        throw new TypeError('Member not found.');
                    return [4 /*yield*/, users.get(user)];
                case 2:
                    savedUser = _a.sent();
                    return [2 /*return*/, {
                            player: music.joinAndGetPlayer(member.voice.channel),
                            requestor: member,
                            hasPremium: savedUser.premium
                        }];
            }
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVzaWMtcm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS9yb3V0ZXMvbXVzaWMtcm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUNBQWlDO0FBQ2pDLG9FQUE4QztBQUM5QywwREFBb0M7QUFDcEMsb0NBQXVDO0FBQ3ZDLDJEQUFxQztBQUNyQyxrRUFBMkM7QUFFOUIsUUFBQSxNQUFNLEdBQUcsZ0JBQU0sQ0FBQyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBRXBELElBQU0sS0FBSyxHQUFHLGNBQUksQ0FBQyxHQUFHLENBQVEsZUFBSyxDQUFDLEVBQzlCLEtBQUssR0FBRyxjQUFJLENBQUMsR0FBRyxDQUFRLGVBQUssQ0FBQyxDQUFDO0FBRXJDLGNBQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFVBQU8sR0FBRyxFQUFFLEdBQUc7Ozs7OztnQkFFVCxxQkFBTSxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBQTs7Z0JBQXpFLE1BQU0sR0FBSyxDQUFBLFNBQThELENBQUEsT0FBbkU7Z0JBQ2QscUJBQU0sTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFBOztnQkFBcEIsU0FBb0IsQ0FBQztnQkFFckIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzs7OztnQkFDMUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBSyxhQUFMLE9BQUssdUJBQUwsT0FBSyxDQUFFLE9BQU8sQ0FBQyxDQUFDOzs7OztL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