System.register(["./router/router", "./components/template"], function (exports_1, context_1) {
    "use strict";
    var router_1, template_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (template_1_1) {
                template_1 = template_1_1;
            }
        ],
        execute: function () {
            exports_1("Router", router_1.Router);
            exports_1("Component", template_1.Component);
        }
    };
});
//# sourceMappingURL=index.js.map