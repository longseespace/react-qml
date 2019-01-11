import { inspect } from 'util';
import registry from './registry';
import Anchor, { AnchorRef, isAnchorProp, AnchorRefProp } from './anchor';

// Interface to Qt global object
export interface QmlQt {
  createComponent: (source: string) => QmlComponent;
}

// Interface to native QmlObject
// ie: object created by Qt.createQmlObject() or component.createObject()
export interface QmlObject {
  parent: QmlObject | null;
  destroy: () => void;
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

// QmlElement is basically QmlObject, plus dynamic props
export type QmlElement = QmlObject & Props;

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
  } else {
    qmlElement[eventName].disconnect(nextHandler);
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
        const anchorRef: AnchorRef = lastAnchors[propName];
        anchorRef.removeSubscription(qmlElement, <AnchorRefProp>propName);
      }
    }
  }
  // next anchors
  for (const propName in nextAnchors) {
    if (nextAnchors.hasOwnProperty(propName)) {
      if (isAnchorProp(propName)) {
        // anchor, set value when anchor ready
        const anchorRef: AnchorRef = nextAnchors[propName];
        anchorRef.addSubscription(qmlElement, <AnchorRefProp>propName);
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
      return;
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

// Create new QmlElement
export function createElement(
  type: string,
  props: Props,
  rootContainerInstance: QmlElement
) {
  const componentDefinition = registry.getComponent(type);
  if (componentDefinition) {
    console.log('Create new element');
    const { component } = componentDefinition;
    const element = component.createObject(rootContainerInstance, {});
    setInitialProps(element, props);
    return element;
  }

  throw new Error(`Unknown type ${type}`);
}
