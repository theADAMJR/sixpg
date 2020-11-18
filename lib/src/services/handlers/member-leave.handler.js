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
var bot_1 = require("../../data/models/bot");
var announce_handler_1 = __importDefault(require("./announce-handler"));
var event_variables_1 = __importDefault(require("../../modules/announce/event-variables"));
var MemberLeaveHandler = /** @class */ (function (_super) {
    __extends(MemberLeaveHandler, _super);
    function MemberLeaveHandler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.on = 'guildMemberRemove';
        _this.event = bot_1.EventType.MemberLeave;
        return _this;
    }
    MemberLeaveHandler.prototype.invoke = function (member) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.announce.call(this, member.guild, [member])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MemberLeaveHandler.prototype.applyEventVariables = function (content, member) {
        return new event_variables_1.default(content)
            .user(member.user)
            .guild(member.guild)
            .memberCount(member.guild)
            .toString();
    };
    return MemberLeaveHandler;
}(announce_handler_1.default));
exports.default = MemberLeaveHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtYmVyLWxlYXZlLmhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmljZXMvaGFuZGxlcnMvbWVtYmVyLWxlYXZlLmhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsNkNBQWtEO0FBQ2xELHdFQUFpRDtBQUNqRCwyRkFBb0U7QUFFcEU7SUFBZ0Qsc0NBQWU7SUFBL0Q7UUFBQSxxRUFlQztRQWRHLFFBQUUsR0FBRyxtQkFBbUIsQ0FBQztRQUN6QixXQUFLLEdBQUcsZUFBUyxDQUFDLFdBQVcsQ0FBQzs7SUFhbEMsQ0FBQztJQVhTLG1DQUFNLEdBQVosVUFBYSxNQUFtQjs7Ozs0QkFDNUIscUJBQU0saUJBQU0sUUFBUSxZQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBRSxNQUFNLENBQUUsQ0FBQyxFQUFBOzt3QkFBOUMsU0FBOEMsQ0FBQzs7Ozs7S0FDbEQ7SUFFUyxnREFBbUIsR0FBN0IsVUFBOEIsT0FBZSxFQUFFLE1BQW1CO1FBQzlELE9BQU8sSUFBSSx5QkFBYyxDQUFDLE9BQU8sQ0FBQzthQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQzthQUNqQixLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQzthQUNuQixXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQzthQUN6QixRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBQ0wseUJBQUM7QUFBRCxDQUFDLEFBZkQsQ0FBZ0QsMEJBQWUsR0FlOUQifQ==