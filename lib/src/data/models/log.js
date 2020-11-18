"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavedLog = exports.Change = void 0;
var mongoose_1 = require("mongoose");
var Change = /** @class */ (function () {
    function Change(by, changes, module) {
        this.by = by;
        this.changes = changes;
        this.module = module;
        this.at = new Date();
    }
    return Change;
}());
exports.Change = Change;
var LogSchema = new mongoose_1.Schema({
    _id: String,
    changes: { type: Array, default: [] },
    commands: { type: Array, default: [] }
});
exports.SavedLog = mongoose_1.model('log', LogSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2RhdGEvbW9kZWxzL2xvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBbUQ7QUFFbkQ7SUFHSSxnQkFDVyxFQUFVLEVBQ1YsT0FBNEIsRUFDNUIsTUFBYztRQUZkLE9BQUUsR0FBRixFQUFFLENBQVE7UUFDVixZQUFPLEdBQVAsT0FBTyxDQUFxQjtRQUM1QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBTGxCLE9BQUUsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0lBS0ssQ0FBQztJQUNqQyxhQUFDO0FBQUQsQ0FBQyxBQVBELElBT0M7QUFQWSx3QkFBTTtBQWVuQixJQUFNLFNBQVMsR0FBRyxJQUFJLGlCQUFNLENBQUM7SUFDekIsR0FBRyxFQUFFLE1BQU07SUFDWCxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7SUFDckMsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO0NBQ3pDLENBQUMsQ0FBQztBQVFVLFFBQUEsUUFBUSxHQUFHLGdCQUFLLENBQWMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDIn0=