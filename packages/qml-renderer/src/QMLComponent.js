import { setChildren } from './object-factory';

const isEventRegex = /^on([A-Z][a-zA-Z]+)$/;
const entries = require('lodash/entries');
const keys = require('lodash/keys');

import { Registry, registerNativeComponentClass } from './Registry';

function listenTo(qmlElement, eventName, value, lastValue) {
  eventName = eventName[0].toLowerCase() + eventName.substring(1);
  console.log('listenTo', qmlElement, eventName, value);

  if (!qmlElement[eventName]) {
    console.warn(`Event "${eventName}" not found in ${qmlElement}`);
    return;
  }

  if (lastValue) {
    qmlElement[eventName].disconnect(lastValue);
  }

  qmlElement[eventName].connect(value);
}

export function setInitialProps(qmlElement, nextProps) {
  console.log('setInitialProps ');
  console.log('  qmlElement', qmlElement);
  console.debug(
    '  nextProps',
    require('util').inspect(nextProps, { depth: 0, colors: true })
  );

  entries(nextProps).forEach(([propKey, propValue]) => {
    if (propKey === 'children' || propValue == null) {
      // ignore
      return;
    }

    if (propKey === '__qmlRawContent') {
      return;
    }

    if (propKey.match(isEventRegex)) {
      const match = propKey.match(isEventRegex);
      listenTo(qmlElement, match[1], propValue, null);
      return;
    }

    if (typeof propValue === 'object') {
      if (!qmlElement[propKey]) {
        console.warn(`Cannot assign to non-existent property "${propKey}"`);
        return;
      }

      entries(propValue).forEach(([configKey, configValue]) => {
        qmlElement[propKey][configKey] = configValue;
      });
      return;
    }

    qmlElement[propKey] = propValue;
  });
}

export function diffProps(qmlElement, lastProps, nextProps) {
  let updatePayload = null;

  let add = (k, v) => {
    if (!updatePayload) updatePayload = [];
    updatePayload.push([k, v]);
  };

  for (let propKey in keys(lastProps)) {
    if (lastProps[propKey] == null || nextProps.hasOwnProperty(propKey)) {
      continue;
    } else if (propKey.match(isEventRegex)) {
      updatePayload = updatePayload || [];
    }
  }

  entries(nextProps).forEach(([propKey, nextProp]) => {
    const lastProp = lastProps[propKey];

    if (
      nextProp === lastProp ||
      propKey === 'style' ||
      (nextProp == null && lastProp == null)
    ) {
      return;
    } else if (propKey === 'children' && lastProp !== nextProp) {
      add(propKey, nextProp);
    } else if (propKey.match(isEventRegex) && lastProp !== nextProp) {
      // we need the last event handler so we can remove it in the commit phase
      add(propKey, [lastProp, nextProp]);
    } else {
      // For any other property we always add it to the queue and then we
      // filter it out using the whitelist during the commit.
      add(propKey, nextProp);
    }
  });

  return updatePayload;
}

export function updateProps(element, updateQueue) {
  const qmlElement = element.value;

  updateQueue.forEach(([propKey, propValue]) => {
    if (propValue == null || propKey === '__qmlRawContent') {
      // ignore
      return;
    }

    if (propKey === 'children') {
      element.children = propValue;
      return;
      // const { defaultProp } = element;
      // console.log(require('util').inspect(propValue, { depth: 1, colors: true }));
      // setChildren(qmlElement, defaultProp, propValue);
      // return;
    }

    if (propKey.match(isEventRegex)) {
      const match = propKey.match(isEventRegex);
      let [lastHandler, nextHandler] = propValue;
      listenTo(qmlElement, match[1], nextHandler, lastHandler);
      return;
    }

    if (typeof propValue === 'object') {
      if (qmlElement[propKey]) {
        entries(propValue).forEach(([configKey, configValue]) => {
          qmlElement[propKey][configKey] = configValue;
        });
      }

      return;
    }

    qmlElement[propKey] = propValue;
  });
}
