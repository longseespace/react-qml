const Promise = require('promise-polyfill');

function setup(global) {
    'use strict';

    if (global.Promise) {
        return;
    }

    global.Promise = Promise;
}

if (typeof module !== 'undefined') {
  module.exports = setup;
} else {
  setup(global);
}
