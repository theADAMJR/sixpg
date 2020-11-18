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
var fs_1 = __importDefault(require("fs"));
var command_1 = require("../commands/command");
var log_1 = __importDefault(require("../utils/log"));
var deps_1 = __importDefault(require("../utils/deps"));
var commands_1 = __importDefault(require("../data/commands"));
var logs_1 = __importDefault(require("../data/logs"));
var cooldowns_1 = __importDefault(require("./cooldowns"));
var validators_1 = __importDefault(require("./validators"));
var util_1 = require("util");
var readdir = util_1.promisify(fs_1.default.readdir);
var CommandService = /** @class */ (function () {
    function CommandService(logs, cooldowns, validators, savedCommands) {
        if (logs === void 0) { logs = deps_1.default.get(logs_1.default); }
        if (cooldowns === void 0) { cooldowns = deps_1.default.get(cooldowns_1.default); }
        if (validators === void 0) { validators = deps_1.default.get(validators_1.default); }
        if (savedCommands === void 0) { savedCommands = deps_1.default.get(commands_1.default); }
        this.logs = logs;
        this.cooldowns = cooldowns;
        this.validators = validators;
        this.savedCommands = savedCommands;
        this.commands = new Map();
    }
    CommandService.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var directory, files, files_1, files_1_1, file, Command, command, e_1_1;
            var e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        directory = './commands';
                        return [4 /*yield*/, readdir(directory)];
                    case 1:
                        files = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 7, 8, 9]);
                        files_1 = __values(files), files_1_1 = files_1.next();
                        _b.label = 3;
                    case 3:
                        if (!!files_1_1.done) return [3 /*break*/, 6];
                        file = files_1_1.value;
                        Command = require("../commands/" + file).default;
                        if (!Command)
                            return [3 /*break*/, 5];
                        command = new Command();
                        this.commands.set(command.name, command);
                        return [4 /*yield*/, this.savedCommands.get(command)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        files_1_1 = files_1.next();
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (files_1_1 && !files_1_1.done && (_a = files_1.return)) _a.call(files_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 9:
                        log_1.default.info("Loaded: " + this.commands.size + " commands", "cmds");
                        return [2 /*return*/];
                }
            });
        });
    };
    CommandService.prototype.handle = function (msg, savedGuild) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!(msg.member && msg.content && msg.guild && !msg.author.bot))
                    return [2 /*return*/];
                return [2 /*return*/, this.handleCommand(msg, savedGuild)];
            });
        });
    };
    CommandService.prototype.handleCommand = function (msg, savedGuild) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var content, command, error_1, content_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        content = msg.content.toLowerCase();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        this.validators.checkChannel(msg.channel, savedGuild);
                        command = this.findCommand(savedGuild.general.prefix, content);
                        if (!command || this.cooldowns.active(msg.author, command))
                            return [2 /*return*/];
                        this.validators.checkCommand(command, savedGuild, msg);
                        this.validators.checkPreconditions(command, msg.member);
                        return [4 /*yield*/, this.findAndExecute(msg, savedGuild)];
                    case 2:
                        _b.sent();
                        this.cooldowns.add(msg.author, command);
                        return [4 /*yield*/, this.logs.logCommand(msg, command)];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _b.sent();
                        content_1 = (_a = error_1 === null || error_1 === void 0 ? void 0 : error_1.message) !== null && _a !== void 0 ? _a : 'Un unknown error occurred';
                        msg.channel.send(':warning: ' + content_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CommandService.prototype.findAndExecute = function (msg, savedGuild) {
        return __awaiter(this, void 0, void 0, function () {
            var prefix, command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prefix = savedGuild.general.prefix;
                        command = this.findCommand(prefix, msg.content);
                        return [4 /*yield*/, command.execute.apply(command, __spread([new command_1.CommandContext(msg)], this.getCommandArgs(prefix, msg.content)))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CommandService.prototype.findCommand = function (prefix, content) {
        var name = content
            .split(' ')[0]
            .substring(prefix.length, content.length);
        return this.commands.get(name);
    };
    CommandService.prototype.getCommandArgs = function (prefix, content) {
        var args = content.split(' ');
        return args.splice(prefix.length, args.length);
    };
    return CommandService;
}());
exports.default = CommandService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL2NvbW1hbmQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwQ0FBb0I7QUFFcEIsK0NBQThEO0FBQzlELHFEQUErQjtBQUMvQix1REFBaUM7QUFDakMsOERBQXdDO0FBQ3hDLHNEQUFnQztBQUVoQywwREFBb0M7QUFDcEMsNERBQXNDO0FBQ3RDLDZCQUFpQztBQUVqQyxJQUFNLE9BQU8sR0FBRyxnQkFBUyxDQUFDLFlBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUV0QztJQUdJLHdCQUNZLElBQTJCLEVBQzNCLFNBQTBDLEVBQzFDLFVBQTZDLEVBQzdDLGFBQTRDO1FBSDVDLHFCQUFBLEVBQUEsT0FBTyxjQUFJLENBQUMsR0FBRyxDQUFPLGNBQUksQ0FBQztRQUMzQiwwQkFBQSxFQUFBLFlBQVksY0FBSSxDQUFDLEdBQUcsQ0FBWSxtQkFBUyxDQUFDO1FBQzFDLDJCQUFBLEVBQUEsYUFBYSxjQUFJLENBQUMsR0FBRyxDQUFhLG9CQUFVLENBQUM7UUFDN0MsOEJBQUEsRUFBQSxnQkFBZ0IsY0FBSSxDQUFDLEdBQUcsQ0FBVyxrQkFBUSxDQUFDO1FBSDVDLFNBQUksR0FBSixJQUFJLENBQXVCO1FBQzNCLGNBQVMsR0FBVCxTQUFTLENBQWlDO1FBQzFDLGVBQVUsR0FBVixVQUFVLENBQW1DO1FBQzdDLGtCQUFhLEdBQWIsYUFBYSxDQUErQjtRQU5oRCxhQUFRLEdBQUcsSUFBSSxHQUFHLEVBQW1CLENBQUM7SUFNYSxDQUFDO0lBRXRELDZCQUFJLEdBQVY7Ozs7Ozs7d0JBQ1UsU0FBUyxHQUFHLFlBQVksQ0FBQzt3QkFDakIscUJBQU0sT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFBOzt3QkFB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