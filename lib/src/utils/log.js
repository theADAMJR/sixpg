"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Log = /** @class */ (function () {
    function Log() {
    }
    Log.getSource = function (src) {
        return (src === null || src === void 0 ? void 0 : src.toUpperCase()) || 'OTHER';
    };
    Log.info = function (message, src) {
        console.log("[" + this.toHHMMSS(new Date()) + "] INFO [" + this.getSource(src) + "] " + message);
    };
    Log.error = function (err, src) {
        var message = (err === null || err === void 0 ? void 0 : err.message) || err || 'Unknown error';
        console.error("[" + this.toHHMMSS(new Date()) + "] ERROR [" + this.getSource(src) + "] " + message);
    };
    Log.toHHMMSS = function (time) {
        var hours = time.getHours().toString().padStart(2, '0');
        var minutes = time.getMinutes().toString().padStart(2, '0');
        var seconds = time.getSeconds().toString().padStart(2, '0');
        return hours + ":" + minutes + ":" + seconds;
    };
    return Log;
}());
exports.default = Log;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL2xvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0lBQUE7SUFrQkEsQ0FBQztJQWpCVSxhQUFTLEdBQWhCLFVBQWlCLEdBQVk7UUFDekIsT0FBTyxDQUFBLEdBQUcsYUFBSCxHQUFHLHVCQUFILEdBQUcsQ0FBRSxXQUFXLE9BQU0sT0FBTyxDQUFDO0lBQ3pDLENBQUM7SUFDTSxRQUFJLEdBQVgsVUFBWSxPQUFhLEVBQUUsR0FBWTtRQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLGdCQUFXLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQUssT0FBUyxDQUFDLENBQUE7SUFDMUYsQ0FBQztJQUNNLFNBQUssR0FBWixVQUFhLEdBQVMsRUFBRSxHQUFZO1FBQ2hDLElBQU0sT0FBTyxHQUFHLENBQUEsR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLE9BQU8sS0FBSSxHQUFHLElBQUksZUFBZSxDQUFDO1FBQ3ZELE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsaUJBQVksSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBSyxPQUFTLENBQUMsQ0FBQTtJQUM3RixDQUFDO0lBRWMsWUFBUSxHQUF2QixVQUF3QixJQUFVO1FBQzlCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3hELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzVELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzVELE9BQVUsS0FBSyxTQUFJLE9BQU8sU0FBSSxPQUFTLENBQUM7SUFDNUMsQ0FBQztJQUNMLFVBQUM7QUFBRCxDQUFDLEFBbEJELElBa0JDIn0=