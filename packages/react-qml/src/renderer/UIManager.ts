import RQElementContainer from './RQElementContainer';
import AppRegistry from '../common/AppRegistry';
import {
  isAnimation,
  isQuickItem,
  getObjectType,
  findChildIndex,
  isWindow,
  findModelChildIndex,
} from './utils';
import { QQmlObjectModel } from '../components/QtQuick';

const contextRoots = new Map<RQElementContainer, RQElementContainer>();

declare const Qt: Qml.QmlQt;
const createHostContext = (rootContainerInstance: RQElementContainer) => {
  const qml = `import QtQuick 2.7; Item { visible: false; }`;
  const fakeRoot = Qt.createQmlObject(
    qml,
    rootContainerInstance.element,
    'HostContext'
  );
  fakeRoot.objectName = 'HostContext';
  return new RQElementContainer(fakeRoot, {
    defaultProp: 'data',
  });
};

function getHostContext(rootContainerInstance: RQElementContainer) {
  let rootContext = contextRoots.get(rootContainerInstance);
  if (!rootContext) {
    rootContext = createHostContext(rootContainerInstance);
    contextRoots.set(rootContainerInstance, rootContext);
  }

  return rootContext;
}

function createElementContainer(
  type: string,
  props: object,
  rootContainerInstance: RQElementContainer,
  hostContext: RQElementContainer
): RQElementContainer {
  const hostElement = hostContext.element;

  const rawComponentDefinition = AppRegistry.getRawComponent(type);
  if (rawComponentDefinition) {
    const { rawContent, metadata } = rawComponentDefinition;
    const element = Qt.createQmlObject(rawContent, hostElement, type);
    const container = new RQElementContainer(element, metadata, hostContext);
    container.setNativeProps(props);
    console.log('\n\n\nCreate new element');
    console.log(element, '\n\n\n');

    console.log('DEBUG OBJECT CREATE ', element);

    return container;
  }

  const componentDefinition = AppRegistry.getComponent(type);
  if (componentDefinition) {
    const { component, metadata } = componentDefinition;
    const element = <Qml.QmlElement>component.createObject(hostElement, props);
    if (!element) {
      throw new Error(`Unable to create element: ${type}`);
    }
    const container = new RQElementContainer(element, metadata, hostContext);
    container.setNativeProps(props);
    console.log('\n\n\nCreate new element');
    console.log(element, '\n\n\n');

    console.log('DEBUG OBJECT CREATE ', element);

    return container;
  }

  throw new Error(`Unknown type ${type}`);
}

function appendChild(
  parentContainer: RQElementContainer,
  childContainer: RQElementContainer
) {
  const parent = parentContainer.element;
  const child = childContainer.element;

  // appending new child or just moving around?
  const moving =
    findChildIndex(parent[parentContainer.metadata.defaultProp], child) > -1;

  if (moving && child.parent && parent.children) {
    // moving only applied for visual items
    const childIndex = findChildIndex(parent.children, child);
    moveChild(parentContainer, childIndex, parent.children.length - 1);
    return;
  }

  const parentType = getObjectType(parent);
  const childType = getObjectType(child);

  // special cases
  // - add MenuBar to ApplicationWindow
  if (
    childType === 'QQuickMenuBar' &&
    parentType === 'QQuickApplicationWindow'
  ) {
    parent.menuBar = child;
    return;
  }

  // - sync QQuickPlatformMenu
  if (
    childType === 'QQuickPlatformMenu' &&
    parentType === 'QQuickPlatformMenuBar'
  ) {
    parent.addMenu(child);
    // this is a hack to "sync" menu
    child.visible = false;
    child.visible = true;
    return;
  }

  // - QQuickPlatformMenuBar requires manually setting window
  if (childType === 'QQuickPlatformMenuBar' && isWindow(parent)) {
    child.window = parent;
  }

  // - set animation's target to parent, if not specified
  if (isAnimation(child) && !isAnimation(parent) && isQuickItem(parent)) {
    child.target = parent;
  }

  if (parent.contentItem && child.hasOwnProperty('parent')) {
    try {
      child.parent = parent.contentItem;
    } catch (ex) {
      // child.parent = parent;
    }
  } else {
    if (isQuickItem(parent) && isQuickItem(child)) {
      console.log('child.parent=parent', parentType);
      child.parent = parent;
    }
  }

  // append child to parent's default prop
  const parentDefaultProp = parentContainer.metadata.defaultProp;
  const parentData = parent[parentDefaultProp];
  if (parentData && parentData.push) {
    parentData.push(child);
  }
}

function removeAllChildren(rootContext: RQElementContainer) {
  const { defaultProp } = rootContext.metadata;
  const data = rootContext.element[defaultProp];
  if (data && data.length > 0) {
    // destroy all children
    for (let index = data.length; index > 0; index--) {
      const child = data[index - 1];
      removeChildElement(rootContext, child);
    }

    console.log('children no = ', data.length);
  }
}

function removeChild(
  parentContainer: RQElementContainer,
  childContainer: RQElementContainer
) {
  return removeChildElement(parentContainer, childContainer.element);
}

function removeChildElement(
  parentContainer: RQElementContainer,
  child: Qml.QmlElement
) {
  const parent = parentContainer.element;
  const parentDefaultProp = parentContainer.metadata.defaultProp;

  const parentType = getObjectType(parent);
  const childType = getObjectType(child);

  console.log('parentType', parentType);
  console.log('childType', childType);

  if (isQuickItem(parent) && isQuickItem(child)) {
    child.parent = null;
    console.log('removeChildElement', parent, child);
  } else {
    console.log('herereree');
    const parentData = parent[parentDefaultProp];
    if (parentData) {
      const childIndex = findChildIndex(parentData, child);
      if (childIndex > -1) {
        if (parent.remove) {
          parent.remove(childIndex);
          console.log(
            'removeChildElement',
            parent,
            'children length = ',
            parentData.length
          );
        } else {
          console.log('bo tay');
          // parent[parentDefaultProp].splice(childIndex, 1);
        }
      }
    }
  }

  child.destroy(1);
  console.log('DEBUG OBJECT DESTROY', child);
}

function moveChild(
  parent: RQElementContainer,
  fromIndex: number,
  toIndex: number
) {
  const parentType = getObjectType(parent.element);
  if (parentType === 'QQmlObjectModel') {
    const model = parent.element as QQmlObjectModel;
    model.move(fromIndex, toIndex);
    return;
  }

  const children = parent.element.children;
  if (!children) {
    console.warn("Move child doesn't work with non-visual items");
    return;
  }

  const collection = [];

  for (let i = 0; i < children.length; i++) {
    collection.push(children[i]);
  }

  const sourceItem = collection[fromIndex];

  collection.splice(fromIndex, 1);
  collection.splice(toIndex, 0, sourceItem);
  for (let i = children.length - 1; i >= 0; i--) {
    children[i].parent = null;
  }

  for (let i = 0; i < collection.length; i++) {
    children[i] = collection[i];
    children[i].parent = parent.element;
  }
}

function insertBefore(
  parent: RQElementContainer,
  child: RQElementContainer,
  beforeChild: RQElementContainer
) {
  const parentType = getObjectType(parent.element);
  if (parentType === 'QQmlObjectModel') {
    const model = parent.element as QQmlObjectModel;
    const childIndex = findModelChildIndex(model, child.element);
    const beforeChildIndex = findModelChildIndex(model, beforeChild.element);

    // Move existing child or add new child?
    if (childIndex >= 0) {
      // move from childIndex to beforeChildIndex-1
      moveChild(parent, childIndex, beforeChildIndex);
    } else {
      // insert child into beforeChildIndex first
      appendChild(parent, child);
      // then move
      moveChild(parent, model.count - 1, beforeChildIndex);
    }

    return;
  }

  const children = parent.element.children;
  if (!children) {
    console.warn("Move child doesn't work with non-visual items");
    return;
  }

  // there is no indexOf for qml list, sad
  // @see https://stackoverflow.com/questions/43030433/qtquick-item-children-indexof-doesnt-exist
  const childIndex = findChildIndex(children, child.element);
  const beforeChildIndex = findChildIndex(children, beforeChild.element);

  // Move existing child or add new child?
  if (childIndex >= 0) {
    // move from childIndex to beforeChildIndex-1
    moveChild(parent, childIndex, beforeChildIndex - 1);
  } else {
    // insert child into beforeChildIndex first
    appendChild(parent, child);
    // then move
    moveChild(parent, children.length - 1, beforeChildIndex - 1);
  }
}

const UIManager = {
  getHostContext,
  createElementContainer,
  appendChild,
  removeAllChildren,
  removeChild,
  insertBefore,
};

export default UIManager;
