const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/main.js",
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, "dist"),
    publicPath: "./",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
    ]
  },
  plugins: [
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
    }),
    // new CleanWebpackPlugin(
    //   path.resolve(__dirname, 'dist'),
    // )
  ],
  devServer: {
    port: 9000,
    contentBase: path.join(__dirname, 'dist'),
  }
};
