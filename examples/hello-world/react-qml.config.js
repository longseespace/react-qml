const path = require('path');

module.exports = ({ root, platform }) => ({
  context: path.resolve(root, 'src'),
  entry: ['./index.qml', './index.js'],
});
