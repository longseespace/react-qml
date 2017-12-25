let fakeRoot;
let realRoot;
let activeCounter = 0;

import get from 'lodash/get';
import set from 'lodash/set';

const getRoot = rootInstance => {
  if (fakeRoot) {
    return fakeRoot;
  }

  console.log('creating fakeRoot ');
  fakeRoot = Qt.createQmlObject(
    'import QtQuick 2.7; Item { visible: false; }',
    rootInstance,
    'FakeRoot'
  );

  realRoot = rootInstance;

  return fakeRoot;
};

const ATTRIBUTE = 'ATTRIBUTE';
const ELEMENT = 'ELEMENT';

const createQmlObject = (qmlContent, rootElem, name) => {
  return Qt.createQmlObject(qmlContent, getRoot(rootElem), name);
};

export const makeAttributeNode = (name, value = null) => (
  console.log('makeAttributeNode'),
  {
    id: ++activeCounter,
    type: ATTRIBUTE,
    name,
    value,
    initialValue: null,
  }
);

export const makeElementNode = (name, defaultProp, qmlContent, rootElem) => (
  console.log('makeElementNode'),
  {
    id: ++activeCounter,
    type: ELEMENT,
    name,
    defaultProp,
    children: [],
    value: createQmlObject(qmlContent, rootElem, name),
  }
);

export const isElement = obj => obj.type && obj.type === ELEMENT;
export const isAttribute = obj => obj.type && obj.type === ATTRIBUTE;

const arrify = v => Array.isArray(v) ? v : [v];

export const setAttribute = (parent, key, children) => {
  const qmlObject = parent.value;
  const prev = get(qmlObject, key);
  console.log(require('util').inspect(prev, { depth: 1 }));
  console.log(require('util').inspect(children, { depth: 1 }));
  if (prev && typeof prev.push === 'function') {
    prev.length = 0;
    arrify(children).forEach(child => {
      console.debug(qmlObject, 'push', key, child.value);
      prev.push(child.value);
    });
  } else {
    console.log(
      'set',
      key,
      // require('util').inspect(children.value.value, { depth: 0 })
    );

    set(qmlObject, key, children.value.value);
  }
};

export const release = elem => {
  console.log('release', elem);
  elem.destroy();
};
