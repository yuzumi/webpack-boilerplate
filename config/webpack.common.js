const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  /**
   * Entry
   * 
   * An entry point indicates which module webpack should use 
   * to begin building out its internal dependency graph
   */
  entry: {
    main: path.resolve(__dirname, "../src", "index.js")
  },

  /**
   * Output
   * 
   * The output property tells webpack where to emit the bundles 
   * it creates and how to name these files.
   */
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "../dist")
  },

  /**
   * Loaders
   * 
   * Out of the box, webpack only understands JavaScript and JSON files. 
   * Loaders allow webpack to process other types of files and convert 
   * them into valid modules that can be consumed by your application 
   * and added to the dependency graph.
   */
  module: {
    rules: [
      /**
       * JavaScript
       *
       * Use Babel to transpile JavaScript files.
       */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"]
      },

      /**
       * Styles
       *
       * Inject CSS into the head with source maps.
       */
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },

      /**
       * Images
       *
       * Copy image files to build folder.
       */
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
          context: "src"
        }
      },

      /**
       * Fonts
       *
       * Inline font files.
       */
      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/,
        loader: "url-loader",
        options: {
          limit: 8192,
          name: "[path][name].[ext]",
          context: "src"
        }
      }
    ]
  },

  /**
   * Plugins
   * 
   * Plugins can be leveraged to perform a wider range of tasks like 
   * bundle optimization, asset management and injection of environment variables.
   */
  plugins: [
    /**
     * CleanWebpackPlugin
     * 
     * Removes/cleans build folder(s).
     */
    new CleanWebpackPlugin(),

    /**
     * CopyWebpackPlugin
     * 
     * Copies individual files or entire directories, which already exist, to the build directory.
     */
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../public"),
        to: "assets",
        ignore: ["*.DS_Store"]
      }
    ]),

    /**
     * HtmlWebpackPlugin
     * 
     * Makes it easy to create HTML files to serve your webpack bundles. 
     */
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src", "index.html"),
      filename: "index.html"
    })
  ]
};