var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "../helper/index"], function (require, exports, index_1) {
    "use strict";
    exports.__esModule = true;
    exports.escapeToBuffer = exports.stringBufferToString = void 0;
    // The `escapeToBuffer` implementation is based on code from the MIT licensed `react-dom` package.
    // https://github.com/facebook/react/blob/main/packages/react-dom-bindings/src/server/escapeTextForBrowser
    var escapeRe = /[&<>'"]/;
    var stringBufferToString = function (buffer) { return __awaiter(void 0, void 0, void 0, function () {
        var str, promises, i, r;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    str = '';
                    promises = [];
                    i = buffer.length - 1;
                    _a.label = 1;
                case 1:
                    if (!(i >= 0)) return [3 /*break*/, 5];
                    return [4 /*yield*/, buffer[i]];
                case 2:
                    r = _a.sent();
                    if (typeof r === 'object') {
                        promises.push.apply(promises, (r.promises || []));
                    }
                    return [4 /*yield*/, (typeof r === 'object' ? r.toString() : r)];
                case 3:
                    r = _a.sent();
                    if (typeof r === 'object') {
                        promises.push.apply(promises, (r.promises || []));
                    }
                    str += r;
                    _a.label = 4;
                case 4:
                    i--;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/, (0, index_1.raw)(str, promises)];
            }
        });
    }); };
    exports.stringBufferToString = stringBufferToString;
    var escapeToBuffer = function (str, buffer) {
        var match = str.search(escapeRe);
        if (match === -1) {
            buffer[0] += str;
            return;
        }
        var escape;
        var index;
        var lastIndex = 0;
        for (index = match; index < str.length; index++) {
            switch (str.charCodeAt(index)) {
                case 34: // "
                    escape = '&quot;';
                    break;
                case 39: // '
                    escape = '&#39;';
                    break;
                case 38: // &
                    escape = '&amp;';
                    break;
                case 60: // <
                    escape = '&lt;';
                    break;
                case 62: // >
                    escape = '&gt;';
                    break;
                default:
                    continue;
            }
            buffer[0] += str.substring(lastIndex, index) + escape;
            lastIndex = index + 1;
        }
        buffer[0] += str.substring(lastIndex, index);
    };
    exports.escapeToBuffer = escapeToBuffer;
});
