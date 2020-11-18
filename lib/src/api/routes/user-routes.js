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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.router = void 0;
var express_1 = require("express");
var xp_card_generator_1 = require("../modules/image/xp-card-generator");
var member_1 = require("../../data/models/member");
var server_1 = require("../server");
var deps_1 = __importDefault(require("../../utils/deps"));
var users_1 = __importDefault(require("../../data/users"));
var api_routes_1 = require("./api-routes");
exports.router = express_1.Router();
exports.router.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, getUser(req.query.key)];
            case 1:
                user = _a.sent();
                res.json(user);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                api_routes_1.sendError(res, 400, error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.router.get('/saved', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, savedUser, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, getUser(req.query.key)];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, deps_1.default.get(users_1.default).get(user)];
            case 2:
                savedUser = _a.sent();
                res.json(savedUser);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                api_routes_1.sendError(res, 400, error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.router.get('/xp-card-preview', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authUser, savedUser, rank, generator, member, image, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                delete req.query.cache;
                return [4 /*yield*/, getUser(req.query.key)];
            case 1:
                authUser = _a.sent();
                return [4 /*yield*/, deps_1.default.get(users_1.default).get(authUser)];
            case 2:
                savedUser = _a.sent();
                if (!savedUser)
                    return [2 /*return*/, res.status(404).send('User not found')];
                rank = 1;
                generator = new xp_card_generator_1.XPCardGenerator(authUser, savedUser, rank);
                member = new member_1.SavedMember();
                member.xp = 1800;
                delete req.query.key;
                return [4 /*yield*/, generator.generate(member, __assign(__assign({}, savedUser.xpCard), req.query))];
            case 3:
                image = _a.sent();
                res.set({ 'Content-Type': 'image/png' }).send(image);
                return [3 /*break*/, 5];
            case 4:
                error_3 = _a.sent();
                api_routes_1.sendError(res, 400, error_3);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.router.put('/xp-card', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, savedUser, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, getUser(req.query.key)];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, deps_1.default.get(users_1.default).get(user)];
            case 2:
                savedUser = _a.sent();
                savedUser.xpCard = req.body;
                return [4 /*yield*/, savedUser.save()];
            case 3:
                _a.sent();
                res.send(savedUser);
                return [3 /*break*/, 5];
            case 4:
                error_4 = _a.sent();
                api_routes_1.sendError(res, 400, error_4);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
function getUser(key) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, server_1.AuthClient.getUser(key)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getUser = getUser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1yb3V0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBpL3JvdXRlcy91c2VyLXJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1DQUFpQztBQUNqQyx3RUFBcUU7QUFDckUsbURBQXVEO0FBQ3ZELG9DQUF1QztBQUN2QywwREFBb0M7QUFDcEMsMkRBQXFDO0FBRXJDLDJDQUF5QztBQUU1QixRQUFBLE1BQU0sR0FBRyxnQkFBTSxFQUFFLENBQUM7QUFFL0IsY0FBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsVUFBTyxHQUFHLEVBQUUsR0FBRzs7Ozs7O2dCQUVWLHFCQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFBOztnQkFBbkMsSUFBSSxHQUFHLFNBQTRCO2dCQUN6QyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7O2dCQUNELHNCQUFTLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxPQUFLLENBQUMsQ0FBQzs7Ozs7S0FDaEQsQ0FBQyxDQUFDO0FBRUgsY0FBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsVUFBTyxHQUFHLEVBQUUsR0FBRzs7Ozs7O2dCQUVmLHFCQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFBOztnQkFBbkMsSUFBSSxHQUFHLFNBQTRCO2dCQUN2QixxQkFBTSxjQUFJLENBQUMsR0FBRyxDQUFRLGVBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBQTs7Z0JBQWxELFNBQVMsR0FBRyxTQUFzQztnQkFDeEQsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzs7OztnQkFDTixzQkFBUyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsT0FBSyxDQUFDLENBQUM7Ozs7O0tBQ2hELENBQUMsQ0FBQztBQUVILGNBQU0sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsVUFBTyxHQUFHLEVBQUUsR0FBRzs7Ozs7O2dCQUV0QyxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO2dCQUVOLHFCQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFBOztnQkFBdkMsUUFBUSxHQUFHLFNBQTRCO2dCQUMzQixxQkFBTSxjQUFJLENBQUMsR0FBRyxDQUFRLGVBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBQTs7Z0JBQXRELFNBQVMsR0FBRyxTQUEwQztnQkFDNUQsSUFBSSxDQUFDLFNBQVM7b0JBQ1Ysc0JBQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBQztnQkFFNUMsSUFBSSxHQUFHLENBQUMsQ0FBQztnQkFDVCxTQUFTLEdBQUcsSUFBSSxtQ0FBZSxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBRTNELE1BQU0sR0FBRyxJQUFJLG9CQUFXLEVBQUUsQ0FBQztnQkFDakMsTUFBTSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUM7Z0JBRWpCLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7Z0JBQ1AscUJBQU0sU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLHdCQUNyQyxTQUFTLENBQUMsTUFBTSxHQUFLLEdBQUcsQ0FBQyxLQUFLLEVBQUcsRUFBQTs7Z0JBRG5DLEtBQUssR0FBRyxTQUMyQjtnQkFFekMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFDLGNBQWMsRUFBRSxXQUFXLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7OztnQkFDckMsc0JBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLE9BQUssQ0FBQyxDQUFDOzs7OztLQUNoRCxDQUFDLENBQUM7QUFFSCxjQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxVQUFPLEdBQUcsRUFBRSxHQUFHOzs7Ozs7Z0JBRWpCLHFCQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFBOztnQkFBbkMsSUFBSSxHQUFHLFNBQTRCO2dCQUN2QixxQkFBTSxjQUFJLENBQUMsR0FBRyxDQUFRLGVBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBQTs7Z0JBQWxELFNBQVMsR0FBRyxTQUFzQztnQkFFeEQsU0FBUyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO2dCQUM1QixxQkFBTSxTQUFTLENBQUMsSUFBSSxFQUFFLEVBQUE7O2dCQUF0QixTQUFzQixDQUFDO2dCQUV2QixHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDOzs7O2dCQUNOLHNCQUFTLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxPQUFLLENBQUMsQ0FBQzs7Ozs7S0FDaEQsQ0FBQyxDQUFDO0FBRUgsU0FBc0IsT0FBTyxDQUFDLEdBQVE7Ozs7d0JBQzNCLHFCQUFNLG1CQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFBO3dCQUFwQyxzQkFBTyxTQUE2QixFQUFDOzs7O0NBQ3hDO0FBRkQsMEJBRUMifQ==