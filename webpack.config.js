const path = require("path");

module.exports = {
  entry: ["babel-polyfill", "./src/js/index.js"],
  mode: "development",
  output: {
    path: path.resolve(__dirname, "src"),
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
