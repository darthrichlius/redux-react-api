const path = require("node:path");
const nodeExternals = require("webpack-node-externals");
const NodemonPlugin = require("nodemon-webpack-plugin"); // Import nodemon plugin
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  target: "node",
  externals: [nodeExternals()], // Exclude node_modules from the bundle
  module: {
    rules: [
      {
        test: /\.ts$/, // Apply the loader to .ts files
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        type: "json",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"], // Resolve these extensions
    // IMPORTANT: Declaring the TS aliases in the webpack is important for the aliases to work properly
    plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })],
  },
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
  watch: "development",
  watchOptions: {
    ignored: /node_modules/, // Ignore node_modules during watch
  },
  /**
   * Generate full source map (the most detailed mapping between the original source code and the compiled code)
   * Pretty usefull in case of debugging
   */
  devtool: "source-map",
  plugins: [
    new NodemonPlugin({
      script: "./dist/app.js",
      watch: [
        path.resolve(__dirname, "dist"),
        // Ensure we also watch `tsconfig.json`, relevant during the development phase
        path.resolve(__dirname, "tsconfig.json"),
      ],
      // Add tsconfig.json to the list of watched files
      ext: "js,json,ts",
    }),
  ],
};
