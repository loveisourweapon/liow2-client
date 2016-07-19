const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const common = {
  entry: {
    // Main app entry point
    'app': './app/app.js',

    // Vendor dependencies
    // Note: lodash isn't included here, we include specific methods when
    //       required, rather than the full library
    'vendor': [
      'alertify.js',
      'angular',
      'angular-dragula',
      'angular-inview',
      'angular-marked',
      'angular-messages',
      'angular-sanitize',
      'angular-ui-bootstrap',
      'angular-ui-router',
      'angular-ui-switch',
      'angular-youtube-embed',
      'fast-json-patch',
      'medium-editor',
      'moment',
      'satellizer',
      'seedrandom',
      'showdown',
      'to-markdown',
      'ui-select',
      'uuid',
    ],
  },

  output: {
    path: path.join(__dirname, 'public', 'bundles'),
    filename: '[name].[hash].bundle.js',
  },

  module: {
    loaders: [
      {
        // JS/ES6 loader
        test: /\.js$/,
        loaders: [
          'ng-annotate',
          'babel?presets[]=es2015&plugins[]=transform-object-assign',
        ],
        exclude: /node_modules/,
      },

      {
        // SASS/CSS loader
        test: /\.(css|scss)$/,
        loader: ExtractTextPlugin.extract('style', [
          'css?sourceMap',
          'postcss',
          'resolve-url?root=./public',
          'sass?sourceMap',
        ]),
      },

      {
        // Fonts loader (Font awesome)
        test: /\.(ttf|eot|svg|woff2?)/,
        loader: 'file',
      },
    ],
  },

  // PostCSS only used for autoprefixer
  postcss: [ autoprefixer ],

  plugins: [
    // Declare the vendor bundle as a common chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),

    // Extract built CSS into a separate file
    new ExtractTextPlugin('[name].[hash].bundle.css'),

    // Build a manifest.json
    new ManifestPlugin(),
  ],
};

if (isProduction) {
  module.exports = merge(common, {
    // Build source maps
    devtool: 'source-map',

    plugins: [
      // Minify JS
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
        output: {
          comments: false,
        },
      }),
    ],
  });
} else {
  const LiveReloadPlugin = require('webpack-livereload-plugin');

  module.exports = merge(common, {
    // Build source maps
    devtool: 'cheap-module-source-map',

    plugins: [
      // LiveReload for webpack --watch
      new LiveReloadPlugin(),
    ],
  });
}
