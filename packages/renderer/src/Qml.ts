import { inspect } from 'util';
import registry from './registry';
import { OutgoingMessage } from 'http';

// Interface to native QmlObject
// ie: object created by Qt.createQmlObject() or component.createObject()
export interface QmlObject {
  parent: QmlObject | null;
  destroy: () => void;
}

// Interface to native QmlComponent
// ie: object created by Qt.createComponent()
export interface QmlComponent {
  createObject(rootContainerInstance: QmlObject, props: object): QmlObject;
}

// Basic (key => value) object
export type Props = { [key: string]: any };

// QmlElement is basically QmlObject, plus dynamic props
export type QmlElement = QmlObject & Props;

// QML signal handler convention
const qmlSignalRegex = /^on([A-Z][a-zA-Z]+)$/;

// Refer to `parent` in QML
export const PARENT = Symbol('parent');

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

    // attached property
    if (
      typeof propValue === 'object' &&
      typeof qmlElement[propKey] === 'object'
    ) {
      console.log('setInitialProps', propKey);
      console.log(inspect(propValue, { depth: 1 }));

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

    // attached property
    if (
      typeof propValue === 'object' &&
      typeof qmlElement[propKey] === 'object'
    ) {
      console.log('updateProps', propKey);
      console.log(inspect(propValue, { depth: 1 }));
      Object.assign(qmlElement[propKey], propValue);
      continue;
    }

    if (!qmlElement.hasOwnProperty(propKey)) {
      console.warn(`Cannot assign to non-existent property "${propKey}"`);
      continue;
    }

    qmlElement[propKey] = propValue;
  }
}
