function setup(global) {
  'use strict';

  if (global.crypto) {
    return;
  }

  global.navigator = {
    userAgent: 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)'
  }
  
  global.msCrypto = {
    subtle: {}
  };

  global.self = global;

  require('./webcrypto-shim');
}

if (typeof module !== 'undefined') {
  module.exports = setup;
} else {
  setup(global);
}
