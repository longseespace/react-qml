const fetch = require('fetch-ie8');

function setup(global) {
    'use strict';

    if (global.fetch) {
        return;
    }

    global.fetch = fetch;
}

if (typeof module !== 'undefined') {
  module.exports = setup;
} else {
  setup(global);
}
