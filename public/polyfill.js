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

    Document.prototype.appendChild = function(childs){
        childs.forEach(function(child){
            document.appendChild(child)
        })
    }
}