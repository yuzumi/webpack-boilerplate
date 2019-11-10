const path = require("path");
const { HotModuleReplacementPlugin } = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  /**
   * Mode
   * 
   * Tells webpack to use its built-in optimizations.
   */
  mode: "development",

  /**
   * Devtool
   * 
   * Controls if and how source maps are generated.
   */
  devtool: "inline-source-map",

  /**
   * DevServer
   * 
   * Used to configure webpack-dev-server behavior
   */
  devServer: {
    contentBase: path.resolve(__dirname, "../dist"),
    open: true,
    compress: true,
    hot: true,
    port: 3000
  },

  plugins: [
    /**
     * HotModuleReplacementPlugin
     * 
     * Enables Hot Module Replacement, otherwise known as HMR.
     */
    new HotModuleReplacementPlugin()
  ]
});