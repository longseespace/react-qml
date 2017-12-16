let fakeRoot;
const getRoot = realRoot => {
  if (fakeRoot) {
    return fakeRoot;
  }

  console.log('creating fakeRoot ');
  fakeRoot = Qt.createQmlObject(
    'import QtQuick 2.7; Item { visible: false; }',
    realRoot,
    'FakeRoot'
  );
  return fakeRoot;
};

const ATTRIBUTE = 'ATTRIBUTE';
const ELEMENT = 'ELEMENT';

const createQmlObject = (qmlContent, rootElem, name) => {
  return Qt.createQmlObject(qmlContent, getRoot(rootElem), name);
};

export const makeAttributeNode = (name, value = null) => ({
  type: ATTRIBUTE,
  name,
  value,
});

export const makeElementNode = (name, defaultProp, qmlContent, rootElem) => ({
  type: ELEMENT,
  name,
  defaultProp,
  children: [],
  value: createQmlObject(qmlContent, rootElem, name),
});

export const isElement = obj => obj.type && obj.type === ELEMENT;
export const isAttribute = obj => obj.type && obj.type === ATTRIBUTE;

export const setChildren = (obj, key, children) => {
  obj[key].length = 0;
  children.forEach(child => {
    console.debug(obj, 'push', key, child.value);
    obj[key].push(child.value);
  });
};


export const release = (elem) => {
  elem.destroy();
}
