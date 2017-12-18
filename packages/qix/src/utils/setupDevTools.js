/* eslint-disable */

function setup(global) {
  'use strict';

  if (process.env.NODE_ENV === 'production') {
    return;
  }

  const reactDevTools = require('react-devtools-core');
  reactDevTools.connectToDevTools({
    host: 'localhost',
    port: window.__REACT_DEVTOOLS_PORT__,
  });
};

if (typeof module !== 'undefined') {
  module.exports = setup;
} else {
  setup(global);
}
