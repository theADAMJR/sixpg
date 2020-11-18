"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavedUser = exports.XPCard = void 0;
var mongoose_1 = require("mongoose");
var XPCard = /** @class */ (function () {
    function XPCard() {
        this.backgroundURL = '';
        this.primary = '';
        this.secondary = '';
        this.tertiary = '';
    }
    return XPCard;
}());
exports.XPCard = XPCard;
var userSchema = new mongoose_1.Schema({
    _id: String,
    premium: Boolean,
    votes: Number,
    xpCard: { type: Object, default: new XPCard() }
});
exports.SavedUser = mongoose_1.model('user', userSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRhL21vZGVscy91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUFtRDtBQUVuRDtJQUFBO1FBQ0ksa0JBQWEsR0FBRyxFQUFFLENBQUM7UUFDbkIsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUNiLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFDZixhQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFBRCxhQUFDO0FBQUQsQ0FBQyxBQUxELElBS0M7QUFMWSx3QkFBTTtBQU9uQixJQUFNLFVBQVUsR0FBRyxJQUFJLGlCQUFNLENBQUM7SUFDMUIsR0FBRyxFQUFFLE1BQU07SUFDWCxPQUFPLEVBQUUsT0FBTztJQUNoQixLQUFLLEVBQUUsTUFBTTtJQUNiLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksTUFBTSxFQUFFLEVBQUU7Q0FDbEQsQ0FBQyxDQUFDO0FBU1UsUUFBQSxTQUFTLEdBQUcsZ0JBQUssQ0FBZSxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUMifQ==