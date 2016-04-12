const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const PATHS = {
  app: path.join(__dirname, 'app'),
  dist: path.join(__dirname, 'dist'),
};

module.exports = {
  devtool: 'cheap-module-eval-source-map',
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
