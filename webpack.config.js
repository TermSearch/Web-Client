const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const merge = require('webpack-merge');

// Detect how npm is run and branch based on that
const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
  app: path.join(__dirname, 'app'),
  dist: path.join(__dirname, 'dist'),
};

const common = {
  // Entry accepts a path or an object of entries.
  // We'll be using the latter form given it's
  // convenient with more complex configurations.
  // devtool: 'cheap-module-eval-source-map',
  entry: {
    app: PATHS.app,
    // 'webpack-hot-middleware/client',
    // './index',
  },
  output: {
    path: PATHS.dist,
    filename: 'bundle.js',
  },
  plugins: [
    new CleanWebpackPlugin([PATHS.dist]),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ManifestPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: __dirname,
      },
    ],
  },
};

// Default configuration. We will return this if
// Webpack is called outside of npm.
if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {});
}

if (TARGET === 'build') {
  module.exports = merge(common, {});
}
