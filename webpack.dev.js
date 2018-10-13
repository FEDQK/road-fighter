const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    port: 9000,
    contentBase: path.join(__dirname, "dist")
  }
});
