import { inspect } from 'util';
import Anchor, {
  AnchorRef,
  isAnchorProp,
  AnchorRefProp,
  ParentAnchor,
} from '../common/Anchor';
import QmlElementContainerImpl, {
  QmlElementContainer,
} from './QmlElementContainer';
import AppRegistry from '../common/AppRegistry';

// global Qt object
export declare const Qt: Qml.QmlQt;

// QML signal handler convention
const qmlSignalRegex = /^on([A-Z][a-zA-Z]+)$/;

type EventHandler = () => void;
type BasicProps = { [key: string]: any };

function listenTo(
  qmlElement: Qml.QmlElement,
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
  qmlElement: Qml.QmlElement,
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

const FONT_PROPS_MAP: BasicProps = {
  fontSize: 'pointSize',
  fontPixelSize: 'pixelSize',
  fontWeight: 'weight',
  fontFamily: 'family',
};

// handle anchor ref
function handleAnchorRef(
  qmlElement: Qml.QmlElement,
  lastRef: Anchor | null,
  nextRef: Anchor | null
) {
  // TODO: handle last ref
  if (nextRef) {
    nextRef.setQmlElement(qmlElement);
  }
}

function handleStyle(
  qmlElement: Qml.QmlElement,
  lastStyle: BasicProps | null,
  nextStyle: BasicProps | null
) {
  // last style
  if (lastStyle) {
    for (let styleName in lastStyle) {
      if (qmlElement.hasOwnProperty(styleName)) {
        if (nextStyle && nextStyle[styleName]) {
          // do nothing, will be set in next style anyway
          continue;
        }

        // otherwise, unset
        try {
          qmlElement[styleName] = undefined;
        } catch (error) {
          console.log(
            'cannot unset style',
            styleName,
            lastStyle[styleName],
            typeof qmlElement[styleName]
          );
        }
      }
    }
  }

  // next style
  if (nextStyle) {
    for (let styleName in nextStyle) {
      if (styleName.indexOf('font') === 0) {
        const fontProp = FONT_PROPS_MAP[styleName];
        qmlElement.font[fontProp] = nextStyle[styleName];
      } else {
        if (qmlElement.hasOwnProperty(styleName)) {
          qmlElement[styleName] = nextStyle[styleName];
        }
      }
    }
  }
}

function setInitialProps(qmlElement: Qml.QmlElement, props: BasicProps) {
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

    // style handling
    if (propKey === 'style') {
      handleStyle(qmlElement, null, propValue);
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
  qmlElement: Qml.QmlElement,
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
    const isEventProp = matches && lastProp !== nextProp;
    const isAnchorsProp = propKey === 'anchors';
    const isAnchorRefProp = propKey === 'anchorRef';
    const isStyleProp = propKey === 'style';

    if (isEventProp || isAnchorsProp || isAnchorRefProp || isStyleProp) {
      updatePayload.push(propKey, [lastProp, nextProp]);
      continue;
    }

    updatePayload.push(propKey, nextProp);
  }

  return updatePayload.length === 0 ? null : updatePayload;
}

// Apply the diff.
export function updateProps(
  qmlElement: Qml.QmlElement,
  updatePayload: Array<any>
) {
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

    // style handling
    if (propKey === 'style') {
      const [lastStyle, nextStyle] = propValue;
      handleStyle(qmlElement, lastStyle, nextStyle);
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
  rootContainerInstance: Qml.QmlElement,
  hostContext: QmlElementContainer
) {
  const hostElement = hostContext.element;
  const componentDefinition = AppRegistry.getComponent(type);
  if (componentDefinition) {
    const { component, metadata } = componentDefinition;
    const element = <Qml.QmlElement>component.createObject(hostElement, props);
    if (!element) {
      throw new Error(`Unable to create element: ${type}`);
    }
    setInitialProps(element, props);
    console.log('\n\n\nCreate new element');
    console.log(element, '\n\n\n');
    return new QmlElementContainerImpl(element, metadata);
  }

  // fall back to raw components
  const rawComponentDefinition = AppRegistry.getRawComponent(type);
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

function removeElementFromHostContext(element: Qml.QmlElement) {
  const hostData = hostElement.data;
  if (hostData && hostData.indexOf) {
    const childIndex = hostData.indexOf(element);
    if (childIndex > -1) {
      hostData.splice(childIndex, 1);
    }
  }
}

function isAnimation(obj: any) {
  const isQtObject = Qt.isQtObject(obj);
  const objType = getObjectType(obj);
  const isAnimationType =
    objType === 'QQuickColorAnimation' ||
    objType === 'QQuickNumberAnimation' ||
    objType === 'QQuickPropertyAnimation' ||
    objType === 'Vector3dAnimation' ||
    objType === 'RotationAnimation' ||
    objType === 'AnchorAnimation' ||
    objType === 'ParentAnimation ' ||
    objType === 'QQuickSmoothedAnimation' ||
    objType === 'QQuickSpringAnimation';
  return isQtObject && isAnimationType;
}

// turned out, appending child in qml is not as simple as setting prop `.parent`
// - if both parent and child are Item, simply setting parent would do
// - otherwise, we can append child to parent's default prop (eg: parent.data)
//   in special cases we don't need to do anything (eg: child is an instance of Window)
function appendChildElement(
  parent: Qml.QmlElement,
  child: Qml.QmlElement,
  parentDefaultProp: string = 'data'
) {
  removeElementFromHostContext(child);

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

  // - set animation's target to parent, if not specified
  if (isAnimation(child) && !isAnimation(parent)) {
    child.target = parent;
  }

  if (isQuickItem(parent) && isQuickItem(child)) {
    console.log('child.parent=');
    child.parent = parent;
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
  container: Qml.QmlElement,
  childContainer: QmlElementContainer
) {
  const child = childContainer.element;
  appendChildElement(container, child);
}

function removeChildElement(
  parent: Qml.QmlElement,
  child: Qml.QmlElement,
  parentDefaultProp: string = 'data'
) {
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
  container: Qml.QmlElement,
  childContainer: QmlElementContainer
) {
  removeChildElement(container, childContainer.element);
}

export function removeAllChildren(
  parent: Qml.QmlElement,
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

function findChildIndex(parentData: any, child: Qml.QmlElement) {
  for (let index = 0; index < parentData.length; index++) {
    const element = parentData[index];
    if (element === child) {
      return index;
    }
  }

  return -1;
}

function moveChild(parentData: any, fromIndex: number, toIndex: number) {
  if (fromIndex < 0 || fromIndex >= parentData.length) {
    throw new Error('Out of range: fromIndex');
  }
  if (toIndex < 0 || toIndex >= parentData.length) {
    throw new Error('Out of range: toIndex');
  }

  const child = parentData[fromIndex];
  if (fromIndex < toIndex) {
    let index = fromIndex;
    while (index < toIndex) {
      parentData[index] = parentData[index + 1];
      index++;
    }
    parentData[toIndex] = child;
  } else {
    let index = fromIndex;
    while (index > toIndex) {
      parentData[index] = parentData[index - 1];
      index--;
    }
    parentData[toIndex] = child;
  }
  parentData[toIndex].z = 10;
}

function insertBeforeElement(
  parent: Qml.QmlElement,
  child: Qml.QmlElement,
  beforeChild: Qml.QmlElement,
  parentDefaultProp: string = 'data'
) {
  const parentData = parent[parentDefaultProp];
  if (parentData) {
    // there is no indexOf, sad
    // @see https://stackoverflow.com/questions/43030433/qtquick-item-children-indexof-doesnt-exist
    const childIndex = findChildIndex(parentData, child);
    const beforeChildIndex = findChildIndex(parentData, beforeChild);

    // Move existing child or add new child?
    if (childIndex >= 0) {
      // move from childIndex to beforeChildIndex
      // moveChild(parentData, childIndex, beforeChildIndex);
    } else {
      // insert child into beforeChildIndex first
      appendChildElement(parent, child, parentDefaultProp);
      // then move
      // moveChild(parentData, parentData.length - 1, beforeChildIndex);
    }
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
  container: Qml.QmlElement,
  childContainer: QmlElementContainer,
  beforeChildContainer: QmlElementContainer
) {
  const child = childContainer.element;
  const beforeChild = beforeChildContainer.element;
  insertBeforeElement(container, child, beforeChild);
}
