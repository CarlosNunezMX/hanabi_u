System.register(["hono/jsx/jsx-runtime", "./template.js"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var jsx_runtime_1, template_js_1, NotFount;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (jsx_runtime_1_1) {
                jsx_runtime_1 = jsx_runtime_1_1;
            },
            function (template_js_1_1) {
                template_js_1 = template_js_1_1;
            }
        ],
        execute: function () {
            NotFount = /** @class */ (function (_super) {
                __extends(NotFount, _super);
                function NotFount() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.RouteName = "Page not fount!";
                    return _this;
                }
                NotFount.prototype.render = function () {
                    return (_jsxs("div", { children: [_jsxs("h1", { children: ["Ops...", _jsx("span", { children: "Page not fount!" })] }), _jsx("code", { children: this.State })] }));
                };
                NotFount.prototype.beforeMount = function () {
                    return new Promise(function (res) {
                        res(location.hash);
                    });
                };
                return NotFount;
            }(template_js_1.Component));
            exports_1("NotFount", NotFount);
        }
    };
});
//# sourceMappingURL=notFount.js.map