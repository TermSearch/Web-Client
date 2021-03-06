const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// Load *package.json* so we can use `dependencies` from there
const pkg = require('./package.json');

// Detect how npm is run and branch based on that
const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
  app: path.join(__dirname, 'app'),
  dist: path.join(__dirname, 'dist'),
};

const common = {
  entry: {
    app: PATHS.app,
  },
  output: {
    path: PATHS.dist,
    filename: '[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Term Search Client',
      template: './index.ejs',
      favicon: './assets/images/favicon.ico'
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: __dirname,
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'file?name=[path][name].[hash].[ext]',
        include: PATHS.images
      }
    ],
  },
};

// Default configuration. We will return this if
// Webpack is called outside of npm.
if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      // Enable history API fallback so HTML5 History API based
      // routing works. This is a good default that will come
      // in handy in more complicated setups.
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,

      // Display only errors to reduce the amount of output.
      stats: 'errors-only',
      host: process.env.HOST,
      port: process.env.PORT,

    },
    module: {
      loaders: [
        {
          test: /\.scss$/,
          loaders: ['style', 'css', 'sass'],
          // Include accepts either a path or an array of paths.
          include: PATHS.app,
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"development"',
        'process.env.API_URL': '"http://0.0.0.0:2020"',
      }),
      new webpack.HotModuleReplacementPlugin(),
      new NpmInstallPlugin({
        save: true,
      }),
    ],
  });
}

if (TARGET === 'build' || TARGET === 'stats') {
  module.exports = merge(common, {
    entry: {
      vendor: Object.keys(pkg.dependencies),
    },
    output: {
      path: PATHS.build,
      filename: '[name].[chunkhash].js',
      chunkFilename: '[chunkhash].js',
    },
    module: {
      loaders: [
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract(
            "style",
            "css!sass")
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('[name].[chunkhash].css'),
      new CleanWebpackPlugin([PATHS.dist]),
      new ManifestPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest'],
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
        'process.env.API_URL': '"https://api.term-search.nl"',
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      }),
    ],
  });
}
