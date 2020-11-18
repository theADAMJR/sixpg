"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavedMember = void 0;
var mongoose_1 = require("mongoose");
var memberSchema = new mongoose_1.Schema({
    userId: String,
    guildId: String,
    recentMessages: { type: Array, default: [] },
    warnings: { type: Array, default: [] },
    xp: { type: Number, default: 0 }
});
exports.SavedMember = mongoose_1.model('member', memberSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtYmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2RhdGEvbW9kZWxzL21lbWJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBbUQ7QUFFbkQsSUFBTSxZQUFZLEdBQUcsSUFBSSxpQkFBTSxDQUFDO0lBQzVCLE1BQU0sRUFBRSxNQUFNO0lBQ2QsT0FBTyxFQUFFLE1BQU07SUFDZixjQUFjLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7SUFDNUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO0lBQ3RDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRTtDQUNuQyxDQUFDLENBQUM7QUFnQlUsUUFBQSxXQUFXLEdBQUcsZ0JBQUssQ0FBaUIsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDIn0=