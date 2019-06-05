#!/usr/bin/env node

require('babel-register')({
  ignore: /node_modules(?!\/react-qml)/,
  retainLines: true,
  sourceMaps: 'inline',
});

require('../src/cli');
