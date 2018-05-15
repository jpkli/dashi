const path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        "dashi": "./index.js",
        // "dashi.min": "./index.js"
    },
    devtool: "source-map",
    target: 'web',
    module: {
        rules: [
          {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: "css-loader"
            })
          },
          {
            test: /\.(eot|png|svg|[ot]tf|woff2?)(\?v=\d+\.\d+\.\d+)?$/,
            use: {
              loader: "file-loader",
              options: {
                name: "fonts/[name].[ext]",
              },
            },
          },
        ]
      },
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "[name].js"
    },
    plugins: [ 
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true,
        })
    ]
};