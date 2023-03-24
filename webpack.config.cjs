const path = require("path");
const webpack = require("webpack");
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'production', // or 'production' or 'none'
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new Dotenv(),
    new webpack.DefinePlugin({
      // "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.REACT_APP_BACKEND_URL": JSON.stringify("http://localhost:5000")
    })
  ]
};
