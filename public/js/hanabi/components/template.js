System.register(["hono/jsx/jsx-runtime"], function (exports_1, context_1) {
    "use strict";
    var jsx_runtime_1, Component;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (jsx_runtime_1_1) {
                jsx_runtime_1 = jsx_runtime_1_1;
            }
        ],
        execute: function () {
            Component = /** @class */ (function () {
                function Component() {
                    this.RouteName = "";
                    this.State = {};
                }
                Component.prototype.render = function () { return (_jsx("h1", {})); };
                ;
                // @ts-ignore
                Component.prototype.beforeMount = function () { };
                return Component;
            }());
            exports_1("Component", Component);
        }
    };
});
//# sourceMappingURL=template.js.map