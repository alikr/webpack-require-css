var md5 = require('md5');
var reg = new RegExp("(?:^|&\?)publicPath=([^&]*)(?:&|$)", "i");
module.exports = function(context) {
    // this.cacheable && this.cacheable();
    var _filepath = this.resourcePath.replace(/\\/g,'/');
    var _filename = _filepath.slice(_filepath.lastIndexOf('/')+1);
    var ext = _filename.slice(_filename.lastIndexOf('.')+1).toLowerCase();
    if(ext=='css'){
        var query = this.query;
        var isWP2 = typeof query=='object';
        var publicPath = isWP2 ? query.publicPath : query.match(reg);
        var _path = isWP2 ? (publicPath||'')
                :(publicPath && publicPath[1]) ? publicPath[1]
                :'';
        var id = md5(context);
        var abspath = _path + _filename;
        var loadFile = abspath + '?v=' + id;
        var content = [
            "var isReady=false;",
            "var hasCSS=document.getElementById('"+id+"');",
            "var css=document.getElementsByTagName('link');",
            "for(var i=0,j=css.length;i<j;i++){",
            "var isCss = css[i].rel=='stylesheet';",
            "isReady = isCss && !!~css[i].href.indexOf('"+abspath+"');",
            "}",
            "if(hasCSS||isReady)return;",
            "var link = document.createElement('link');",
            "link.type = 'text/css';",
            "link.id = '"+id+"';",
            "link.rel = 'stylesheet';",
            "link.href = '"+loadFile+"';",
            "(document.head || document.body).appendChild(link);",
        ].join('');
        return "module.exports = (function(){"+content+"})();";
    }
    return this;
};