# webpack-require-css
webpack-require-css

> Just load css file

# Install

```bash
npm install webpack-require-css --save-dev
```

## Useage

page.js

```javascript
require("css/index.css");
```

### webpack.config.js
> webpack 2

```javascript
module:{
        rules:[
            {
                test: /\.css$/,
                loader:"webpack-require-css",
                options:{
                    publicPath:'/static/css/'
                }
            }
        ]
    }

```

> webpack 1.x.x

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


