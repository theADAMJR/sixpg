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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var announce_handler_1 = __importDefault(require("./announce-handler"));
var bot_1 = require("../../data/models/bot");
var event_variables_1 = __importDefault(require("../../modules/announce/event-variables"));
var MemberJoinHandler = /** @class */ (function (_super) {
    __extends(MemberJoinHandler, _super);
    function MemberJoinHandler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.on = 'guildMemberAdd';
        _this.event = bot_1.EventType.MemberJoin;
        return _this;
    }
    MemberJoinHandler.prototype.invoke = function (member) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.announce.call(this, member.guild, [member])];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.addAutoRoles(member)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MemberJoinHandler.prototype.addAutoRoles = function (member) {
        return __awaiter(this, void 0, void 0, function () {
            var savedConfig, roles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bots.get(member.guild.client.user)];
                    case 1:
                        savedConfig = _a.sent();
                        roles = savedConfig.general.autoRoleNames
                            .map(function (name) { return member.guild.roles.cache
                            .find(function (r) { return r.name === name; }); });
                        return [4 /*yield*/, member.roles.add(roles, 'Auto role')];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MemberJoinHandler.prototype.applyEventVariables = function (content, member) {
        return new event_variables_1.default(content)
            .user(member.user)
            .guild(member.guild)
            .memberCount(member.guild)
            .toString();
    };
    return MemberJoinHandler;
}(announce_handler_1.default));
exports.default = MemberJoinHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtYmVyLWpvaW4uaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9oYW5kbGVycy9tZW1iZXItam9pbi5oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdFQUFpRDtBQUVqRCw2Q0FBa0Q7QUFDbEQsMkZBQW9FO0FBRXBFO0lBQStDLHFDQUFlO0lBQTlEO1FBQUEscUVBeUJDO1FBeEJHLFFBQUUsR0FBRyxnQkFBZ0IsQ0FBQztRQUN0QixXQUFLLEdBQUcsZUFBUyxDQUFDLFVBQVUsQ0FBQzs7SUF1QmpDLENBQUM7SUFyQlMsa0NBQU0sR0FBWixVQUFhLE1BQW1COzs7OzRCQUM1QixxQkFBTSxpQkFBTSxRQUFRLFlBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFFLE1BQU0sQ0FBRSxDQUFDLEVBQUE7O3dCQUE5QyxTQUE4QyxDQUFDO3dCQUMvQyxxQkFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFBOzt3QkFBL0IsU0FBK0IsQ0FBQzs7Ozs7S0FDbkM7SUFFYSx3Q0FBWSxHQUExQixVQUEyQixNQUFtQjs7Ozs7NEJBQ3RCLHFCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFBOzt3QkFBM0QsV0FBVyxHQUFHLFNBQTZDO3dCQUUzRCxLQUFLLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxhQUFhOzZCQUMxQyxHQUFHLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLOzZCQUNoQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksRUFBZixDQUFlLENBQUMsRUFEbEIsQ0FDa0IsQ0FBQyxDQUFDO3dCQUNyQyxxQkFBTSxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLEVBQUE7O3dCQUExQyxTQUEwQyxDQUFDOzs7OztLQUM5QztJQUVTLCtDQUFtQixHQUE3QixVQUE4QixPQUFlLEVBQUUsTUFBbUI7UUFDOUQsT0FBTyxJQUFJLHlCQUFjLENBQUMsT0FBTyxDQUFDO2FBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO2FBQ2pCLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO2FBQ25CLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO2FBQ3pCLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFDTCx3QkFBQztBQUFELENBQUMsQUF6QkQsQ0FBK0MsMEJBQWUsR0F5QjdEIn0=