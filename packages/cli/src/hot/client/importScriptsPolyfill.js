/**
 * Copyright 2017-present, Callstack.
 * All rights reserved.
 *
 * @flow
 */

/**
 * When setting `target` to `webworker` in webpack config, it will change template for downloading
 * hot update and will use `importScripts` which are available in WebWorkers, so we need to
 * provide implementation for it.
 *
 * Native `importScripts` is synchronous, however we can't do that, so this polyfill
 * is async and returns a Promise.
 */
function importScripts(importPath) {
  return new Promise((resolve, reject) => {
    Qt.include(importPath, result => {
      if (result.status === 0) {
        return resolve();
      }
      if (result.status === 2) {
        return reject(new Error('Network error'));
      }
      if (result.status === 3) {
        return reject(new Error(result.exception));
      }
      return 'loading';
    });
  });
}
global.importScripts = global.importScripts || importScripts;
