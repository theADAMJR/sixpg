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
var members_1 = __importDefault(require("../../data/members"));
var deps_1 = __importDefault(require("../../utils/deps"));
var Leveling = /** @class */ (function () {
    function Leveling(members) {
        if (members === void 0) { members = deps_1.default.get(members_1.default); }
        this.members = members;
    }
    Leveling.prototype.validateXPMsg = function (msg, savedGuild) {
        return __awaiter(this, void 0, void 0, function () {
            var savedMember, oldLevel, newLevel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(msg === null || msg === void 0 ? void 0 : msg.member) || !savedGuild || this.hasIgnoredXPRole(msg.member, savedGuild))
                            throw new TypeError('Member cannot earn XP');
                        return [4 /*yield*/, this.members.get(msg.member)];
                    case 1:
                        savedMember = _a.sent();
                        this.handleCooldown(savedMember, savedGuild);
                        oldLevel = this.getLevel(savedMember.xp);
                        savedMember.xp += savedGuild.leveling.xpPerMessage;
                        newLevel = this.getLevel(savedMember.xp);
                        if (newLevel > oldLevel)
                            this.handleLevelUp(msg, newLevel, savedGuild);
                        savedMember.save();
                        return [2 /*return*/];
                }
            });
        });
    };
    Leveling.prototype.handleCooldown = function (savedMember, savedGuild) {
        var inCooldown = savedMember.recentMessages
            .filter(function (m) { return m.getMinutes() === new Date().getMinutes(); })
            .length > savedGuild.leveling.maxMessagesPerMinute;
        if (inCooldown)
            throw new TypeError('User is in cooldown');
        var lastMessage = savedMember.recentMessages[savedMember.recentMessages.length - 1];
        if (lastMessage && lastMessage.getMinutes() !== new Date().getMinutes())
            savedMember.recentMessages = [];
        savedMember.recentMessages.push(new Date());
    };
    Leveling.prototype.hasIgnoredXPRole = function (member, savedGuild) {
        var e_1, _a;
        var _loop_1 = function (entry) {
            var role = entry[1];
            if (savedGuild.leveling.ignoredRoleNames.some(function (name) { return name === role.name; }))
                return { value: true };
        };
        try {
            for (var _b = __values(member.roles.cache), _c = _b.next(); !_c.done; _c = _b.next()) {
                var entry = _c.value;
                var state_1 = _loop_1(entry);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return false;
    };
    Leveling.prototype.handleLevelUp = function (msg, newLevel, savedGuild) {
        // TODO: add disable xp message option
        msg.channel.send("Level Up! \u2B50\n**New Level**: `" + newLevel + "`");
        var levelRoleName = this.getLevelRoleName(newLevel, savedGuild);
        if (levelRoleName) {
            var role = msg.guild.roles.cache.find(function (r) { return r.name === levelRoleName; });
            msg.member.roles.add(role);
        }
    };
    Leveling.prototype.getLevelRoleName = function (level, savedGuild) {
        var _a;
        return (_a = savedGuild.leveling.levelRoleNames
            .find(function (r) { return r.level === level; })) === null || _a === void 0 ? void 0 : _a.roleName;
    };
    Leveling.prototype.getLevel = function (xp) {
        var preciseLevel = (-75 + Math.sqrt(Math.pow(75, 2) - 300 * (-150 - xp))) / 150;
        return Math.floor(preciseLevel);
    };
    Leveling.xpInfo = function (xp) {
        var preciseLevel = (-75 + Math.sqrt(Math.pow(75, 2) - 300 * (-150 - xp))) / 150;
        var level = Math.floor(preciseLevel);
        var xpForNextLevel = this.xpForNextLevel(level, xp);
        var nextLevelXP = xp + xpForNextLevel;
        var levelCompletion = preciseLevel - level;
        return { level: level, xp: xp, xpForNextLevel: xpForNextLevel, levelCompletion: levelCompletion, nextLevelXP: nextLevelXP };
    };
    Leveling.xpForNextLevel = function (currentLevel, xp) {
        return ((75 * Math.pow(currentLevel + 1, 2)) + (75 * (currentLevel + 1)) - 150) - xp;
    };
    Leveling.getRank = function (member, members) {
        return members
            .sort(function (a, b) { return b.xp - a.xp; })
            .findIndex(function (m) { return m.id === member.id; }) + 1;
    };
    return Leveling;
}());
exports.default = Leveling;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGV2ZWxpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy94cC9sZXZlbGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsK0RBQXlDO0FBQ3pDLDBEQUFvQztBQUdwQztJQUNJLGtCQUFvQixPQUFvQztRQUFwQyx3QkFBQSxFQUFBLFVBQVUsY0FBSSxDQUFDLEdBQUcsQ0FBVSxpQkFBTyxDQUFDO1FBQXBDLFlBQU8sR0FBUCxPQUFPLENBQTZCO0lBQUcsQ0FBQztJQUV0RCxnQ0FBYSxHQUFuQixVQUFvQixHQUFZLEVBQUUsVUFBdUI7Ozs7Ozt3QkFDckQsSUFBSSxFQUFDLEdBQUcsYUFBSCxHQUFHLHVCQUFILEdBQUcsQ0FBRSxNQUFNLENBQUEsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUM7NEJBQzVFLE1BQU0sSUFBSSxTQUFTLENBQUMsdUJBQXVCLENBQUMsQ0FBQzt3QkFFN0IscUJBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFBOzt3QkFBaEQsV0FBVyxHQUFHLFNBQWtDO3dCQUV0RCxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQzt3QkFFdkMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUMvQyxXQUFXLENBQUMsRUFBRSxJQUFJLFVBQVUsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDO3dCQUM3QyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBRS9DLElBQUksUUFBUSxHQUFHLFFBQVE7NEJBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQzt3QkFFbEQsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDOzs7OztLQUN0QjtJQUNELGlDQUFjLEdBQWQsVUFBZSxXQUEyQixFQUFFLFVBQXVCO1FBQy9ELElBQU0sVUFBVSxHQUFHLFdBQVcsQ0FBQyxjQUFjO2FBQ3hDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxVQUFVLEVBQUUsS0FBSyxJQUFJLElBQUksRUFBRSxDQUFDLFVBQVUsRUFBRSxFQUExQyxDQUEwQyxDQUFDO2FBQ3ZELE1BQU0sR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDO1FBQ3ZELElBQUksVUFBVTtZQUNWLE1BQU0sSUFBSSxTQUFTLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUUvQyxJQUFNLFdBQVcsR0FBRyxXQUFXLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3RGLElBQUksV0FBVyxJQUFJLFdBQVcsQ0FBQyxVQUFVLEVBQUUsS0FBSyxJQUFJLElBQUksRUFBRSxDQUFDLFVBQVUsRUFBRTtZQUNuRSxXQUFXLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUVwQyxXQUFXLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVPLG1DQUFnQixHQUF4QixVQUF5QixNQUFtQixFQUFFLFVBQXVCOztnQ0FDdEQsS0FBSztZQUNaLElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLFVBQVUsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQWxCLENBQWtCLENBQUM7Z0NBQzlELElBQUksR0FBQzs7O1lBSHBCLEtBQW9CLElBQUEsS0FBQSxTQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFBLGdCQUFBO2dCQUFqQyxJQUFNLEtBQUssV0FBQTtzQ0FBTCxLQUFLOzs7YUFJZjs7Ozs7Ozs7O1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVPLGdDQUFhLEdBQXJCLFVBQXNCLEdBQVksRUFBRSxRQUFnQixFQUFFLFVBQXVCO1FBQ3pFLHNDQUFzQztRQUN0QyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyx1Q0FBaUMsUUFBUSxNQUFJLENBQUMsQ0FBQztRQUVoRSxJQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2xFLElBQUksYUFBYSxFQUFFO1lBQ2YsSUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLEtBQUssYUFBYSxFQUF4QixDQUF3QixDQUFDLENBQUM7WUFDdkUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzlCO0lBQ0wsQ0FBQztJQUNPLG1DQUFnQixHQUF4QixVQUF5QixLQUFhLEVBQUUsVUFBdUI7O1FBQzNELGFBQU8sVUFBVSxDQUFDLFFBQVEsQ0FBQyxjQUFjO2FBQ3BDLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxLQUFLLEtBQUssS0FBSyxFQUFqQixDQUFpQixDQUFDLDBDQUFFLFFBQVEsQ0FBQztJQUNoRCxDQUFDO0lBRUQsMkJBQVEsR0FBUixVQUFTLEVBQVU7UUFDZixJQUFNLFlBQVksR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNsRixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUNNLGVBQU0sR0FBYixVQUFjLEVBQVU7UUFDcEIsSUFBTSxZQUFZLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDbEYsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUV2QyxJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN0RCxJQUFNLFdBQVcsR0FBRyxFQUFFLEdBQUcsY0FBYyxDQUFDO1FBRXhDLElBQU0sZUFBZSxHQUFHLFlBQVksR0FBRyxLQUFLLENBQUM7UUFFN0MsT0FBTyxFQUFFLEtBQUssT0FBQSxFQUFFLEVBQUUsSUFBQSxFQUFFLGNBQWMsZ0JBQUEsRUFBRSxlQUFlLGlCQUFBLEVBQUUsV0FBVyxhQUFBLEVBQUUsQ0FBQztJQUN2RSxDQUFDO0lBQ2MsdUJBQWMsR0FBN0IsVUFBOEIsWUFBb0IsRUFBRSxFQUFVO1FBQzFELE9BQU8sQ0FBQyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUN6RixDQUFDO0lBRU0sZ0JBQU8sR0FBZCxVQUFlLE1BQXNCLEVBQUUsT0FBeUI7UUFDNUQsT0FBTyxPQUFPO2FBQ1QsSUFBSSxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSyxPQUFBLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBWCxDQUFXLENBQUM7YUFDM0IsU0FBUyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEVBQUUsS0FBSyxNQUFNLENBQUMsRUFBRSxFQUFsQixDQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFDTCxlQUFDO0FBQUQsQ0FBQyxBQWxGRCxJQWtGQyJ9