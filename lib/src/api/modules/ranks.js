"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Ranks = /** @class */ (function () {
    function Ranks() {
    }
    Ranks.get = function (member, savedMembers) {
        return savedMembers
            .sort(function (a, b) { return b.xp - a.xp; })
            .findIndex(function (m) { return m.userId === member.id; }) + 1;
    };
    return Ranks;
}());
exports.default = Ranks;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFua3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBpL21vZHVsZXMvcmFua3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQTtJQUFBO0lBTUEsQ0FBQztJQUxVLFNBQUcsR0FBVixVQUFXLE1BQW1CLEVBQUUsWUFBOEI7UUFDMUQsT0FBTyxZQUFZO2FBQ2QsSUFBSSxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSyxPQUFBLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBWCxDQUFXLENBQUM7YUFDM0IsU0FBUyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsRUFBRSxFQUF0QixDQUFzQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFDTCxZQUFDO0FBQUQsQ0FBQyxBQU5ELElBTUMifQ==