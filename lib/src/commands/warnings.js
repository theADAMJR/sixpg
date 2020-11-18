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
var members_1 = __importDefault(require("../data/members"));
var deps_1 = __importDefault(require("../utils/deps"));
var command_utils_1 = __importDefault(require("../utils/command-utils"));
var WarningsCommand = /** @class */ (function () {
    function WarningsCommand(members) {
        var _this = this;
        if (members === void 0) { members = deps_1.default.get(members_1.default); }
        this.members = members;
        this.name = 'warnings';
        this.summary = 'Display the warnings of a member.';
        this.precondition = 'VIEW_AUDIT_LOG';
        this.cooldown = 3;
        this.module = 'Auto-mod';
        this.execute = function (ctx, userMention, position) { return __awaiter(_this, void 0, void 0, function () {
            var target, savedMember;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        target = (userMention) ?
                            command_utils_1.default.getMemberFromMention(userMention, ctx.guild) : ctx.member;
                        return [4 /*yield*/, this.members.get(target)];
                    case 1:
                        savedMember = _a.sent();
                        if (position)
                            return [2 /*return*/, this.displayWarning(+position, savedMember, ctx.channel)];
                        return [4 /*yield*/, ctx.channel.send("User has `" + savedMember.warnings.length + "` warnings.")];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
    }
    WarningsCommand.prototype.displayWarning = function (position, savedMember, channel) {
        return __awaiter(this, void 0, void 0, function () {
            var warning, instigator;
            return __generator(this, function (_a) {
                if (position <= 0 || position > savedMember.warnings.length)
                    throw new TypeError('Warning at position not found on user.');
                warning = savedMember.warnings[position - 1];
                instigator = channel.client.users.cache.get(warning.instigatorId);
                channel.send("**Warning #" + position + "**\n**By**: <@!" + (instigator !== null && instigator !== void 0 ? instigator : 'N/A') + ">\n**For**: `" + warning.reason + "`");
                return [2 /*return*/];
            });
        });
    };
    return WarningsCommand;
}());
exports.default = WarningsCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FybmluZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvd2FybmluZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw0REFBc0M7QUFHdEMsdURBQWlDO0FBQ2pDLHlFQUFrRDtBQUVsRDtJQU9JLHlCQUNZLE9BQW9DO1FBRGhELGlCQUNvRDtRQUF4Qyx3QkFBQSxFQUFBLFVBQVUsY0FBSSxDQUFDLEdBQUcsQ0FBVSxpQkFBTyxDQUFDO1FBQXBDLFlBQU8sR0FBUCxPQUFPLENBQTZCO1FBUGhELFNBQUksR0FBRyxVQUFVLENBQUM7UUFDbEIsWUFBTyxHQUFHLG1DQUFtQyxDQUFDO1FBQzlDLGlCQUFZLEdBQWUsZ0JBQWdCLENBQUM7UUFDNUMsYUFBUSxHQUFHLENBQUMsQ0FBQztRQUNiLFdBQU0sR0FBRyxVQUFVLENBQUM7UUFLcEIsWUFBTyxHQUFHLFVBQU0sR0FBbUIsRUFBRSxXQUFvQixFQUFFLFFBQWlCOzs7Ozt3QkFDbEUsTUFBTSxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQzs0QkFDMUIsdUJBQVksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO3dCQUV2RCxxQkFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBQTs7d0JBQTVDLFdBQVcsR0FBRyxTQUE4Qjt3QkFFbEQsSUFBSSxRQUFROzRCQUNSLHNCQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBQzt3QkFFcEUscUJBQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBYyxXQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sZ0JBQWMsQ0FBQyxFQUFBOzt3QkFBL0UsU0FBK0UsQ0FBQTs7OzthQUNsRixDQUFBO0lBWmtELENBQUM7SUFjdEMsd0NBQWMsR0FBNUIsVUFBNkIsUUFBZ0IsRUFBRSxXQUEyQixFQUFFLE9BQW9COzs7O2dCQUM1RixJQUFJLFFBQVEsSUFBSSxDQUFDLElBQUksUUFBUSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTTtvQkFDdkQsTUFBTSxJQUFJLFNBQVMsQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO2dCQUU1RCxPQUFPLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzdDLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDeEUsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBYyxRQUFRLHdCQUFrQixVQUFVLGFBQVYsVUFBVSxjQUFWLFVBQVUsR0FBSSxLQUFLLHNCQUFpQixPQUFPLENBQUMsTUFBTSxNQUFJLENBQUMsQ0FBQzs7OztLQUNoSDtJQUNMLHNCQUFDO0FBQUQsQ0FBQyxBQTlCRCxJQThCQyJ9