const config = require("./webpack.config");
const merge = require("webpack-merge");
const path = require("path");
const webpack = require("webpack");

module.exports = merge.smart(config, {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    open: true
  }
});
