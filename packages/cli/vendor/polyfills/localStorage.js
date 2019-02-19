const createSettings = category => {
  const qmlSource = `import Qt.labs.settings 1.0;
Settings {
  property string data: '{}'
}`;

  // no need to try catch, let it throw
  const qmlObject = Qt.createQmlObject(qmlSource, Qt.application);
  if (category) {
    qmlObject.category = category;
  }

  return qmlObject;
};

function setup(global) {
  'use strict';

  if (global.localStorage) {
    return;
  }

  const settings = createSettings('localStorage');
  let localData = {};
  try {
    localData = JSON.parse(settings.data);
  } catch (e) {
    localData = {};
  }

  const storage = {
    getItem(key) {
      if (!key) {
        return;
      }
      return localData[key];
    },

    setItem(key, value) {
      localData[key] = value;
      settings.data = JSON.stringify(localData);
    },

    removeItem(key) {
      delete localData[key];
      settings.data = JSON.stringify(localData);;
    },
  };

  global.localStorage = storage;
}

if (typeof module !== 'undefined') {
  module.exports = setup;
} else {
  setup(global);
}
