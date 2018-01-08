const path = require('path');

module.exports = ({ root }) => ({
  entry: './main.js',
  output: {
    path: path.join(root, 'qt/dist'),
    filename: 'bundle.js',
    library: 'Bundle',
  },
});
