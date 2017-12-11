const path = require('path');

module.exports = {
  entry: ['./src/ReactQML.js'],
  output: {
    filename: 'ReactQML.build.js',
    library: 'ReactQML',
    path: path.resolve(__dirname, 'src')
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
