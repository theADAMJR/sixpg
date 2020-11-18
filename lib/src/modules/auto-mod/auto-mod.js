"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.ValidationError = void 0;
var deps_1 = __importDefault(require("../../utils/deps"));
var members_1 = __importDefault(require("../../data/members"));
var log_1 = __importDefault(require("../../utils/log"));
var util_1 = require("util");
var fs_1 = __importDefault(require("fs"));
var readdir = util_1.promisify(fs_1.default.readdir);
var AutoMod = /** @class */ (function () {
    function AutoMod(members) {
        if (members === void 0) { members = deps_1.default.get(members_1.default); }
        this.members = members;
        this.validators = [];
    }
    AutoMod.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var directory, files, files_1, files_1_1, file, Validator;
            var e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        directory = './modules/auto-mod/validators';
                        return [4 /*yield*/, readdir(directory)];
                    case 1:
                        files = _b.sent();
                        try {
                            for (files_1 = __values(files), files_1_1 = files_1.next(); !files_1_1.done; files_1_1 = files_1.next()) {
                                file = files_1_1.value;
                                Validator = require("./validators/" + file).default;
                                if (!Validator)
                                    continue;
                                this.validators.push(new Validator());
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (files_1_1 && !files_1_1.done && (_a = files_1.return)) _a.call(files_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        log_1.default.info("Loaded: " + this.validators.length + " validators", "automod");
                        return [2 /*return*/];
                }
            });
        });
    };
    AutoMod.prototype.validateMsg = function (msg, savedBot) {
        return __awaiter(this, void 0, void 0, function () {
            var activeFilters, _loop_1, this_1, activeFilters_1, activeFilters_1_1, filter, state_1, e_2_1;
            var e_2, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        activeFilters = savedBot.autoMod.filters;
                        _loop_1 = function (filter) {
                            var validator, hasIgnoredRoleWithName, validation_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 1, , 6]);
                                        validator = this_1.validators.find(function (v) { return v.filter === filter; });
                                        hasIgnoredRoleWithName = savedBot.autoMod.ignoredRoleNames
                                            .some(function (n) { return msg.member.roles.cache.find(function (r) { return r.name === n; }); });
                                        if (hasIgnoredRoleWithName)
                                            return [2 /*return*/, { value: void 0 }];
                                        validator === null || validator === void 0 ? void 0 : validator.validate(msg.content, savedBot);
                                        return [3 /*break*/, 6];
                                    case 1:
                                        validation_1 = _a.sent();
                                        if (!savedBot.autoMod.autoDeleteMessages) return [3 /*break*/, 3];
                                        return [4 /*yield*/, msg.delete({ reason: validation_1.message })];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3:
                                        if (!(savedBot.autoMod.autoWarnUsers && msg.member && msg.client.user)) return [3 /*break*/, 5];
                                        return [4 /*yield*/, this_1.warn(msg.member, msg.client.user, validation_1.message)];
                                    case 4:
                                        _a.sent();
                                        _a.label = 5;
                                    case 5: throw validation_1;
                                    case 6: return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, 7, 8]);
                        activeFilters_1 = __values(activeFilters), activeFilters_1_1 = activeFilters_1.next();
                        _b.label = 2;
                    case 2:
                        if (!!activeFilters_1_1.done) return [3 /*break*/, 5];
                        filter = activeFilters_1_1.value;
                        return [5 /*yield**/, _loop_1(filter)];
                    case 3:
                        state_1 = _b.sent();
                        if (typeof state_1 === "object")
                            return [2 /*return*/, state_1.value];
                        _b.label = 4;
                    case 4:
                        activeFilters_1_1 = activeFilters_1.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_2_1 = _b.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (activeFilters_1_1 && !activeFilters_1_1.done && (_a = activeFilters_1.return)) _a.call(activeFilters_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    AutoMod.prototype.warn = function (member, instigator, reason) {
        if (reason === void 0) { reason = 'No reason specified.'; }
        return __awaiter(this, void 0, void 0, function () {
            var savedMember, warning, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (member.id === instigator.id)
                            throw new TypeError('You cannot warn yourself.');
                        if (member.user.bot)
                            throw new TypeError('Bots cannot be warned.');
                        return [4 /*yield*/, this.members.get(member)];
                    case 1:
                        savedMember = _b.sent();
                        warning = { reason: reason, instigatorId: instigator.id, at: new Date() };
                        savedMember.warnings.push(warning);
                        return [4 /*yield*/, this.members.save(savedMember)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, member.send("<@!" + instigator + "> warned you for `" + reason + "`")];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        _a = _b.sent();
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return AutoMod;
}());
exports.default = AutoMod;
var ValidationError = /** @class */ (function (_super) {
    __extends(ValidationError, _super);
    function ValidationError(message, filter) {
        var _this = _super.call(this, message) || this;
        _this.filter = filter;
        return _this;
    }
    return ValidationError;
}(Error));
exports.ValidationError = ValidationError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by1tb2QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9hdXRvLW1vZC9hdXRvLW1vZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSwwREFBb0M7QUFDcEMsK0RBQXlDO0FBQ3pDLHdEQUFrQztBQUVsQyw2QkFBaUM7QUFDakMsMENBQW9CO0FBRXBCLElBQU0sT0FBTyxHQUFHLGdCQUFTLENBQUMsWUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBRXRDO0lBR0ksaUJBQW9CLE9BQW9DO1FBQXBDLHdCQUFBLEVBQUEsVUFBVSxjQUFJLENBQUMsR0FBRyxDQUFVLGlCQUFPLENBQUM7UUFBcEMsWUFBTyxHQUFQLE9BQU8sQ0FBNkI7UUFGaEQsZUFBVSxHQUF1QixFQUFFLENBQUM7SUFFZSxDQUFDO0lBRXRELHNCQUFJLEdBQVY7Ozs7Ozs7d0JBQ1UsU0FBUyxHQUFHLCtCQUErQixDQUFDO3dCQUNwQyxxQkFBTSxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUE7O3dCQUFoQyxLQUFLLEdBQUcsU0FBd0I7OzRCQUV0QyxLQUFtQixVQUFBLFNBQUEsS0FBSyxDQUFBLDJFQUFFO2dDQUFmLElBQUk7Z0NBQ0wsU0FBUyxHQUFHLE9BQU8sQ0FBQyxrQkFBZ0IsSUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDO2dDQUMxRCxJQUFJLENBQUMsU0FBUztvQ0FBRSxTQUFTO2dDQUV6QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMsRUFBRSxDQUFDLENBQUM7NkJBQ3pDOzs7Ozs7Ozs7d0JBQ0QsYUFBRyxDQUFDLElBQUksQ0FBQyxhQUFXLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxnQkFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDOzs7OztLQUN2RTtJQUVLLDZCQUFXLEdBQWpC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