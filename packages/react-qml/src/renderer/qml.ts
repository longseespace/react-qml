import { inspect } from 'util';
import registry from './registry';
import Anchor, {
  AnchorRef,
  isAnchorProp,
  AnchorRefProp,
  ParentAnchor,
} from './anchor';

// Interface to Qt global object
export interface QmlQt {
  createComponent: (source: string) => QmlComponent;
  createQmlObject: (
    qml: string,
    parent: QmlElement | null,
    filepath?: string
  ) => QmlElement;
  application: any;
}

// global Qt object
export declare const Qt: QmlQt;

// Interface to native QmlObject
// ie: object created by Qt.createQmlObject() or component.createObject()
export interface QmlObject {
  destroy: (delay?: number) => void;
}

type SignalHandler = () => any;

// Interface to Qml Signal
export interface QmlSignal {
  connect: (handler: SignalHandler) => void;
  disconnect: (handler: SignalHandler) => void;
}

// Interface to native QmlComponent
// ie: object created by Qt.createComponent()
export interface QmlComponent {
  createObject(rootContainerInstance: QmlObject, props: object): QmlObject;
  status: any;
  statusChanged: QmlSignal;
  errorString: () => string;
}

// Basic (key => value) object
export type Props = { [key: string]: any };

type QmlQuickItem = {
  parent: QmlElement | null;
  left?: any;
  top?: any;
  right?: any;
  bottom?: any;
  horizontalCenter?: any;
  verticalCenter?: any;
  baseline?: any;
};

// QmlElement is basically QmlQuickItem, plus dynamic props
export type QmlElement = QmlObject & QmlQuickItem & Props;
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
  lastAnchors: Props | null,
  nextAnchors: Props | null
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

function setInitialProps(qmlElement: QmlElement, props: Props) {
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
  lastProps: Props,
  nextProps: Props
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
export function createHostContext() {
  const qml = `import QtQuick 2.7; Item { visible: false; }`;
  return Qt.createQmlObject(qml, Qt.application, 'HostContext');
}

// Create new QmlElement
export function createElement(
  type: string,
  props: Props,
  rootContainerInstance: QmlElement,
  hostContext: QmlElement
) {
  const componentDefinition = registry.getComponent(type);
  if (componentDefinition) {
    const { component } = componentDefinition;
    const element = component.createObject(hostContext, {});
    setInitialProps(element, props);
    console.log('\n\n\nCreate new element');
    console.log(element, '\n\n\n');
    return element;
  }

  // fall back to raw components
  const rawComponentDefinition = registry.getRawComponent(type);
  if (rawComponentDefinition) {
    const { rawContent } = rawComponentDefinition;
    const element = Qt.createQmlObject(rawContent, hostContext, type);
    setInitialProps(element, props);
    console.log('\n\n\nCreate new element');
    console.log(element, '\n\n\n');
    return element;
  }

  throw new Error(`Unknown type ${type}`);
}

// TODO: revise this later
function isQuickItem(obj: any) {
  const isObject = typeof obj === 'object';
  const hasChildAtMethod = typeof obj.childAt === 'function';
  return isObject && hasChildAtMethod;
}

function isWindow(obj: any) {
  const isObject = typeof obj === 'object';
  const hasWindowMethods =
    typeof obj.showMinimized === 'function' &&
    typeof obj.showMaximized === 'function' &&
    typeof obj.showFullScreen === 'function';
  return isObject && hasWindowMethods;
}

// turned out, appending child in qml is not as simple as setting prop `.parent`
// - if both parent and child are Item, simply setting parent would do
// - otherwise, we can append child to parent's default prop (eg: parent.data)
//   in special cases we don't need to do anything (eg: child is an instance of Window)
export function appendChild(parent: QmlElement, child: QmlElement) {
  if (isQuickItem(parent) && isQuickItem(child)) {
    child.parent = parent;
  } else {
    if (parent.data) {
      parent.data.push(child);
    }
  }
}

export function removeChild(parent: QmlElement, child: QmlElement) {
  if (isQuickItem(parent) && isQuickItem(child)) {
    child.parent = parent;
  } else {
    if (parent.data) {
      parent.data.push(child);
    }
  }
  child.destroy();
}
