const path = require('path');
const glob = require('glob');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');

module.exports = {
  devtool: 'eval',
  resolve: {
    extensions: [ '.js', '.jsx', '.json' ],
    plugins: [ new DirectoryNamedWebpackPlugin(true) ],
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      styles: path.resolve(__dirname, 'src/styles/'),
      utils: path.resolve(__dirname, 'src/utils/')
    }
  },
  node: { fs: 'empty', net: 'empty' },
  module: {
    rules: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.(jpe?g|png|gif)$/i, use: 'url-loader' },
      { test: /\.svg$/, use: 'svg-sprite-loader' },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=cw__[name]_[local]',
          'resolve-url-loader',
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
      }
    ]
  },
  plugins: []
};
