/* eslint-disable */

function flattenStyle(style) {
  if (style === null || typeof style !== 'object') {
    return undefined;
  }

  if (!Array.isArray(style)) {
    return style;
  }

  const result = {};
  for (let i = 0, styleLength = style.length; i < styleLength; ++i) {
    const computedStyle = flattenStyle(style[i]);
    if (computedStyle) {
      for (const key in computedStyle) {
        result[key] = computedStyle[key];
      }
    }
  }

  return result;
}

function setup(global) {
  'use strict';

  if (process.env.NODE_ENV === 'production') {
    return;
  }

  const reactDevTools = require('react-devtools-core');
  try {
    reactDevTools.connectToDevTools({
      host: process.env.__REACT_DEVTOOLS_HOST__ || 'localhost',
      port: process.env.__REACT_DEVTOOLS_PORT__ || 8097,
      resolveRNStyle: flattenStyle,
    });
  } catch (e) {
    console.error('Cannot connect to React DevTools');
  }
}

if (typeof module !== 'undefined') {
  module.exports = setup;
} else {
  setup(global);
}
