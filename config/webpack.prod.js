const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common");

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].[contenthash].bundle.js",
    publicPath: "/"
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          "css-loader"
        ]
      }
    ]
  },
  plugins: [
    /**
     * MiniCssExtractPlugin
     * 
     * Extracts CSS into separate files. 
     * It creates a CSS file per JS file which contains CSS.
     */
    new MiniCssExtractPlugin({
      filename: "styles/[name].[contenthash].css",
      chunkFilename: "[id].css"
    })
  ],

  /**
   * Optimization
   * 
   * Production minimizing of JavaScript and CSS assets.
   */
  optimization: {
    minimizer: [
      /**
       * TerserJSPlugin
       * 
       * Uses terser to minify your JavaScript.
       */
      new TerserJSPlugin(),

      /**
       * OptimizeCSSAssetsPlugin
       * 
       * Optimizes/minimizes CSS assets.
       */
      new OptimizeCSSAssetsPlugin()
    ]
  }
});