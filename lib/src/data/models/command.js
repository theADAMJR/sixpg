"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavedCommand = void 0;
var mongoose_1 = require("mongoose");
var commandSchema = new mongoose_1.Schema({
    name: String,
    summary: String,
    module: String,
    usage: String,
    precondition: String
});
exports.SavedCommand = mongoose_1.model('command', commandSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRhL21vZGVscy9jb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUFtRDtBQUduRCxJQUFNLGFBQWEsR0FBRyxJQUFJLGlCQUFNLENBQUM7SUFDN0IsSUFBSSxFQUFFLE1BQU07SUFDWixPQUFPLEVBQUUsTUFBTTtJQUNmLE1BQU0sRUFBRSxNQUFNO0lBQ2QsS0FBSyxFQUFFLE1BQU07SUFDYixZQUFZLEVBQUUsTUFBTTtDQUN2QixDQUFDLENBQUM7QUFVVSxRQUFBLFlBQVksR0FBRyxnQkFBSyxDQUFrQixTQUFTLEVBQUUsYUFBYSxDQUFDLENBQUMifQ==