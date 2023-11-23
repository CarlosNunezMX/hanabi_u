var isLoaded = false;
if (window.wiiu) {
    Array.prototype.find = function (callback) {
        for (var i = 0; i < this.length; i++) {
            if (callback(this[i], i, this)) {
                return this[i];
            };
        }
        return;
    }

    Array.prototype.forEach = function (callback) {
        for (var i = 0; i < this.length; i++) {
            callback(this[i], i, this);
        }

        return;
    }

    Array.prototype.map = function (callback) {
        var x = [];
        for (var i = 0; i < this.length; i++) {
            x.push(callback(this[i], i, this))
        }

        return x;
    }

    Array.prototype.filter = function (callback) {
        var y = [];
        for (var i = 0; i < this.length; i++) {
            if (callback(this[i], i, this))
                y.push(this[i]);
        }

        return y;
    }

    Array.prototype.every = function (callback) {
        var z = [];
        var x = true;
        for (var i = 0; i < this.length; i++) {
            if (!callback(this[i], i, this)) {
                x = false;
                break;
            }
        }

        return x;
    }

    Array.prototype.some = function (callback) {
        var z = [];
        var x = false;
        for (var i = 0; i < this.length; i++) {
            if (callback(this[i], i, this)) {
                x = true;
                break;
            }
        }

        return x;
    }

    Array.prototype.includes || Object.defineProperty(Array.prototype, "includes", { value: function (r, e) { if (null == this) throw new TypeError('"this" is null or not defined'); var t = Object(this), n = t.length >>> 0; if (0 === n) return !1; for (var i = 0 | e, o = Math.max(i >= 0 ? i : n - Math.abs(i), 0); o < n;) { if (function (r, e) { return r === e || "number" == typeof r && "number" == typeof e && isNaN(r) && isNaN(e) }(t[o], r)) return !0; o++ } return !1 } });

    isLoaded = true;
}

if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
      if (typeof this !== 'function') {
        throw new TypeError('¿Qué intentas ligar? No es una función.');
      }
  
      var aArgs = Array.prototype.slice.call(arguments, 1),
          fToBind = this,
          fNOP = function () {},
          fBound = function () {
            return fToBind.apply(this instanceof fNOP ? this : oThis || window, aArgs.concat(Array.prototype.slice.call(arguments)));
          };
  
      fNOP.prototype = this.prototype;
      fBound.prototype = new fNOP();
  
      return fBound;
    };
}