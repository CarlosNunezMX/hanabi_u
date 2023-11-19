define(["require", "exports", "../util/html"], function (require, exports, html_1) {
    "use strict";
    exports.__esModule = true;
    exports.html = exports.raw = void 0;
    var raw = function (value, promises) {
        var escapedString = new String(value);
        escapedString.isEscaped = true;
        escapedString.promises = promises;
        return escapedString;
    };
    exports.raw = raw;
    var html = function (strings) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        var buffer = [''];
        for (var i = 0, len = strings.length - 1; i < len; i++) {
            buffer[0] += strings[i];
            var children = values[i] instanceof Array ? values[i].flat(Infinity) : [values[i]];
            for (var i_1 = 0, len_1 = children.length; i_1 < len_1; i_1++) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var child = children[i_1];
                if (typeof child === 'string') {
                    (0, html_1.escapeToBuffer)(child, buffer);
                }
                else if (typeof child === 'boolean' || child === null || child === undefined) {
                    continue;
                }
                else if ((typeof child === 'object' && child.isEscaped) ||
                    typeof child === 'number') {
                    var tmp = child.toString();
                    if (tmp instanceof Promise) {
                        buffer.unshift('', tmp);
                    }
                    else {
                        buffer[0] += tmp;
                    }
                }
                else {
                    (0, html_1.escapeToBuffer)(child.toString(), buffer);
                }
            }
        }
        buffer[0] += strings[strings.length - 1];
        return buffer.length === 1 ? (0, exports.raw)(buffer[0]) : (0, html_1.stringBufferToString)(buffer);
    };
    exports.html = html;
});
