# webpack-require-css
webpack-require-css

> just load css file

# Install

```bash
npm install webpack-require-css --save-dev
```

## Useage

page.js

```javascript
require("css/index.css");
```

webpack.config.js

```javascript
module:{
        loaders:[
            {
                test: /\.css$/,
                loader: 'webpack-require-css?publicPath=/css/'
            }
        ]
    }

```


