if (window.wiiu) {

    // Create Fetch polyfill script tag
    var fetchScript = document.createElement("script");
    fetchScript.type = "text/javascript";
    fetchScript.src =
        "https://cdn.jsdelivr.net/npm/whatwg-fetch@3.4.0/dist/fetch.umd.min.js";
    document.head.appendChild(fetchScript);
    /**
     * 
     * @param {<T>(value: <T>, index: number, array: Array<T>) => <T> | undefined} callback 
     */
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

    Array.prototype.includes||Object.defineProperty(Array.prototype,"includes",{value:function(r,e){if(null==this)throw new TypeError('"this" is null or not defined');var t=Object(this),n=t.length>>>0;if(0===n)return!1;for(var i=0|e,o=Math.max(i>=0?i:n-Math.abs(i),0);o<n;){if(function(r,e){return r===e||"number"==typeof r&&"number"==typeof e&&isNaN(r)&&isNaN(e)}(t[o],r))return!0;o++}return!1}});


}