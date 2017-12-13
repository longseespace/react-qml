const path = require('path');

module.exports = {
  entry: ['./src/ReactQML.js'],
  output: {
    filename: 'ReactQML.js',
    library: 'ReactQML',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: ['babel-plugin-transform-runtime']
          }
        }
      }
    ]
  }
};
