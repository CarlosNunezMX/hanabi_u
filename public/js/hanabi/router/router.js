System.register(["../components/notFount", "./render"], function (exports_1, context_1) {
    "use strict";
    var notFount_1, render_1, Router;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (notFount_1_1) {
                notFount_1 = notFount_1_1;
            },
            function (render_1_1) {
                render_1 = render_1_1;
            }
        ],
        execute: function () {
            Router = /** @class */ (function () {
                function Router(Element) {
                    this.notFount = new notFount_1.NotFount();
                    this.Routes = [];
                    this.Element = Element;
                    this.Render = new render_1.Render(this.Element);
                }
                Router.prototype.addPage = function (route, component) {
                    var isRegistered = this.Routes.some(function (_route) { return _route.Root === route; });
                    if (isRegistered)
                        throw new Error("Route is registered!");
                    this.Routes.push({
                        Component: component,
                        Root: route
                    });
                    return this;
                };
                Router.prototype.setNotFoundPage = function (Page) {
                    this.notFount = Page;
                    return this;
                };
                Router.prototype.enroute = function () {
                    var hash = location.hash;
                    var mainroute = this.Routes.find(function (route) { return route.Root === '/'; });
                    var route = hash.replace('#', "");
                    if (route === '' || route === '/') {
                        if (!mainroute)
                            return this.Render.render(this.notFount);
                        return this.Render.render(mainroute.Component);
                    }
                    var component = this.Routes.find(function (r) { return r.Root === route; });
                    if (!component)
                        return this.Render.render(this.notFount);
                    return this.Render.render(component.Component);
                };
                Router.prototype.events = function () {
                    window.addEventListener('hashchange', this.enroute.bind(this));
                };
                return Router;
            }());
            exports_1("Router", Router);
        }
    };
});
//# sourceMappingURL=router.js.map