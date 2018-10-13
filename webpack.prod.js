const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const path = require("path");

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new CleanWebpackPlugin(["dist/*"]),
    new CopyWebpackPlugin([
      {
        from: "./media",
        to: "./media",
        toType: "dir"
      }
    ]),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    })
  ]
});
