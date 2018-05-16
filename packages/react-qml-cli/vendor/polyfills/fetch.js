const fetch = require('fetch-ie8');

function setup(global) {
  'use strict';

  if (global.fetch) {
    return;
  }

  global.fetch = fetch;
  global.Headers = function() {};
  global.Request = function() {};
  global.Response = function() {};
}

// needed for sentry's fetch detection
function Headers() {}
function Request() {}
function Response() {}

if (typeof module !== 'undefined') {
  module.exports = setup;
} else {
  setup(global);
}
