"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_json_1 = __importDefault(require("../config.json"));
var mongoose_1 = __importDefault(require("mongoose"));
var deps_1 = __importDefault(require("./utils/deps"));
var events_service_1 = __importDefault(require("./services/events.service"));
var server_1 = __importDefault(require("./api/server"));
var global_bots_1 = __importDefault(require("./global-bots"));
var command_service_1 = __importDefault(require("./services/command.service"));
var auto_mod_1 = __importDefault(require("./modules/auto-mod/auto-mod"));
deps_1.default.build(server_1.default, events_service_1.default, global_bots_1.default);
deps_1.default.get(events_service_1.default).init();
deps_1.default.get(command_service_1.default).init();
deps_1.default.get(auto_mod_1.default).init();
mongoose_1.default.connect(config_json_1.default.mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLCtEQUFvQztBQUNwQyxzREFBZ0M7QUFDaEMsc0RBQWdDO0FBRWhDLDZFQUFzRDtBQUN0RCx3REFBK0I7QUFDL0IsOERBQXVDO0FBQ3ZDLCtFQUF3RDtBQUN4RCx5RUFBa0Q7QUFFbEQsY0FBSSxDQUFDLEtBQUssQ0FBQyxnQkFBRyxFQUFFLHdCQUFhLEVBQUUscUJBQVUsQ0FBQyxDQUFDO0FBRTNDLGNBQUksQ0FBQyxHQUFHLENBQWdCLHdCQUFhLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUM5QyxjQUFJLENBQUMsR0FBRyxDQUFpQix5QkFBYyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDaEQsY0FBSSxDQUFDLEdBQUcsQ0FBVSxrQkFBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFFbEMsa0JBQVEsQ0FBQyxPQUFPLENBQUMscUJBQU0sQ0FBQyxRQUFRLEVBQUU7SUFDOUIsa0JBQWtCLEVBQUUsSUFBSTtJQUN4QixlQUFlLEVBQUUsSUFBSTtJQUNyQixnQkFBZ0IsRUFBRSxLQUFLO0NBQzFCLENBQUMsQ0FBQyJ9