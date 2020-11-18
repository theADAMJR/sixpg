"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bot_1 = require("../../../data/models/bot");
var auto_mod_1 = require("../auto-mod");
var BadLinkValidator = /** @class */ (function () {
    function BadLinkValidator() {
        this.filter = bot_1.MessageFilter.Links;
    }
    BadLinkValidator.prototype.validate = function (content, guild) {
        var isExplicit = guild.autoMod.banLinks
            .some(function (l) { return content.includes(l); });
        if (isExplicit) {
            throw new auto_mod_1.ValidationError('Message contains banned links.', this.filter);
        }
    };
    return BadLinkValidator;
}());
exports.default = BadLinkValidator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFkLWxpbmsudmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvYXV0by1tb2QvdmFsaWRhdG9ycy9iYWQtbGluay52YWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxnREFBc0U7QUFFdEUsd0NBQThDO0FBRTlDO0lBQUE7UUFDSSxXQUFNLEdBQUcsbUJBQWEsQ0FBQyxLQUFLLENBQUM7SUFTakMsQ0FBQztJQVBHLG1DQUFRLEdBQVIsVUFBUyxPQUFlLEVBQUUsS0FBa0I7UUFDeEMsSUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRO2FBQ3BDLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQW5CLENBQW1CLENBQUMsQ0FBQztRQUNwQyxJQUFJLFVBQVUsRUFBRTtZQUNaLE1BQU0sSUFBSSwwQkFBZSxDQUFDLGdDQUFnQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUM1RTtJQUNMLENBQUM7SUFDTCx1QkFBQztBQUFELENBQUMsQUFWRCxJQVVDIn0=