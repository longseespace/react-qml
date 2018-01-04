const path = require('path');

module.exports = ({ root, platform }) => ({
  entry: './main.js',
  output: {
    path: path.join(root, 'qt/dist'),
    filename: `${platform}.bundle.js`,
    library: 'Bundle',
  },
});
