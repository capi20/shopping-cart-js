const path = require("path");

module.exports = {
  entry: ["babel-polyfill", "./src/static/js/index.js"],
  mode: "development",
  output: {
    path: path.resolve(__dirname, "src/static/dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
