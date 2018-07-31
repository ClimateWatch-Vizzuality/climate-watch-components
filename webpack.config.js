const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.png$/, use: 'url-loader' },
      { test: /\.svg$/, use: [ { loader: 'svg-sprite-loader' } ] },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: 'cw__[name]_[local]'
              }
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [ './node_modules', './src/css' ]
                  .map(d => path.join(__dirname, d))
                  .map(g => glob.sync(g))
                  .reduce((a, c) => a.concat(c), [])
              }
            }
          ]
        })
      }
    ]
  },
  externals: [ 'react', 'react-dom', 'react-css-modules' ],
  resolve: { extensions: [ '.js', '.jsx', '.json' ], symlinks: false },
  optimization: {
    minimizer: [
      // https://github.com/mishoo/UglifyJS2/tree/harmony
      new UglifyJsPlugin({
        uglifyOptions: {
          output: { comments: false },
          minify: {},
          compress: {
            warnings: false,
            conditionals: true,
            unused: true,
            comparisons: true,
            sequences: true,
            dead_code: true,
            evaluate: true,
            if_return: true,
            join_vars: true
          }
        }
      })
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      disable: false,
      allChunks: true,
      filename: '[name].css'
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
};

module.exports = config;
