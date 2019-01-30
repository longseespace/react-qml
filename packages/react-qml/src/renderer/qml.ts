import { inspect } from 'util';
import registry, { RegistryComponentMetadata } from './registry';
import Anchor, {
  AnchorRef,
  isAnchorProp,
  AnchorRefProp,
  ParentAnchor,
} from './anchor';
import {
  QmlQt,
  QmlElement,
  BasicProps,
  QmlElementContainer,
  QmlElementMeasureCallback,
} from './qmlTypes';
import { Props } from 'react';
import QmlElementContainerImpl from './QmlElementContainer';

// global Qt object
export declare const Qt: QmlQt;

// anchor lines

// QML signal handler convention
const qmlSignalRegex = /^on([A-Z][a-zA-Z]+)$/;

type EventHandler = () => void;

function listenTo(
  qmlElement: QmlElement,
  eventName: string,
  nextHandler: EventHandler | null,
  lastHandler: EventHandler | null
) {
  eventName = eventName[0].toLowerCase() + eventName.substring(1);
  console.log('listenTo', qmlElement, eventName, nextHandler);

  if (!qmlElement[eventName]) {
    console.warn(`Event "${eventName}" not found in ${qmlElement}`);
    return;
  }

  if (lastHandler) {
    qmlElement[eventName].disconnect(lastHandler);
  }

  if (nextHandler) {
    qmlElement[eventName].connect(nextHandler);
  }
}

// handle connections
function handleAnchors(
  qmlElement: QmlElement,
  lastAnchors: BasicProps | null,
  nextAnchors: BasicProps | null
) {
  // last anchors
  for (const propName in lastAnchors) {
    if (lastAnchors.hasOwnProperty(propName)) {
      if (isAnchorProp(propName)) {
        const anchorRef: AnchorRef | string = lastAnchors[propName];
        if (typeof anchorRef === 'string') {
          ParentAnchor.removeSubscription(qmlElement, <AnchorRefProp>propName);
          qmlElement.anchors[propName] = undefined;
          continue;
        }
        if (anchorRef) {
          anchorRef.removeSubscription(qmlElement, <AnchorRefProp>propName);
        }
        // unset anchor
        qmlElement.anchors[propName] = undefined;
      }
    }
  }
  // next anchors
  for (const propName in nextAnchors) {
    if (nextAnchors.hasOwnProperty(propName)) {
      if (isAnchorProp(propName)) {
        const anchorRef: AnchorRef | string = nextAnchors[propName];
        if (typeof anchorRef === 'string') {
          ParentAnchor.addSubscription(
            qmlElement,
            <AnchorRefProp>propName,
            anchorRef
          );
          continue;
        }
        if (anchorRef) {
          // anchor, set value when anchor ready
          anchorRef.addSubscription(qmlElement, <AnchorRefProp>propName);
        } else {
          // unset anchor
          qmlElement.anchors[propName] = undefined;
        }
      } else {
        // primitive, set values right away
        const propValue = nextAnchors[propName];
        qmlElement.anchors[propName] = propValue;
      }
    }
  }
}

// handle anchor ref
function handleAnchorRef(
  qmlElement: QmlElement,
  lastRef: Anchor | null,
  nextRef: Anchor | null
) {
  // TODO: handle last ref
  if (nextRef) {
    nextRef.setQmlElement(qmlElement);
  }
}

function setInitialProps(qmlElement: QmlElement, props: BasicProps) {
  for (const propKey in props) {
    const propValue = props[propKey];

    if (propKey === 'children' || propValue == null) {
      // ignore
      continue;
    }

    // event handling
    const matches = propKey.match(qmlSignalRegex);
    if (matches) {
      const eventName = matches[1];
      listenTo(qmlElement, eventName, propValue, null);
      continue;
    }

    // anchor ref
    if (propKey === 'anchorRef') {
      handleAnchorRef(qmlElement, null, propValue);
      continue;
    }

    // anchors handling
    if (propKey === 'anchors') {
      handleAnchors(qmlElement, null, propValue);
      continue;
    }

    // attached property
    if (
      typeof propValue === 'object' &&
      typeof qmlElement[propKey] === 'object'
    ) {
      console.log('setInitialProps', propKey);
      console.log(
        inspect(propValue, {
          depth: 1,
        })
      );

      if (qmlElement[propKey]) {
        Object.assign(qmlElement[propKey], propValue);
      }
      continue;
    }

    if (!qmlElement.hasOwnProperty(propKey)) {
      console.warn(`Cannot assign to non-existent property "${propKey}"`);
      continue;
    }

    qmlElement[propKey] = propValue;
  }
}

// Calculate the diff between the two objects.
export function diffProps(
  qmlElement: QmlElement,
  lastProps: BasicProps,
  nextProps: BasicProps
): Array<any> | null {
  let updatePayload: Array<any> = [];

  // phase 1: look for deleted props
  for (let propKey in lastProps) {
    if (
      lastProps[propKey] == null ||
      !lastProps.hasOwnProperty(propKey) ||
      nextProps.hasOwnProperty(propKey)
    ) {
      continue;
    }

    updatePayload.push(propKey, null);
  }

  // phase 2: look for actual changes
  for (let propKey in nextProps) {
    const nextProp = nextProps[propKey];
    const lastProp = lastProps != null ? lastProps[propKey] : undefined;

    if (
      !nextProps.hasOwnProperty(propKey) ||
      nextProp === lastProp ||
      (nextProp == null && lastProp == null)
    ) {
      continue;
    }

    // event handling
    const matches = propKey.match(qmlSignalRegex);
    if (matches && lastProp !== nextProp) {
      updatePayload.push(propKey, [lastProp, nextProp]);
      continue;
    }

    // anchors handling
    if (propKey === 'anchors' || propKey === 'anchorRef') {
      updatePayload.push(propKey, [lastProp, nextProp]);
      continue;
    }

    updatePayload.push(propKey, nextProp);
  }

  return updatePayload.length === 0 ? null : updatePayload;
}

// Apply the diff.
export function updateProps(qmlElement: QmlElement, updatePayload: Array<any>) {
  for (let i = 0; i < updatePayload.length; i += 2) {
    const propKey = updatePayload[i];
    const propValue = updatePayload[i + 1];

    // ignore the children
    if (propKey === 'children') {
      continue;
    }

    // event handling
    const matches = propKey.match(qmlSignalRegex);
    if (matches) {
      const eventName = matches[1];
      const [lastHandler, nextHandler] = propValue;
      listenTo(qmlElement, eventName, nextHandler, lastHandler);
      continue;
    }

    // anchor ref
    if (propKey === 'anchorRef') {
      const [lastRef, nextRef] = propValue;
      handleAnchorRef(qmlElement, lastRef, nextRef);
      continue;
    }

    // anchors handling
    if (propKey === 'anchors') {
      const [lastAnchors, nextAnchors] = propValue;
      handleAnchors(qmlElement, lastAnchors, nextAnchors);
      continue;
    }

    // attached property
    if (
      typeof propValue === 'object' &&
      typeof qmlElement[propKey] === 'object'
    ) {
      console.log('updateProps', propKey);
      console.log(
        inspect(propValue, {
          depth: 1,
        })
      );

      if (qmlElement[propKey]) {
        Object.assign(qmlElement[propKey], propValue);
      }

      continue;
    }

    if (!qmlElement.hasOwnProperty(propKey)) {
      console.warn(`Cannot assign to non-existent property "${propKey}"`);
      continue;
    }

    qmlElement[propKey] = propValue;
  }
}

// we need a TempRoot when rendering React tree
// the old method (create element as direct child of rootContainerInstance)
// is not working when error happended
function createHostContext() {
  const qml = `import QtQuick 2.7; Item { visible: false; }`;
  return Qt.createQmlObject(qml, Qt.application, 'HostContext');
}

export const hostElement = createHostContext();

// Create new QmlElementContainer
export function createElementContainer(
  type: string,
  props: BasicProps,
  rootContainerInstance: QmlElement,
  hostContext: QmlElementContainer
) {
  const hostElement = hostContext.element;
  const componentDefinition = registry.getComponent(type);
  if (componentDefinition) {
    const { component, metadata } = componentDefinition;
    const element = <QmlElement>component.createObject(hostElement, {});
    setInitialProps(element, props);
    console.log('\n\n\nCreate new element');
    console.log(element, '\n\n\n');
    return new QmlElementContainerImpl(element, metadata);
  }

  // fall back to raw components
  const rawComponentDefinition = registry.getRawComponent(type);
  if (rawComponentDefinition) {
    const { rawContent, metadata } = rawComponentDefinition;
    const element = Qt.createQmlObject(rawContent, hostElement, type);
    setInitialProps(element, props);
    console.log('\n\n\nCreate new element');
    console.log(element, '\n\n\n');

    return new QmlElementContainerImpl(element, metadata);
  }

  throw new Error(`Unknown type ${type}`);
}

// TODO: revise this later
function isQuickItem(obj: any) {
  const isQtObject = Qt.isQtObject(obj);
  const hasChildAtMethod = typeof obj.childAt === 'function';
  const hasParentProp = obj.hasOwnProperty('parent');
  const hasDataProp = obj.hasOwnProperty('data');
  return isQtObject && hasChildAtMethod && hasParentProp && hasDataProp;
}

function isWindow(obj: any) {
  const isQtObject = Qt.isQtObject(obj);
  const hasWindowMethods =
    typeof obj.showMinimized === 'function' &&
    typeof obj.showMaximized === 'function' &&
    typeof obj.showFullScreen === 'function';
  return isQtObject && hasWindowMethods;
}

function getObjectType(obj: object): string {
  if (!Qt.isQtObject(obj)) {
    return '';
  }
  // debug name is in the form of QObjectType(memory_address);
  // we need to remove the memory address part
  const debugName = obj.toString();
  return debugName.replace(/\(.+\)/, '');
}

function canSetParent(obj: any) {
  const isQtObject = Qt.isQtObject(obj);
  const hasParentProp = obj.hasOwnProperty('parent');
  return isQtObject && hasParentProp;
}

function removeElementFromHostContext(element: QmlElement) {
  const hostData = hostElement.data;
  if (hostData && hostData.indexOf) {
    const childIndex = hostData.indexOf(element);
    if (childIndex > -1) {
      hostData.splice(childIndex, 1);
    }
  }
}

// turned out, appending child in qml is not as simple as setting prop `.parent`
// - if both parent and child are Item, simply setting parent would do
// - otherwise, we can append child to parent's default prop (eg: parent.data)
//   in special cases we don't need to do anything (eg: child is an instance of Window)
function appendChildElement(
  parent: QmlElement,
  child: QmlElement,
  parentDefaultProp: string = 'data'
) {
  removeElementFromHostContext(child);

  if (isQuickItem(parent) && isQuickItem(child)) {
    console.log('child.parent=');
    child.parent = parent;
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

  // append child to parent's default prop
  const parentData = parent[parentDefaultProp];
  if (parentData && parentData.push) {
    parentData.push(child);
  }
}

export function appendChild(
  parentContainer: QmlElementContainer,
  childContainer: QmlElementContainer
) {
  const parent = parentContainer.element;
  const child = childContainer.element;
  appendChildElement(parent, child, parentContainer.metadata.defaultProp);
}

export function appendChildToContainer(
  container: QmlElement,
  childContainer: QmlElementContainer
) {
  const child = childContainer.element;
  appendChildElement(container, child);
}

function removeChildElement(
  parent: QmlElement,
  child: QmlElement,
  parentDefaultProp: string = 'data'
) {
  if (isQuickItem(parent) && isQuickItem(child)) {
    child.parent = null;
    console.log('removeChildElement', parent, child);
  } else {
    const parentData = parent[parentDefaultProp];
    if (parentData && parentData.indexOf) {
      const childIndex = parentData.indexOf(child);
      if (childIndex > -1) {
        parent[parentDefaultProp].splice(childIndex, 1);
        console.log(
          'removeChildElement',
          parent,
          'children length = ',
          parentData.length
        );
      }
    }
  }
  child.destroy();
}

export function removeChild(
  parentContainer: QmlElementContainer,
  childContainer: QmlElementContainer
) {
  const parent = parentContainer.element;
  const child = childContainer.element;
  removeChildElement(parent, child, parentContainer.metadata.defaultProp);
}

export function removeChildFromContainer(
  container: QmlElement,
  childContainer: QmlElementContainer
) {
  removeChildElement(container, childContainer.element);
}

export function removeAllChildren(
  parent: QmlElement,
  defaultProp: string = 'data'
) {
  const data = parent[defaultProp];
  console.log('removeAllChildren', parent, 'children length = ', data.length);
  if (data && data.length > 0) {
    // destroy all children
    for (let index = data.length; index > 0; index--) {
      const child = data[index - 1];
      removeChildElement(parent, child);
    }

    console.log('children no = ', data.length);
  }
}

function insertBeforeElement(
  parent: QmlElement,
  child: QmlElement,
  beforeChild: QmlElement,
  parentDefaultProp: string = 'data'
) {
  const parentData = parent[parentDefaultProp];
  if (parentData && parentData.indexOf) {
    const childIndex = parentData.indexOf(child);

    // Move existing child or add new child?
    if (childIndex >= 0) {
      parentData.splice(childIndex, 1);
    }
    const beforeChildIndex = parentData.indexOf(beforeChild);
    parentData.splice(beforeChildIndex, 0, child);
  }
}

export function insertBefore(
  parentContainer: QmlElementContainer,
  childContainer: QmlElementContainer,
  beforeChildContainer: QmlElementContainer
) {
  const parent = parentContainer.element;
  const child = childContainer.element;
  const beforeChild = beforeChildContainer.element;
  insertBeforeElement(
    parent,
    child,
    beforeChild,
    parentContainer.metadata.defaultProp
  );
}

export function insertInContainerBefore(
  container: QmlElement,
  childContainer: QmlElementContainer,
  beforeChildContainer: QmlElementContainer
) {
  const child = childContainer.element;
  const beforeChild = beforeChildContainer.element;
  insertBeforeElement(container, child, beforeChild);
}
