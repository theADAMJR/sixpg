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
exports.XPCardGenerator = void 0;
var image_generator_1 = __importDefault(require("./image-generator"));
var canvas_1 = require("canvas");
var leveling_1 = __importDefault(require("../../../modules/xp/leveling"));
var XPCardGenerator = /** @class */ (function (_super) {
    __extends(XPCardGenerator, _super);
    function XPCardGenerator(discordUser, user, rank) {
        var _this = _super.call(this) || this;
        _this.discordUser = discordUser;
        _this.user = user;
        _this.rank = rank;
        _this.defaultColors = {
            primary: '#F4F2F3',
            secondary: '#46828D',
            tertiary: '#36E2CA'
        };
        return _this;
    }
    XPCardGenerator.prototype.generate = function (savedMember, preview) {
        return __awaiter(this, void 0, void 0, function () {
            var canvas, ctx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (preview)
                            this.user.xpCard = preview;
                        canvas = canvas_1.createCanvas(700, 250);
                        ctx = canvas.getContext('2d');
                        return [4 /*yield*/, _super.prototype.addBackgroundToCanvas.call(this, ctx, canvas, this.user.xpCard.backgroundURL)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.addXPInfo(ctx, canvas, savedMember.xp)];
                    case 2:
                        _a.sent();
                        this.addUserText(ctx, canvas);
                        if (!('userFlags' in this.discordUser)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.addAvatarToCanvas(ctx, this.discordUser.displayAvatarURL
                                .replace('size=64', 'size=256'))];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.addAvatarToCanvas(ctx, this.discordUser.displayAvatarURL({ format: 'png', size: 256 }))];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/, canvas.toBuffer()];
                }
            });
        });
    };
    XPCardGenerator.prototype.addAvatarToCanvas = function (ctx, imageURL) {
        return __awaiter(this, void 0, void 0, function () {
            var avatar;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ctx.beginPath();
                        ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
                        ctx.closePath();
                        ctx.clip();
                        return [4 /*yield*/, canvas_1.loadImage(imageURL)];
                    case 1:
                        avatar = _a.sent();
                        ctx.drawImage(avatar, 25, 25, 200, 200);
                        return [2 /*return*/];
                }
            });
        });
    };
    XPCardGenerator.prototype.addUserText = function (ctx, canvas) {
        var card = this.user.xpCard;
        ctx.fillStyle = card.tertiary || this.defaultColors.tertiary;
        ctx.font = '32px Roboto, sans-serif';
        ctx.fillText("#" + this.rank, canvas.width / 2.5, canvas.height / 2.5);
        ctx.fillStyle = card.primary || this.defaultColors.primary;
        ctx.font = _super.prototype.applyText.call(this, canvas, this.discordUser.username);
        ctx.fillText(this.discordUser.username, canvas.width / 2.7, canvas.height / 1.6);
    };
    XPCardGenerator.prototype.addXPInfo = function (ctx, canvas, xp) {
        return __awaiter(this, void 0, void 0, function () {
            var card, sizeOffset, position, height, _a, nextLevelXP, level, levelCompletion;
            return __generator(this, function (_b) {
                card = this.user.xpCard;
                sizeOffset = 325;
                position = { x: 275, y: canvas.height * 0.775 };
                height = 25;
                _a = leveling_1.default.xpInfo(xp), nextLevelXP = _a.nextLevelXP, level = _a.level, levelCompletion = _a.levelCompletion;
                ctx.fillStyle = card.secondary || this.defaultColors.secondary;
                ctx.fillRect(position.x, position.y, canvas.width - sizeOffset - 1, height);
                ctx.fillStyle = card.tertiary || this.defaultColors.tertiary;
                ctx.fillRect(position.x, position.y, (canvas.width - sizeOffset) * (levelCompletion), height);
                ctx.fillStyle = card.primary || this.defaultColors.primary;
                ctx.font = '16px Roboto, sans-serif';
                ctx.fillText(xp.toString(), canvas.width / 2.5, canvas.height / 1.175);
                ctx.fillStyle = '#0F0F0F';
                ctx.fillText("/", canvas.width / 2.5 +
                    ctx.measureText(xp.toString()).width, canvas.height / 1.175);
                ctx.fillStyle = card.primary || this.defaultColors.primary;
                ctx.fillText(nextLevelXP + "XP", canvas.width / 2.5 +
                    ctx.measureText(xp + "/").width, canvas.height / 1.175);
                ctx.fillStyle = card.primary || this.defaultColors.primary;
                ctx.fillText("LEVEL " + level, canvas.width / 2.5, canvas.height / 1.35);
                return [2 /*return*/];
            });
        });
    };
    return XPCardGenerator;
}(image_generator_1.default));
exports.XPCardGenerator = XPCardGenerator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieHAtY2FyZC1nZW5lcmF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBpL21vZHVsZXMvaW1hZ2UveHAtY2FyZC1nZW5lcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNFQUErQztBQUMvQyxpQ0FBbUY7QUFJbkYsMEVBQW9EO0FBRXBEO0lBQXFDLG1DQUFjO0lBTy9DLHlCQUNZLFdBQWlDLEVBQ2pDLElBQWtCLEVBQ2xCLElBQVk7UUFIeEIsWUFJSSxpQkFBTyxTQUNWO1FBSlcsaUJBQVcsR0FBWCxXQUFXLENBQXNCO1FBQ2pDLFVBQUksR0FBSixJQUFJLENBQWM7UUFDbEIsVUFBSSxHQUFKLElBQUksQ0FBUTtRQVR4QixtQkFBYSxHQUFHO1lBQ1osT0FBTyxFQUFFLFNBQVM7WUFDbEIsU0FBUyxFQUFFLFNBQVM7WUFDcEIsUUFBUSxFQUFFLFNBQVM7U0FDdEIsQ0FBQTs7SUFPRCxDQUFDO0lBRUssa0NBQVEsR0FBZCxVQUFlLFdBQTJCLEVBQUUsT0FBZ0I7Ozs7Ozt3QkFDeEQsSUFBSSxPQUFPOzRCQUNQLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQzt3QkFFekIsTUFBTSxHQUFHLHFCQUFZLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO3dCQUNoQyxHQUFHLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFFcEMscUJBQU0saUJBQU0scUJBQXFCLFlBQUMsR0FBRyxFQUFFLE1BQU0sRUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUE7O3dCQURuQyxTQUNtQyxDQUFDO3dCQUNwQyxxQkFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsV0FBVyxDQUFDLEVB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