const path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: "development",
    entry: {
        "dashi": "./index.js",
        // "dashi.min": "./index.js"
    },
    devtool: "source-map",
    target: 'web',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },
    module: {
        rules: [
          {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: "css-loader"
            })
          },
          { test: /\.svg$/, loader: 'svg-inline-loader' },
          {
            test: /\.(ttf|eot|woff|woff2)$/,
            use: {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
              },
            },
          },
        ]
      },
    plugins: [
        new UglifyJsPlugin({
            include: /\.min\.js$/,
            sourceMap: true
        }), 
        new ExtractTextPlugin({
            path: path.resolve(__dirname, "dist"),
            filename: '[name].css',
            allChunks: true,
        })
    ]
};