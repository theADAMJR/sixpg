"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var Deps = /** @class */ (function () {
    function Deps() {
    }
    Deps.build = function () {
        var e_1, _a;
        var types = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            types[_i] = arguments[_i];
        }
        if (this.testing)
            return;
        try {
            for (var types_1 = __values(types), types_1_1 = types_1.next(); !types_1_1.done; types_1_1 = types_1.next()) {
                var Type = types_1_1.value;
                try {
                    this.deps.push(new Type());
                }
                // catch { throw new TypeError(`Type '${Type}' could not be instantiated`); }
                catch (_b) { }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (types_1_1 && !types_1_1.done && (_a = types_1.return)) _a.call(types_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    Deps.get = function (type) {
        var service = this.deps.find(function (t) { return t instanceof type; });
        return service || this.add(new type());
    };
    Deps.add = function (instance) {
        this.deps.push(instance);
        return instance;
    };
    Deps.testing = false;
    Deps.deps = [];
    return Deps;
}());
exports.default = Deps;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9kZXBzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQUFBO0lBd0JBLENBQUM7SUFuQlUsVUFBSyxHQUFaOztRQUFhLGVBQWE7YUFBYixVQUFhLEVBQWIscUJBQWEsRUFBYixJQUFhO1lBQWIsMEJBQWE7O1FBQ3RCLElBQUksSUFBSSxDQUFDLE9BQU87WUFBRSxPQUFPOztZQUV6QixLQUFtQixJQUFBLFVBQUEsU0FBQSxLQUFLLENBQUEsNEJBQUEsK0NBQUU7Z0JBQXJCLElBQU0sSUFBSSxrQkFBQTtnQkFDWCxJQUFJO29CQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztpQkFBRTtnQkFDbkMsNkVBQTZFO2dCQUM3RSxXQUFNLEdBQUU7YUFDWDs7Ozs7Ozs7O0lBQ0wsQ0FBQztJQUVNLFFBQUcsR0FBVixVQUFjLElBQVM7UUFDbkIsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLFlBQVksSUFBSSxFQUFqQixDQUFpQixDQUFDLENBQUM7UUFDdkQsT0FBTyxPQUFPLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVjLFFBQUcsR0FBbEIsVUFBc0IsUUFBVztRQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6QixPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBdEJNLFlBQU8sR0FBRyxLQUFLLENBQUM7SUFFUixTQUFJLEdBQVUsRUFBRSxDQUFDO0lBcUJwQyxXQUFDO0NBQUEsQUF4QkQsSUF3QkM7a0JBeEJvQixJQUFJIn0=