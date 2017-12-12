const isEventRegex = /^on([A-Z][a-zA-Z]+)$/;

function listenTo(qmlElement, eventName, value, lastValue) {
  eventName = eventName.toLowerCase();
  console.log('listenTo', qmlElement, eventName, value);

  if (!qmlElement[eventName]) {
    // TODO: warn
    return;
  }

  if (lastValue) {
    qmlElement[eventName].disconnect(lastValue);
  }

  qmlElement[eventName].connect(value);
}

export function setInitialProps(qmlElement, nextProps) {
  console.log('setInitialProps');
  console.log('  qmlElement', qmlElement);
  console.log(
    '  nextProps',
    require('util').inspect(nextProps, { depth: null, colors: true })
  );


  Object.entries(nextProps).forEach(([propKey, propValue]) => {
    if (
      propValue == null ||
      propKey === '__qmlRawContent'
    ) {
      // ignore
      return;
    }

    if (propKey === 'children') {
      qmlElement.data.length = 0;
      qmlElement.data.push(propValue);
      return;
    }

    if (propKey.match(isEventRegex)) {
      const match = propKey.match(isEventRegex);
      listenTo(qmlElement, match[1], propValue, null);
      return;
    }

    if (typeof propValue === 'object') {
      if (qmlElement[propKey]) {
        Object.entries(propValue).forEach(([configKey, configValue]) => {
          qmlElement[propKey][configKey] = configValue;
        });
      }
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

  for (let propKey in Object.keys(lastProps)) {
    if (lastProps[propKey] == null || nextProps.hasOwnProperty(propKey)) {
      continue;
    } else if (propKey.match(isEventRegex)) {
      updatePayload = updatePayload || [];
    }
  }

  for (let [propKey, nextProp] of Object.entries(nextProps)) {
    const lastProp = lastProps[propKey];

    if (
      nextProp === lastProp ||
      propKey === 'style' ||
      (nextProp == null && lastProp == null)
    ) {
      continue;
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
  }

  return updatePayload;
}

export function updateProps(qmlElement, updateQueue) {
  for (let [propKey, propValue] of updateQueue) {
    if (
      propValue == null ||
      propKey === '__qmlRawContent'
    ) {
      // ignore
      return;
    }

    if (propKey === 'children') {
      qmlElement.data.length = 0;
      qmlElement.data.push(propValue);
      return;
    }

    if (propKey.match(isEventRegex)) {
      const match = propKey.match(isEventRegex);
      let [lastHandler, nextHandler] = propValue;
      listenTo(qmlElement, match[1], nextHandler, lastHandler);
      return;
    }

    if (typeof propValue === 'object') {
      if (qmlElement[propKey]) {
        Object.entries(propValue).forEach(([configKey, configValue]) => {
          qmlElement[propKey][configKey] = configValue;
        });
      }

      return;
    }

    qmlElement[propKey] = propValue;
  }
}
