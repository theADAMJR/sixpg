"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var bot_1 = require("../../../data/models/bot");
var auto_mod_1 = require("../auto-mod");
var BadWordValidator = /** @class */ (function () {
    function BadWordValidator() {
        this.filter = bot_1.MessageFilter.Words;
    }
    BadWordValidator.prototype.validate = function (content, guild) {
        var e_1, _a;
        var msgWords = content.split(' ');
        var _loop_1 = function (word) {
            var isExplicit = guild.autoMod.banWords
                .some(function (w) { return w.toLowerCase() === word.toLowerCase(); });
            if (isExplicit) {
                throw new auto_mod_1.ValidationError('Message contains banned words.', this_1.filter);
            }
        };
        var this_1 = this;
        try {
            for (var msgWords_1 = __values(msgWords), msgWords_1_1 = msgWords_1.next(); !msgWords_1_1.done; msgWords_1_1 = msgWords_1.next()) {
                var word = msgWords_1_1.value;
                _loop_1(word);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (msgWords_1_1 && !msgWords_1_1.done && (_a = msgWords_1.return)) _a.call(msgWords_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    return BadWordValidator;
}());
exports.default = BadWordValidator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFkLXdvcmQudmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvYXV0by1tb2QvdmFsaWRhdG9ycy9iYWQtd29yZC52YWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLGdEQUFzRTtBQUV0RSx3Q0FBOEM7QUFFOUM7SUFBQTtRQUNJLFdBQU0sR0FBRyxtQkFBYSxDQUFDLEtBQUssQ0FBQztJQVlqQyxDQUFDO0lBVkcsbUNBQVEsR0FBUixVQUFTLE9BQWUsRUFBRSxLQUFrQjs7UUFDeEMsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQ0FDekIsSUFBSTtZQUNYLElBQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUTtpQkFDcEMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFdBQVcsRUFBRSxLQUFLLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBdEMsQ0FBc0MsQ0FBQyxDQUFDO1lBQ3ZELElBQUksVUFBVSxFQUFFO2dCQUNaLE1BQU0sSUFBSSwwQkFBZSxDQUFDLGdDQUFnQyxFQUFFLE9BQUssTUFBTSxDQUFDLENBQUM7YUFDNUU7Ozs7WUFMTCxLQUFtQixJQUFBLGFBQUEsU0FBQSxRQUFRLENBQUEsa0NBQUE7Z0JBQXRCLElBQU0sSUFBSSxxQkFBQTt3QkFBSixJQUFJO2FBTWQ7Ozs7Ozs7OztJQUNMLENBQUM7SUFDTCx1QkFBQztBQUFELENBQUMsQUFiRCxJQWFDIn0=