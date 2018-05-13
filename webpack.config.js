const path = require('path');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

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
    }
    // plugins: [
    //     new UglifyJsPlugin({
    //         include: /\.min\.js$/,
    //         sourceMap: true
    //     })
    // ]
};