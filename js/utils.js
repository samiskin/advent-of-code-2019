"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports._ = require("lodash");
exports.eq = function (a, b) { return a === b; };
exports.neq = function (a, b) { return a !== b; };
exports.gt = function (a, b) { return a > b; };
exports.lt = function (a, b) { return a < b; };
exports.range = function (num, skip) {
    if (skip === void 0) { skip = 0; }
    return Array.from("x".repeat(num))
        .map(function (x, i) { return i; })
        .filter(function (i) { return i >= skip; });
};
exports.range2 = function (start, end) {
    return Array.from("x".repeat(end - start)).map(function (x, i) { return i + start; });
};
exports.nRange = function (start) {
    var nums = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        nums[_i - 1] = arguments[_i];
    }
    if (nums.length === 0)
        return exports.range(start).map(function (i) { return [i]; });
    var nested = exports.nRange.apply(void 0, nums);
    return exports._.flatMap(exports.range(start), (function (i) { return nested.map(function (nest) { return __spreadArrays([i], nest); }); }));
};
exports.print = function (col) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var getNum = function (color) {
        if (color === void 0) { color = col; }
        switch (color) {
            case 'r':
            case 'red': return 31;
            case 'g':
            case 'green': return 32;
            case 'y':
            case 'yellow': return 33;
            case 'b':
            case 'blue': return 34;
            case 'm':
            case 'magenta': return 35;
            case 'c':
            case 'cyan': return 36;
            case 'w':
            case 'white': return 37;
            case 'rst':
            case 'clr':
            case 'reset': return 0;
        }
    };
    console.log.apply(console, __spreadArrays(["\u001B[" + getNum() + "m"], args, ["\u001B[" + getNum('reset') + "m"]));
};
exports.hash = function (_a) {
    var x = _a[0], y = _a[1];
    return x + " " + y;
};
exports.printGrid = function (map, valOverrides, posOverrides) {
    if (valOverrides === void 0) { valOverrides = {}; }
    if (posOverrides === void 0) { posOverrides = {}; }
    var _a, _b;
    var points = Object.keys(map).filter(function (hash) { return !!map[hash]; }).map(function (hash) { return hash.split(' ').map(function (i) { return parseInt(i); }); });
    var min_x = Math.min.apply(Math, points.map(function (_a) {
        var x = _a[0], y = _a[1];
        return x;
    }));
    var max_x = Math.max.apply(Math, points.map(function (_a) {
        var x = _a[0], y = _a[1];
        return x;
    }));
    var min_y = Math.min.apply(Math, points.map(function (_a) {
        var x = _a[0], y = _a[1];
        return y;
    }));
    var max_y = Math.max.apply(Math, points.map(function (_a) {
        var x = _a[0], y = _a[1];
        return y;
    }));
    for (var _i = 0, _c = exports.range(max_y - min_y + 1); _i < _c.length; _i++) {
        var y_base = _c[_i];
        var output = '';
        for (var _d = 0, _e = exports.range(max_x - min_x + 1); _d < _e.length; _d++) {
            var x_base = _e[_d];
            var _f = [x_base + min_x, y_base + min_y], x = _f[0], y = _f[1];
            var posOverride = posOverrides[exports.hash([x, y])];
            if (posOverride) {
                output += posOverride;
            }
            else {
                var value = (_a = map[exports.hash([x, y])], (_a !== null && _a !== void 0 ? _a : ' '));
                output += (_b = valOverrides[value], (_b !== null && _b !== void 0 ? _b : value));
            }
        }
        console.log(output);
    }
};
exports.timeout = function (time) { return new Promise(function (resolve) { return setTimeout(resolve, time); }); };
exports.clamp = function (val, lower, upper) { return Math.max(Math.min(val, upper), lower); };
exports.gcd = function () {
    var nums = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        nums[_i] = arguments[_i];
    }
    return nums.reduce(function (ans, n) {
        var x = Math.abs(ans);
        var y = Math.abs(n);
        while (y) {
            var t = y;
            y = x % y;
            x = t;
        }
        return x;
    });
};
exports.lcm = function () {
    var nums = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        nums[_i] = arguments[_i];
    }
    return nums.reduce(function (ans, n) { return (n * ans) / exports.gcd(ans, n); });
};
exports.getNeighbors = function (x, y) {
    return exports.nRange(3, 3)
        .map(function (_a) {
        var dx = _a[0], dy = _a[1];
        return [dx - 1, dy - 1];
    })
        .filter(function (_a) {
        var dx = _a[0], dy = _a[1];
        return Math.abs(dx) + Math.abs(dy) < 2;
    })
        .map(function (_a) {
        var dx = _a[0], dy = _a[1];
        return [x + dx, y + dy];
    })
        .filter(function (_a) {
        var nx = _a[0], ny = _a[1];
        return nx !== x || ny !== y;
    });
};
function bfs(map, _a, isWall) {
    var visited, toVisit, lengths, parents, _loop_1, state_1;
    var _b;
    var sx = _a[0], sy = _a[1];
    if (isWall === void 0) { isWall = function (val) { return !!val; }; }
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                visited = new Set();
                toVisit = [[sx, sy]];
                lengths = (_b = {}, _b[exports.hash([sx, sy])] = 0, _b);
                parents = {};
                _loop_1 = function () {
                    var pos, length_1, next;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                pos = toVisit.shift();
                                if (!pos)
                                    return [2 /*return*/, "break"];
                                length_1 = lengths[exports.hash(pos)];
                                return [4 /*yield*/, [pos, length_1]];
                            case 1:
                                _a.sent();
                                visited.add(exports.hash(pos));
                                next = exports.getNeighbors.apply(void 0, pos).filter(function (n) { return !visited.has(exports.hash(n)); })
                                    .filter(function (n) { return !(isWall(map[exports.hash(n)])); });
                                next.forEach(function (n) {
                                    lengths[exports.hash(n)] = length_1 + 1;
                                    parents[exports.hash(n)] = pos;
                                });
                                toVisit = toVisit.concat(next);
                                return [2 /*return*/];
                        }
                    });
                };
                _c.label = 1;
            case 1:
                if (!true) return [3 /*break*/, 3];
                return [5 /*yield**/, _loop_1()];
            case 2:
                state_1 = _c.sent();
                if (state_1 === "break")
                    return [3 /*break*/, 3];
                return [3 /*break*/, 1];
            case 3: return [2 /*return*/, parents];
        }
    });
}
exports.bfs = bfs;
exports.backtrace = function (parentsMap, _a) {
    var sx = _a[0], sy = _a[1];
    var curr = [sx, sy];
    var path = [];
    while (curr) {
        path.push(curr);
        curr = parentsMap[exports.hash(curr)];
    }
    return path;
};
function searchSorted(haystack, target, bounds) {
    if (bounds === void 0) { bounds = [0, haystack.length]; }
    var _a, _b;
    var min = bounds[0], max = bounds[1];
    if (max <= min)
        return null;
    var pivot = Math.floor((max - min) / 2 + min);
    console.log(min, max, pivot);
    var candidate = typeof haystack === 'function' ? haystack(pivot) : haystack[pivot];
    if (exports._.isEqual(candidate, target)) {
        return pivot;
    }
    else {
        return _b = (_a = searchSorted(haystack, target, [min, pivot]), (_a !== null && _a !== void 0 ? _a : searchSorted(haystack, target, [pivot + 1, max]))), (_b !== null && _b !== void 0 ? _b : null);
    }
}
exports.searchSorted = searchSorted;
