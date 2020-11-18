"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var command_utils_1 = __importDefault(require("../utils/command-utils"));
var config_json_1 = __importDefault(require("../../config.json"));
var XPCommand = /** @class */ (function () {
    function XPCommand() {
        this.name = 'xp';
        this.summary = 'Display the XP card of a user.';
        this.precondition = '';
        this.cooldown = 3;
        this.module = 'Leveling';
        this.execute = function (ctx, userMention) {
            var target = (userMention) ?
                command_utils_1.default.getMemberFromMention(userMention, ctx.guild) : ctx.member;
            if (target.user.bot)
                throw new Error("Bot users cannot earn XP");
            var xpCardURL = config_json_1.default.api.url + "/bots/" + ctx.bot.user.id + "/guilds/" + ctx.guild.id + "/members/" + target.id + "/xp-card";
            return ctx.channel.send({ files: [{
                        attachment: xpCardURL,
                        name: 'xp-card.png'
                    }] });
        };
    }
    return XPCommand;
}());
exports.default = XPCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieHAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMveHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSx5RUFBa0Q7QUFDbEQsa0VBQXVDO0FBRXZDO0lBQUE7UUFDSSxTQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ1osWUFBTyxHQUFHLGdDQUFnQyxDQUFDO1FBQzNDLGlCQUFZLEdBQWUsRUFBRSxDQUFDO1FBQzlCLGFBQVEsR0FBRyxDQUFDLENBQUM7UUFDYixXQUFNLEdBQUcsVUFBVSxDQUFDO1FBRXBCLFlBQU8sR0FBRyxVQUFDLEdBQW1CLEVBQUUsV0FBbUI7WUFDL0MsSUFBTSxNQUFNLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUMxQix1QkFBWSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7WUFFM0UsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUc7Z0JBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1lBRWhELElBQU0sU0FBUyxHQUFNLHFCQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsY0FBUyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLGdCQUFXLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxpQkFBWSxNQUFNLENBQUMsRUFBRSxhQUFVLENBQUM7WUFDbEgsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDO3dCQUM5QixVQUFVLEVBQUUsU0FBUzt3QkFDckIsSUFBSSxFQUFFLGFBQWE7cUJBQ3RCLENBQUMsRUFBQyxDQUFDLENBQUM7UUFDVCxDQUFDLENBQUM7SUFDTixDQUFDO0lBQUQsZ0JBQUM7QUFBRCxDQUFDLEFBcEJELElBb0JDIn0=