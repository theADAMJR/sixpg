"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bot_1 = require("../../../data/models/bot");
var auto_mod_1 = require("../auto-mod");
var MassCapsValidator = /** @class */ (function () {
    function MassCapsValidator() {
        this.filter = bot_1.MessageFilter.MassCaps;
    }
    MassCapsValidator.prototype.validate = function (content, guild) {
        var _a;
        var pattern = /[A-Z]/g;
        var severity = guild.autoMod.filterThreshold;
        var invalid = content.length > 5
            && (((_a = content.match(pattern)) === null || _a === void 0 ? void 0 : _a.length) / content.length) >= (severity / 10);
        if (invalid)
            throw new auto_mod_1.ValidationError('Message contains too many capital letters.', this.filter);
    };
    return MassCapsValidator;
}());
exports.default = MassCapsValidator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzcy1jYXBzLnZhbGlkYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2F1dG8tbW9kL3ZhbGlkYXRvcnMvbWFzcy1jYXBzLnZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGdEQUFzRTtBQUV0RSx3Q0FBOEM7QUFFOUM7SUFBQTtRQUNJLFdBQU0sR0FBRyxtQkFBYSxDQUFDLFFBQVEsQ0FBQztJQVdwQyxDQUFDO0lBVEcsb0NBQVEsR0FBUixVQUFTLE9BQWUsRUFBRSxLQUFrQjs7UUFDeEMsSUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDO1FBRS9DLElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQztlQUMzQixDQUFDLE9BQUEsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsMENBQUUsTUFBTSxJQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUM1RSxJQUFJLE9BQU87WUFDUCxNQUFNLElBQUksMEJBQWUsQ0FBQyw0Q0FBNEMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0YsQ0FBQztJQUNMLHdCQUFDO0FBQUQsQ0FBQyxBQVpELElBWUMifQ==