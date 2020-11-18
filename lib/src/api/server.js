"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthClient = exports.app = void 0;
var express_1 = __importDefault(require("express"));
var config_json_1 = __importDefault(require("../../config.json"));
var cors_1 = __importDefault(require("cors"));
var oauth_1 = __importDefault(require("@2pg/oauth"));
var body_parser_1 = __importDefault(require("body-parser"));
var path_1 = require("path");
var api_routes_1 = require("./routes/api-routes");
var log_1 = __importDefault(require("../utils/log"));
exports.app = express_1.default();
exports.AuthClient = new oauth_1.default({
    id: config_json_1.default.bot.id,
    secret: config_json_1.default.bot.secret,
    redirectURI: config_json_1.default.api.url + "/auth",
    scopes: ['identify', 'guilds']
});
var API = /** @class */ (function () {
    function API() {
        exports.app.use(cors_1.default());
        exports.app.use(body_parser_1.default.json());
        exports.app.use('/api', api_routes_1.router);
        var dashboardPath = path_1.resolve('./dist/dashboard');
        exports.app.use(express_1.default.static(dashboardPath));
        exports.app.all('*', function (req, res) { return res
            .status(200)
            .sendFile(dashboardPath + "/index.html"); });
    }
    return API;
}());
exports.default = API;
var port = config_json_1.default.api.port || 3000;
exports.app.listen(port, function () { return log_1.default.info("API is live on port " + port); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwaS9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsb0RBQThCO0FBQzlCLGtFQUF1QztBQUN2Qyw4Q0FBd0I7QUFDeEIscURBQXFDO0FBQ3JDLDREQUFxQztBQUNyQyw2QkFBK0I7QUFFL0Isa0RBQTBEO0FBQzFELHFEQUErQjtBQUVsQixRQUFBLEdBQUcsR0FBRyxpQkFBTyxFQUFFLENBQUM7QUFDaEIsUUFBQSxVQUFVLEdBQUcsSUFBSSxlQUFXLENBQUM7SUFDdEMsRUFBRSxFQUFFLHFCQUFNLENBQUMsR0FBRyxDQUFDLEVBQUU7SUFDakIsTUFBTSxFQUFFLHFCQUFNLENBQUMsR0FBRyxDQUFDLE1BQU07SUFDekIsV0FBVyxFQUFLLHFCQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsVUFBTztJQUNyQyxNQUFNLEVBQUUsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDO0NBQ2pDLENBQUMsQ0FBQztBQUVIO0lBQ0k7UUFDSSxXQUFHLENBQUMsR0FBRyxDQUFDLGNBQUksRUFBRSxDQUFDLENBQUM7UUFDaEIsV0FBRyxDQUFDLEdBQUcsQ0FBQyxxQkFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDM0IsV0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsbUJBQVMsQ0FBQyxDQUFDO1FBRTNCLElBQU0sYUFBYSxHQUFHLGNBQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO1FBQ2pELFdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUV2QyxXQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxVQUFDLEdBQUcsRUFBRSxHQUFHLElBQUssT0FBQSxHQUFHO2FBQ3pCLE1BQU0sQ0FBQyxHQUFHLENBQUM7YUFDWCxRQUFRLENBQUksYUFBYSxnQkFBYSxDQUFDLEVBRmpCLENBRWlCLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBQ0wsVUFBQztBQUFELENBQUMsQUFiRCxJQWFDOztBQUVELElBQU0sSUFBSSxHQUFHLHFCQUFNLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7QUFDckMsV0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsY0FBTSxPQUFBLGFBQUcsQ0FBQyxJQUFJLENBQUMseUJBQXVCLElBQU0sQ0FBQyxFQUF2QyxDQUF1QyxDQUFDLENBQUMifQ==