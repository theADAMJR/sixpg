"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommandUtils = /** @class */ (function () {
    function CommandUtils() {
    }
    CommandUtils.getMemberFromMention = function (mention, guild) {
        var _a;
        var id = (_a = mention.replace(/^<@!?(\d+)>$/gm, '$1')) !== null && _a !== void 0 ? _a : '';
        var member = guild.members.cache.get(id);
        if (!member)
            throw new TypeError('Member not found.');
        return member;
    };
    return CommandUtils;
}());
exports.default = CommandUtils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZC11dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9jb21tYW5kLXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7SUFBQTtJQVNBLENBQUM7SUFSVSxpQ0FBb0IsR0FBM0IsVUFBNEIsT0FBZSxFQUFFLEtBQVU7O1FBQ25ELElBQU0sRUFBRSxTQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLG1DQUFJLEVBQUUsQ0FBQztRQUN6RCxJQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLE1BQU07WUFDUCxNQUFNLElBQUksU0FBUyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFFN0MsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUNMLG1CQUFDO0FBQUQsQ0FBQyxBQVRELElBU0MifQ==