"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log_1 = require("../../data/models/log");
var AuditLogger = /** @class */ (function () {
    function AuditLogger() {
    }
    AuditLogger.getChanges = function (values, module, by) {
        var changes = { old: {}, new: {} };
        for (var key in values.old) {
            var changed = JSON.stringify(values.old[key]) !== JSON.stringify(values.new[key]);
            if (changed) {
                changes.old[key] = values.old[key];
                changes.new[key] = values.new[key];
            }
        }
        return new log_1.Change(by, changes, module);
    };
    return AuditLogger;
}());
exports.default = AuditLogger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVkaXQtbG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS9tb2R1bGVzL2F1ZGl0LWxvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUFnRDtBQUVoRDtJQUFBO0lBYUEsQ0FBQztJQVpVLHNCQUFVLEdBQWpCLFVBQWtCLE1BQTRCLEVBQUUsTUFBYyxFQUFFLEVBQVU7UUFDdEUsSUFBSSxPQUFPLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQztRQUVuQyxLQUFLLElBQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLEVBQUU7WUFDMUIsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDcEYsSUFBSSxPQUFPLEVBQUU7Z0JBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDdEM7U0FDSjtRQUNELE9BQU8sSUFBSSxZQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQUFDLEFBYkQsSUFhQyJ9