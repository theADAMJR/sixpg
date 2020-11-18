"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DBWrapper = /** @class */ (function () {
    function DBWrapper() {
    }
    DBWrapper.prototype.get = function (type) {
        return this.getOrCreate(type);
    };
    DBWrapper.prototype.save = function (savedType) {
        return savedType.save();
    };
    return DBWrapper;
}());
exports.default = DBWrapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGItd3JhcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhL2RiLXdyYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQTtJQUFBO0lBV0EsQ0FBQztJQVZHLHVCQUFHLEdBQUgsVUFBSSxJQUFRO1FBQ1IsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFLRCx3QkFBSSxHQUFKLFVBQUssU0FBYTtRQUNkLE9BQU8sU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFDTCxnQkFBQztBQUFELENBQUMsQUFYRCxJQVdDIn0=