System.register(["hono/jsx/jsx-runtime"], function (exports_1, context_1) {
    "use strict";
    var __assign = (this && this.__assign) || function () {
        __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    var jsx_runtime_1;
    var __moduleName = context_1 && context_1.id;
    function Link(href) {
        var $link = document.createElement('a');
        $link.href = '#' + href;
        return $link;
    }
    exports_1("Link", Link);
    function LinkJSX(props) {
        // @ts-ignore
        return (_jsx("a", __assign({}, props, { href: "#" + props.href })));
    }
    exports_1("LinkJSX", LinkJSX);
    return {
        setters: [
            function (jsx_runtime_1_1) {
                jsx_runtime_1 = jsx_runtime_1_1;
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=link.js.map