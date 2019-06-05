// global LocalStorage

function setup(global) {
  'use strict';

  if (global.openDatabaseSync) {
    return;
  }

  global.openDatabaseSync = LocalStorage.openDatabaseSync;
  global.openDatabase = LocalStorage.openDatabaseSync;
}

if (typeof module !== 'undefined') {
  module.exports = setup;
} else {
  setup(global);
}
