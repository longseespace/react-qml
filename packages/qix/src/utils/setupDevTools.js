/* eslint-disable */

function setup(global) {
  'use strict';

  if (process.env.NODE_ENV === 'production') {
    return;
  }

  if (!window.__REACT_DEVTOOLS_PORT__) {
    return;
  }

  const reactDevTools = require('react-devtools-core');
  try {
    reactDevTools.connectToDevTools({
      host: 'localhost',
      port: window.__REACT_DEVTOOLS_PORT__,
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
