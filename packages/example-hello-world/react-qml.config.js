const path = require('path');

module.exports = ({ root, platform }) => ({
  entry: {
    main: './src/index.js',
    qml: './src/index.qml',
  },
});
