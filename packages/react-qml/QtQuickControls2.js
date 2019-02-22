'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _QtQuickControls2 = require('./dist/components/QtQuickControls2');

Object.keys(_QtQuickControls2).forEach(function(key) {
  if (key === 'default' || key === '__esModule') return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _QtQuickControls2[key];
    },
  });
});
