/* eslint-disable */

function setup(global) {
  'use strict';

  if (process.env.NODE_ENV === 'production') {
    return;
  }

  if (!process.env.__REACT_DEVTOOLS_PORT__) {
    return;
  }

  const reactDevTools = require('react-devtools-core');
  try {
    reactDevTools.connectToDevTools({
      host: 'localhost',
      port: process.env.__REACT_DEVTOOLS_PORT__,
    });
  } catch (e) {
    console.error('Cannot connect to React DevTools')
  }
};

if (typeof module !== 'undefined') {
  module.exports = setup;
} else {
  setup(global);
}
