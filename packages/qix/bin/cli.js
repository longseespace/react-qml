#!/usr/bin/env node

require('babel-register')({
  ignore: /node_modules(?!\/qix)/,
  retainLines: true,
  sourceMaps: 'inline',
});

require('../src/cli');
