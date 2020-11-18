"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bot_1 = require("../../../data/models/bot");
var auto_mod_1 = require("../auto-mod");
var MassMentionValidator = /** @class */ (function () {
    function MassMentionValidator() {
        this.filter = bot_1.MessageFilter.MassMention;
    }
    MassMentionValidator.prototype.validate = function (content, guild) {
        var _a;
        var pattern = /<@![0-9]{18}>/gm;
        var severity = guild.autoMod.filterThreshold;
        var invalid = ((_a = content.match(pattern)) === null || _a === void 0 ? void 0 : _a.length) >= severity;
        if (invalid)
            throw new auto_mod_1.ValidationError('Message contains too many mentions.', this.filter);
    };
    return MassMentionValidator;
}());
exports.default = MassMentionValidator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzcy1tZW50aW9uLnZhbGlkYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2F1dG8tbW9kL3ZhbGlkYXRvcnMvbWFzcy1tZW50aW9uLnZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGdEQUFzRTtBQUV0RSx3Q0FBOEM7QUFFOUM7SUFBQTtRQUNJLFdBQU0sR0FBRyxtQkFBYSxDQUFDLFdBQVcsQ0FBQztJQVV2QyxDQUFDO0lBUkcsdUNBQVEsR0FBUixVQUFTLE9BQWUsRUFBRSxLQUFrQjs7UUFDeEMsSUFBTSxPQUFPLEdBQUcsaUJBQWlCLENBQUM7UUFDbEMsSUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUM7UUFFL0MsSUFBTSxPQUFPLEdBQUcsT0FBQSxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQywwQ0FBRSxNQUFNLEtBQUksUUFBUSxDQUFDO1FBQzNELElBQUksT0FBTztZQUNQLE1BQU0sSUFBSSwwQkFBZSxDQUFDLHFDQUFxQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0RixDQUFDO0lBQ0wsMkJBQUM7QUFBRCxDQUFDLEFBWEQsSUFXQyJ9