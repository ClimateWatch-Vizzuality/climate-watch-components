const path = require('path');
const glob = require('glob');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');

const config = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  node: { fs: 'empty', net: 'empty' },
  module: {
    rules: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.(jpg|jpeg|png|gif)$/, use: 'url-loader' },
      { test: /\.svg$/, use: [ { loader: 'svg-sprite-loader' } ] },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=cw__[name]_[local]',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: [ './node_modules', './src/styles' ]
                .map(d => path.join(__dirname, d))
                .map(g => glob.sync(g))
                .reduce((a, c) => a.concat(c), [])
            }
          }
        ]
      }
    ]
  },
  externals: [ 'react', 'react-dom', 'classnames', 'lodash', 'prop-types' ],
  resolve: {
    extensions: [ '.js', '.jsx', '.json' ],
    symlinks: false,
    plugins: [ new DirectoryNamedWebpackPlugin(true) ],
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      styles: path.resolve(__dirname, 'src/styles/'),
      utils: path.resolve(__dirname, 'src/utils/')
    }
  },
  plugins: []
};

module.exports = config;
