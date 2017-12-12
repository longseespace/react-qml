const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'App.build.js',
    library: 'App',
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
            presets: ['env', 'react']
          }
        }
      },
      {
        test: /\.qml/,
        use: 'raw-loader'
      }
    ]
  }
};
