const path = require('path');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var base = {
    entry: {
        "dashi": "./index.js",
        "dashi.min": "./index.js"
    },
    devtool: "source-map",
    target: 'web',
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "[name].js"
    },
    plugins: [
        new UglifyJsPlugin({
            include: /\.min\.js$/,
            sourceMap: true
        })
    ]
};

// var module = 

var bundleSemantic = {
    entry: {
        "dashi.bundle.semantic.min": "./build/bundle.semantic.js"
    },
    devtool: "source-map",
    target: 'web',
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "[name].js"
    },
    plugins: [
      new UglifyJsPlugin({
        include: /\.min\.js$/,
        sourceMap: true
      })
    ]
};

var bundleSemanticJquery = {
  entry: {
      "dashi.bundle.semantic-jquery.min": "./build/bundle.semantic-jquery.js"
  },
  devtool: "source-map",
  target: 'web',
  output: {
      path: path.resolve(__dirname, "../dist"),
      filename: "[name].js"
  },
  plugins: [
    new UglifyJsPlugin({
      include: /\.min\.js$/,
      sourceMap: true
    })
  ]
};

var bundleSemanticCSS = {
  entry: {
      "dashi.css": "./build/bundle.css.js"
  },
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
      filename: "[name]"
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name]',
      allChunks: true,
    })
  ]
};

module.exports = [base, bundleSemantic, bundleSemanticCSS, bundleSemanticJquery];