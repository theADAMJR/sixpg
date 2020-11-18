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
var db_wrapper_1 = __importDefault(require("./db-wrapper"));
var log_1 = require("./models/log");
var Logs = /** @class */ (function (_super) {
    __extends(Logs, _super);
    function Logs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Logs.prototype.getOrCreate = function (_a) {
        var id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            var savedLog;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, log_1.SavedLog.findById(id)];
                    case 1:
                        savedLog = _b.sent();
                        return [2 /*return*/, savedLog !== null && savedLog !== void 0 ? savedLog : this.create({ id: id })];
                }
            });
        });
    };
    Logs.prototype.create = function (_a) {
        var id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, new log_1.SavedLog({ _id: id }).save()];
            });
        });
    };
    Logs.prototype.logCommand = function (msg, command) {
        return __awaiter(this, void 0, void 0, function () {
            var log;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get(msg.client.user)];
                    case 1:
                        log = _a.sent();
                        log.commands.push({
                            name: command.name,
                            by: msg.author.id,
                            at: new Date()
                        });
                        return [4 /*yield*/, this.save(log)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Logs;
}(db_wrapper_1.default));
exports.default = Logs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9ncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhL2xvZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsNERBQXFDO0FBQ3JDLG9DQUFxRDtBQUlyRDtJQUFrQyx3QkFBdUM7SUFBekU7O0lBbUJBLENBQUM7SUFsQm1CLDBCQUFXLEdBQTNCLFVBQTRCLEVBQXVCO1lBQXJCLEVBQUUsUUFBQTs7Ozs7NEJBQ1gscUJBQU0sY0FBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBQTs7d0JBQXRDLFFBQVEsR0FBRyxTQUEyQjt3QkFDNUMsc0JBQU8sUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBQSxFQUFFLENBQUMsRUFBQzs7OztLQUMxQztJQUVlLHFCQUFNLEdBQXRCLFVBQXVCLEVBQXVCO1lBQXJCLEVBQUUsUUFBQTs7O2dCQUN2QixzQkFBTyxJQUFJLGNBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFDOzs7S0FDM0M7SUFFSyx5QkFBVSxHQUFoQixVQUFpQixHQUFZLEVBQUUsT0FBZ0I7Ozs7OzRCQUMvQixxQkFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUE7O3dCQUFyQyxHQUFHLEdBQUcsU0FBK0I7d0JBQzNDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDOzRCQUNkLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTs0QkFDbEIsRUFBRSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTs0QkFDakIsRUFBRSxFQUFFLElBQUksSUFBSSxFQUFFO3lCQUNqQixDQUFDLENBQUM7d0JBQ0gscUJBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQTs7d0JBQXBCLFNBQW9CLENBQUM7Ozs7O0tBQ3hCO0lBQ0wsV0FBQztBQUFELENBQUMsQUFuQkQsQ0FBa0Msb0JBQVMsR0FtQjFDIn0=