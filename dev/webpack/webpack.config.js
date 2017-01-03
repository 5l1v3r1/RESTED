const { resolve } = require('path');
const webpack = require('webpack');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

const rootDir = resolve(__dirname, '..', '..');

const doNothing = () => {};

module.exports = {
  context: rootDir,

  entry: "./src/index.js",

  output: {
    path: "./dist",
    filename: "rested.js"
  },

  /* Note: Inline source maps are super slow in Firefox */
  devtool: isProd ? 'source-map' : 'inline-source-map',

  performance: { hints: false },

  // Compiler plugins. See https://github.com/webpack/docs/wiki/list-of-plugins
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        eslint: {
          failOnWarning: isProd,
          failOnError: isProd,
        }
      }
    }),
    isProd
      ? new webpack.optimize.UglifyJsPlugin({
        // Keep legible sources for the AMO reviewers
        mangle: false,
        beautify: true,
        compress: {
          warnings: false
        },
        output: {
          comments: false
        },
      })
      : doNothing,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${nodeEnv}"`,
    }),
  ],

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        include: resolve(rootDir, 'src'),
        options: {
          cache: false,
        }
      },
      {
        test: /\.js/,
        include: resolve(rootDir, 'src'),
        loader: 'babel-loader',
        options: {
          cacheDirectory: !isProd,
        }
      }
    ]
  },

  resolve: {
    modules: [
      resolve(rootDir, 'src'),
      'node_modules',
    ],
  }
}

