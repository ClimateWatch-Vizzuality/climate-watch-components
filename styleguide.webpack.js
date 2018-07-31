const path = require('path');
const glob = require('glob');

module.exports = {
  devtool: 'eval',
  resolve: { extensions: [ '.js', '.jsx', '.json' ] },
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
