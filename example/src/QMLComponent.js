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

  let element = qmlElement;

  if (
    nextProps.dangerouslySetInnerQML &&
    nextProps.dangerouslySetInnerQML.__qml != null
  ) {
    const child = Qt.createQmlObject(
      nextProps.dangerouslySetInnerQML.__qml,
      qmlElement,
      'qml'
    );
    element = child;
  }

  Object.entries(nextProps).forEach(([propKey, propValue]) => {
    if (propValue == null || propKey === 'dangerouslySetInnerQML') {
      // ignore
      return;
    }

    if (propKey === 'children') {
      element.data.length = 0;
      element.data.push(propValue);
      return;
    }

    if (propKey.match(isEventRegex)) {
      const match = propKey.match(isEventRegex);
      listenTo(element, match[1], propValue, null);
      return;
    }

    if (typeof propValue === 'object') {
      if (element[propKey]) {
        Object.entries(propValue).forEach(([configKey, configValue]) => {
          element[propKey][configKey] = configValue;
        });
      }
      return;
    }

    element[propKey] = propValue;
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
    } else if (propKey === 'dangerouslySetInnerQML') {
      const nextQml = nextProp ? nextProp.__qml : undefined;
      const lastQml = lastProp ? lastProp.__qml : undefined;

      if (nextQml != null && lastQml !== nextQml) {
        add(propKey, nextQml);
      }
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
  let element = qmlElement;

  if (updateQueue.dangerouslySetInnerQML) {
    const prevChild = qmlElement.data[0];
    if (prevChild) {
      prevChild.destroy();
    }
    qmlElement.data.length = 0;

    if (updateQueue.dangerouslySetInnerQML.__qml != null) {
      const child = Qt.createQmlObject(
        updateQueue.dangerouslySetInnerQML.__qml,
        qmlElement,
        'qml'
      );

      element = child;
    } else {
      // short circuit return
      return;
    }
  }

  for (let [propKey, propValue] of updateQueue) {
    if (propValue == null || propKey === 'dangerouslySetInnerQML') {
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
