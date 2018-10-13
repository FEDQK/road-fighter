const path = require("path");

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
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
