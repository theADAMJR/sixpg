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
Object.defineProperty(exports, "__esModule", { value: true });
var canvas_1 = require("canvas");
var ImageGenerator = /** @class */ (function () {
    function ImageGenerator() {
    }
    ImageGenerator.prototype.addBackgroundToCanvas = function (ctx, canvas, backgroundURL) {
        return __awaiter(this, void 0, void 0, function () {
            var background, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (backgroundURL && backgroundURL.includes('api'))
                            throw Error('I don\'t think that\'s a good idea... 🤔');
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, canvas_1.loadImage(backgroundURL || 'api/modules/image/wallpaper.png')];
                    case 2:
                        background = _b.sent();
                        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                        return [3 /*break*/, 4];
                    case 3:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ImageGenerator.prototype.applyText = function (canvas, text) {
        var context = canvas.getContext('2d');
        var fontSize = 70;
        do
            context.font = (fontSize -= 8) + "px Roboto, sans-serif";
        while (context.measureText(text).width > canvas.width - 275);
        return context.font;
    };
    ImageGenerator.prototype.wrapText = function (ctx, text, x, y, maxWidth, lineHeight) {
        if (lineHeight === void 0) { lineHeight = 15; }
        var words = text.split(' ');
        var line = '';
        for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = ctx.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                ctx.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
            }
            else
                line = testLine;
        }
        ctx.fillText(line, x, y);
    };
    return ImageGenerator;
}());
exports.default = ImageGenerator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtZ2VuZXJhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwaS9tb2R1bGVzL2ltYWdlL2ltYWdlLWdlbmVyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUEyQztBQUczQztJQUFBO0lBMENBLENBQUM7SUF4Q1MsOENBQXFCLEdBQTNCLFVBQTRCLEdBQUcsRUFBRSxNQUFNLEVBQUUsYUFBcUI7Ozs7Ozt3QkFDMUQsSUFBSSxhQUFhLElBQUksYUFBYSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7NEJBQzlDLE1BQU0sS0FBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7Ozs7d0JBR3ZDLHFCQUFNLGtCQUFTLENBQUMsYUFBYSxJQUFJLGlDQUFpQyxDQUFDLEVBQUE7O3dCQUFoRixVQUFVLEdBQUcsU0FBbUU7d0JBQ3RGLEdBQUcsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7Ozs7OztLQUdsRTtJQUNELGtDQUFTLEdBQVQsVUFBVSxNQUFjLEVBQUUsSUFBWTtRQUVwQyxJQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUVsQjtZQUNFLE9BQU8sQ0FBQyxJQUFJLEdBQUcsQ0FBRyxRQUFRLElBQUksQ0FBQywyQkFBdUIsQ0FBQztlQUNsRCxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxHQUFHLEdBQUcsRUFBRTtRQUM3RCxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQUNELGlDQUFRLEdBQVIsVUFBUyxHQUFHLEVBQUUsSUFBWSxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsUUFBZ0IsRUFBRSxVQUFlO1FBQWYsMkJBQUEsRUFBQSxlQUFlO1FBRWpGLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBRWQsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQ3BDO1lBQ0UsSUFBSSxRQUFRLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDckMsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN4QyxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQzlCLElBQUksU0FBUyxHQUFHLFFBQVEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNqQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO2dCQUN0QixDQUFDLElBQUksVUFBVSxDQUFDO2FBQ2pCOztnQkFFQyxJQUFJLEdBQUcsUUFBUSxDQUFDO1NBQ25CO1FBQ0QsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFDTCxxQkFBQztBQUFELENBQUMsQUExQ0QsSUEwQ0MifQ==