System.register([], function (exports_1, context_1) {
    "use strict";
    var Render;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Render = /** @class */ (function () {
                function Render(Element) {
                    this.Element = Element;
                }
                Render.prototype.render = function (component) {
                    var _this = this;
                    this.Element.innerHTML = '';
                    document.title = component.RouteName;
                    component.beforeMount()
                        .then(function (res) {
                        component.State = res;
                        var data = component.render.bind(component)();
                        if (typeof data === 'string')
                            return _this.Element.innerHTML = data;
                        // @ts-ignore
                        _this.Element.appendChild(data);
                    })["catch"](function (err) {
                        alert("Application Error" + String(err));
                    });
                };
                return Render;
            }());
            exports_1("Render", Render);
        }
    };
});
//# sourceMappingURL=render.js.map