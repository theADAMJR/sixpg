"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventVariables = /** @class */ (function () {
    function EventVariables(content) {
        this.content = content;
    }
    EventVariables.prototype.guild = function (guild) {
        this.content = this.content.replace(/\[GUILD\]/g, guild.name);
        return this;
    };
    EventVariables.prototype.memberCount = function (guild) {
        this.content = this.content.replace(/\[MEMBER_COUNT\]/g, guild.memberCount.toString());
        return this;
    };
    EventVariables.prototype.message = function (msg) {
        this.content = this.content.replace(/\[MESSAGE\]/g, msg.content);
        return this;
    };
    EventVariables.prototype.oldLevel = function (level) {
        this.content = this.content.replace(/\[OLD_LEVEL\]/g, level.toString());
        return this;
    };
    EventVariables.prototype.newLevel = function (level) {
        this.content = this.content.replace(/\[NEW_LEVEL\]/g, level.toString());
        return this;
    };
    EventVariables.prototype.reason = function (punishment) {
        this.content = this.content.replace(/\[REASON\]/g, punishment.reason);
        return this;
    };
    EventVariables.prototype.user = function (user) {
        this.content = this.content.replace(/\[USER\]/g, "<@!" + user.id + ">");
        return this;
    };
    EventVariables.prototype.xp = function (xp) {
        this.content = this.content.replace(/\[XP\]/g, xp.toString());
        return this;
    };
    EventVariables.prototype.toString = function () { return this.content; };
    return EventVariables;
}());
exports.default = EventVariables;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtdmFyaWFibGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvYW5ub3VuY2UvZXZlbnQtdmFyaWFibGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7SUFDSSx3QkFBb0IsT0FBZTtRQUFmLFlBQU8sR0FBUCxPQUFPLENBQVE7SUFBRyxDQUFDO0lBRXZDLDhCQUFLLEdBQUwsVUFBTSxLQUFZO1FBQ2QsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxvQ0FBVyxHQUFYLFVBQVksS0FBWTtRQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUN2RixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsZ0NBQU8sR0FBUCxVQUFRLEdBQVk7UUFDaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pFLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxpQ0FBUSxHQUFSLFVBQVMsS0FBYTtRQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3hFLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDRCxpQ0FBUSxHQUFSLFVBQVMsS0FBYTtRQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3hFLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCwrQkFBTSxHQUFOLFVBQU8sVUFBMEM7UUFDN0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RFLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCw2QkFBSSxHQUFKLFVBQUssSUFBVTtRQUNYLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLFFBQU0sSUFBSSxDQUFDLEVBQUUsTUFBRyxDQUFDLENBQUM7UUFDbkUsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELDJCQUFFLEdBQUYsVUFBRyxFQUFVO1FBQ1QsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDOUQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELGlDQUFRLEdBQVIsY0FBYSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ3ZDLHFCQUFDO0FBQUQsQ0FBQyxBQTNDRCxJQTJDQyJ9