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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavedBot = exports.DashboardSettings = exports.MusicModule = exports.LevelingModule = exports.GeneralModule = exports.MessageFilter = exports.CommandsModule = exports.AutoModModule = exports.EventType = exports.AnnounceModule = exports.Module = void 0;
var mongoose_1 = require("mongoose");
var Module = /** @class */ (function () {
    function Module() {
        this.enabled = true;
    }
    return Module;
}());
exports.Module = Module;
var AnnounceModule = /** @class */ (function (_super) {
    __extends(AnnounceModule, _super);
    function AnnounceModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.events = [];
        return _this;
    }
    return AnnounceModule;
}(Module));
exports.AnnounceModule = AnnounceModule;
var EventType;
(function (EventType) {
    EventType[EventType["MemberJoin"] = 0] = "MemberJoin";
    EventType[EventType["MemberLeave"] = 1] = "MemberLeave";
    EventType[EventType["MessageDeleted"] = 2] = "MessageDeleted";
})(EventType = exports.EventType || (exports.EventType = {}));
var AutoModModule = /** @class */ (function (_super) {
    __extends(AutoModModule, _super);
    function AutoModModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ignoredRoleNames = [];
        _this.autoDeleteMessages = true;
        _this.filters = [];
        _this.banWords = [];
        _this.banLinks = [];
        _this.autoWarnUsers = true;
        _this.filterThreshold = 5;
        return _this;
    }
    return AutoModModule;
}(Module));
exports.AutoModModule = AutoModModule;
var CommandsModule = /** @class */ (function (_super) {
    __extends(CommandsModule, _super);
    function CommandsModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.configs = [];
        return _this;
    }
    return CommandsModule;
}(Module));
exports.CommandsModule = CommandsModule;
var MessageFilter;
(function (MessageFilter) {
    MessageFilter["Links"] = "LINKS";
    MessageFilter["MassCaps"] = "MASS_CAPS";
    MessageFilter["MassMention"] = "MASS_MENTION";
    MessageFilter["Words"] = "WORDS";
})(MessageFilter = exports.MessageFilter || (exports.MessageFilter = {}));
var GeneralModule = /** @class */ (function (_super) {
    __extends(GeneralModule, _super);
    function GeneralModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefix = '.';
        _this.ignoredChannelNames = [];
        _this.autoRoleNames = [];
        return _this;
    }
    return GeneralModule;
}(Module));
exports.GeneralModule = GeneralModule;
var LevelingModule = /** @class */ (function (_super) {
    __extends(LevelingModule, _super);
    function LevelingModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.levelRoleNames = [];
        _this.ignoredRoleNames = [];
        _this.xpPerMessage = 50;
        _this.xpCooldown = 5;
        _this.maxMessagesPerMinute = 3;
        return _this;
    }
    return LevelingModule;
}(Module));
exports.LevelingModule = LevelingModule;
var MusicModule = /** @class */ (function (_super) {
    __extends(MusicModule, _super);
    function MusicModule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MusicModule;
}(Module));
exports.MusicModule = MusicModule;
var DashboardSettings = /** @class */ (function () {
    function DashboardSettings() {
        this.privateLeaderboard = false;
    }
    return DashboardSettings;
}());
exports.DashboardSettings = DashboardSettings;
var botSchema = new mongoose_1.Schema({
    _id: String,
    announce: { type: Object, default: new AnnounceModule() },
    autoMod: { type: Object, default: new AutoModModule() },
    commands: { type: Object, default: new CommandsModule() },
    general: { type: Object, default: new GeneralModule() },
    leveling: { type: Object, default: new LevelingModule() },
    music: { type: Object, default: new MusicModule },
    ownerId: String,
    settings: { type: Object, default: new DashboardSettings() },
    tokenHash: String
});
exports.SavedBot = mongoose_1.model('bot', botSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm90LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2RhdGEvbW9kZWxzL2JvdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQW1EO0FBRW5EO0lBQUE7UUFDSSxZQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ25CLENBQUM7SUFBRCxhQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7QUFGWSx3QkFBTTtBQUluQjtJQUFvQyxrQ0FBTTtJQUExQztRQUFBLHFFQUVDO1FBREcsWUFBTSxHQUFvQixFQUFFLENBQUM7O0lBQ2pDLENBQUM7SUFBRCxxQkFBQztBQUFELENBQUMsQUFGRCxDQUFvQyxNQUFNLEdBRXpDO0FBRlksd0NBQWM7QUFJM0IsSUFBWSxTQUFxRDtBQUFqRSxXQUFZLFNBQVM7SUFBRyxxREFBVSxDQUFBO0lBQUUsdURBQVcsQ0FBQTtJQUFFLDZEQUFjLENBQUE7QUFBQyxDQUFDLEVBQXJELFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBQTRDO0FBUWpFO0lBQW1DLGlDQUFNO0lBQXpDO1FBQUEscUVBUUM7UUFQRyxzQkFBZ0IsR0FBYSxFQUFFLENBQUM7UUFDaEMsd0JBQWtCLEdBQUcsSUFBSSxDQUFDO1FBQzFCLGFBQU8sR0FBb0IsRUFBRSxDQUFDO1FBQzlCLGNBQVEsR0FBYSxFQUFFLENBQUM7UUFDeEIsY0FBUSxHQUFhLEVBQUUsQ0FBQztRQUN4QixtQkFBYSxHQUFHLElBQUksQ0FBQztRQUNyQixxQkFBZSxHQUFHLENBQUMsQ0FBQzs7SUFDeEIsQ0FBQztJQUFELG9CQUFDO0FBQUQsQ0FBQyxBQVJELENBQW1DLE1BQU0sR0FReEM7QUFSWSxzQ0FBYTtBQVUxQjtJQUFvQyxrQ0FBTTtJQUExQztRQUFBLHFFQUVDO1FBREcsYUFBTyxHQUFvQixFQUFFLENBQUM7O0lBQ2xDLENBQUM7SUFBRCxxQkFBQztBQUFELENBQUMsQUFGRCxDQUFvQyxNQUFNLEdBRXpDO0FBRlksd0NBQWM7QUFJM0IsSUFBWSxhQUtYO0FBTEQsV0FBWSxhQUFhO0lBQ3JCLGdDQUFlLENBQUE7SUFDZix1Q0FBc0IsQ0FBQTtJQUN0Qiw2Q0FBNEIsQ0FBQTtJQUM1QixnQ0FBZSxDQUFBO0FBQ25CLENBQUMsRUFMVyxhQUFhLEdBQWIscUJBQWEsS0FBYixxQkFBYSxRQUt4QjtBQUVEO0lBQW1DLGlDQUFNO0lBQXpDO1FBQUEscUVBSUM7UUFIRyxZQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ2IseUJBQW1CLEdBQWEsRUFBRSxDQUFDO1FBQ25DLG1CQUFhLEdBQWEsRUFBRSxDQUFDOztJQUNqQyxDQUFDO0lBQUQsb0JBQUM7QUFBRCxDQUFDLEFBSkQsQ0FBbUMsTUFBTSxHQUl4QztBQUpZLHNDQUFhO0FBTTFCO0lBQW9DLGtDQUFNO0lBQTFDO1FBQUEscUVBTUM7UUFMRyxvQkFBYyxHQUFnQixFQUFFLENBQUM7UUFDakMsc0JBQWdCLEdBQWEsRUFBRSxDQUFDO1FBQ2hDLGtCQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLGdCQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsMEJBQW9CLEdBQUcsQ0FBQyxDQUFDOztJQUM3QixDQUFDO0lBQUQscUJBQUM7QUFBRCxDQUFDLEFBTkQsQ0FBb0MsTUFBTSxHQU16QztBQU5ZLHdDQUFjO0FBYTNCO0lBQWlDLCtCQUFNO0lBQXZDOztJQUVBLENBQUM7SUFBRCxrQkFBQztBQUFELENBQUMsQUFGRCxDQUFpQyxNQUFNLEdBRXRDO0FBRlksa0NBQVc7QUFTeEI7SUFBQTtRQUNJLHVCQUFrQixHQUFHLEtBQUssQ0FBQztJQUMvQixDQUFDO0lBQUQsd0JBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQztBQUZZLDhDQUFpQjtBQUk5QixJQUFNLFNBQVMsR0FBRyxJQUFJLGlCQUFNLENBQUM7SUFDekIsR0FBRyxFQUFFLE1BQU07SUFDWCxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLGNBQWMsRUFBRSxFQUFFO0lBQ3pELE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksYUFBYSxFQUFFLEVBQUU7SUFDdkQsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxjQUFjLEVBQUUsRUFBRTtJQUN6RCxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLGFBQWEsRUFBRSxFQUFFO0lBQ3ZELFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksY0FBYyxFQUFFLEVBQUU7SUFDekQsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxXQUFXLEVBQUU7SUFDakQsT0FBTyxFQUFFLE1BQU07SUFDZixRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLGlCQUFpQixFQUFFLEVBQUU7SUFDNUQsU0FBUyxFQUFFLE1BQU07Q0FDcEIsQ0FBQyxDQUFDO0FBZVUsUUFBQSxRQUFRLEdBQUcsZ0JBQUssQ0FBYyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUMifQ==