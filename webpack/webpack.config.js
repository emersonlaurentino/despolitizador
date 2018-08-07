const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const rupture = require('rupture');

module.exports = {
  entry: "../src/app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      { test: /\.pug/, loader: "pug-loader" },
      { test: /\.json$/, loader: "json-loader" },
      { test: /\.jpe?g$|\.gif$|\.png$|\.svg$/, use: "file-loader" },
      {
        test: /\.styl/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { importLoaders: 1 }
          },
          "postcss-loader",
          {
            loader: "stylus-loader",
            options: {
              use: [rupture()]
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"]
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({  
      hash: true, 
      template: '../src/index.pug'
    }), 
    new CopyWebpackPlugin([
      { from: '../src/medias/', to: '../medias' },
      { from: '../src/favicon.ico', to: '../' },
    ])
  ]
};