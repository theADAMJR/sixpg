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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = exports.router = void 0;
var express_1 = require("express");
var command_1 = require("../../data/models/command");
var server_1 = require("../server");
var config = __importStar(require("../../../config.json"));
var fs_1 = __importDefault(require("fs"));
var bots_routes_1 = require("./bots-routes");
var music_routes_1 = require("./music-routes");
var user_routes_1 = require("./user-routes");
var util_1 = require("util");
var path_1 = require("path");
var appendFile = util_1.promisify(fs_1.default.appendFile);
var dashboardLogsPath = path_1.resolve('./logs/dashboard');
exports.router = express_1.Router();
var commands = [];
command_1.SavedCommand.find().then(function (cmds) { return commands = cmds; });
exports.router.get('/', function (req, res) { return res.json({ hello: '' }); });
exports.router.get('/commands', function (req, res) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, res.json(commands)];
}); }); });
exports.router.get('/auth', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var key, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, server_1.AuthClient.getAccess(req.query.code.toString())];
            case 1:
                key = _a.sent();
                res.json(key);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                sendError(res, 400, error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.router.post('/error', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var message, date, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                message = req.body.message;
                date = new Date().toDateString().replace(/ /g, '-');
                return [4 /*yield*/, appendFile(dashboardLogsPath + "/" + date + ".txt", message)];
            case 1:
                _a.sent();
                res.json({ code: 200, message: 'Success!' });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                sendError(res, 400, error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.router.get('/invite', function (req, res) {
    return res.redirect("https://discordapp.com/api/oauth2/authorize?client_id=" + config.bot.id + "&redirect_uri=" + config.dashboardURL + "/dashboard&permissions=8&scope=bot");
});
exports.router.get('/login', function (req, res) { return res.redirect(server_1.AuthClient.authCodeLink.url); });
exports.router.use('/bots', bots_routes_1.router);
exports.router.use('/bots/:botId/guilds/:guildId/music', music_routes_1.router);
exports.router.use('/user', user_routes_1.router);
exports.router.get('*', function (req, res) { return res.status(404).json({ code: 404 }); });
function sendError(res, code, error) {
    return res.status(code).json({ code: code, message: error === null || error === void 0 ? void 0 : error.message });
}
exports.sendError = sendError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLXJvdXRlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcm91dGVzL2FwaS1yb3V0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1DQUFpQztBQUNqQyxxREFBMEU7QUFDMUUsb0NBQXVDO0FBQ3ZDLDJEQUErQztBQUMvQywwQ0FBb0I7QUFDcEIsNkNBQXFEO0FBQ3JELCtDQUF1RDtBQUN2RCw2Q0FBcUQ7QUFDckQsNkJBQWlDO0FBQ2pDLDZCQUErQjtBQUUvQixJQUFNLFVBQVUsR0FBRyxnQkFBUyxDQUFDLFlBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM1QyxJQUFNLGlCQUFpQixHQUFHLGNBQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBRXpDLFFBQUEsTUFBTSxHQUFHLGdCQUFNLEVBQUUsQ0FBQztBQUUvQixJQUFJLFFBQVEsR0FBc0IsRUFBRSxDQUFDO0FBQ3JDLHNCQUFZLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsUUFBUSxHQUFHLElBQUksRUFBZixDQUFlLENBQUMsQ0FBQztBQUVsRCxjQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxVQUFDLEdBQUcsRUFBRSxHQUFHLElBQUssT0FBQSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQXZCLENBQXVCLENBQUMsQ0FBQztBQUV2RCxjQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxVQUFPLEdBQUcsRUFBRSxHQUFHO0lBQUssc0JBQUEsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBQTtTQUFBLENBQUMsQ0FBQztBQUVoRSxjQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxVQUFPLEdBQUcsRUFBRSxH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