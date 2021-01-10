const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: {
    index: "./src/js/index.js",
  },
  output: {
    filename: "assets/js/[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[name][ext][query]",
        },
      },
      {
        test: /\.html$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/html/[name][ext][query]",
        },
      },
      {
        test: /\.ejs$/,
        loader: "ejs-loader",
        options: {
          variable: "data",
          interpolate: "\\{\\{(.+?)\\}\\}",
          evaluate: "\\[\\[(.+?)\\]\\]",
        },
      },
      {
        test: /[\\/]module[\\/]/,
        type: "asset/resource",
        generator: {
          filename: "assets/module/[name][ext][query]",
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "src/template/main.ejs",
    }),
    new webpack.ProvidePlugin({
      // 라이브러리 로딩
      $: "jquery",
      jQ: "jquery",
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          name: "libs",
        },
      },
    },
  },
};
