var md5 = require('md5');
module.exports = function(context) {
    // this.cacheable && this.cacheable();
    var _options = this._compilation.options;
    var _root = _options.resolve.root;
    var _filepath = this.resourcePath;
    var abspath = _filepath.replace(_root,'').replace(/\\/g,'/');
    var ext = abspath.slice(abspath.lastIndexOf('.')+1).toLowerCase();
    var id = md5(context);
    if(ext=='css'){
        var content = [
            "if(document.getElementById('"+id+"'))return;",
            "var link = document.createElement('link');",
            "link.type = 'text/css';",
            "link.id = '"+id+"';",
            "link.rel = 'stylesheet';",
            "link.href = '"+abspath+"';",
            "(document.head || document.body).appendChild(link);",
        ].join('');
        return "module.exports = (function(){"+content+"})();";
    }
    return this;
};