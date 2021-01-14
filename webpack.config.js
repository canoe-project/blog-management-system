const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { styles } = require("@ckeditor/ckeditor5-dev-utils");

module.exports = {
  devtool: "source-map",
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
        exclude: [/ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css/],
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[name][ext][query]",
        },
        exclude: [/ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.ejs$/,
        loader: "ejs-webpack-loader",
        options: {
          variable: "data",
          interpolate: "\\{\\{(.+?)\\}\\}",
          evaluate: "\\[\\[(.+?)\\]\\]",
        },
      },
      {
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,

        use: ["raw-loader"],
      },
      {
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,

        use: [
          {
            loader: "style-loader",
            options: {
              injectType: "singletonStyleTag",
              attributes: {
                "data-cke": true,
              },
            },
          },
          {
            loader: "postcss-loader",
            options: styles.getPostCssConfig({
              themeImporter: {
                themePath: require.resolve("@ckeditor/ckeditor5-theme-lark"),
              },
              minify: true,
            }),
          },
        ],
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
