const isEventRegex = /^on([A-Z][a-zA-Z]+)$/;

function listenTo(qmlElement, eventName, value, lastValue) {
  eventName = eventName.toLowerCase();

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
  console.log('  nextProps', JSON.stringify(nextProps));

  // qmlElement.clicked.connect(nextProps.onClicked);

  Object.entries(nextProps).forEach(([propKey, propValue]) => {
    let match

    if (
      propKey === 'dangerouslySetInnerHTML' &&
      propValue &&
      propValue.__html != null
    ) {
      // TODO: implement this
    } else if (propKey === 'children') {
      qmlElement.data.length = 0;
      qmlElement.data.push(propValue);
    } else if ((match = propKey.match(isEventRegex))) {
      let [, eventName] = match
      listenTo(qmlElement, eventName, propValue, null)
    } else if (propValue != null) {
      qmlElement[propKey] = propValue;
    }
  })
}

export function diffProps(qmlElement, lastProps, nextProps) {
  let updatePayload = null

  let add = (k, v) => {
    if (!updatePayload) updatePayload = []
    updatePayload.push([k, v])
  }

  for (let propKey in Object.keys(lastProps)) {
    if (lastProps[propKey] == null || nextProps.hasOwnProperty(propKey)) {
      continue
    } else if (propKey.match(isEventRegex)) {
      updatePayload = updatePayload || []
    }
  }

  for (let [propKey, nextProp] of Object.entries(nextProps)) {
    const lastProp = lastProps[propKey]

    if (
      nextProp === lastProp ||
      propKey === 'style' ||
      (nextProp == null && lastProp == null)
    ) {
      continue
    } else if (propKey === 'dangerouslySetInnerHTML') {
      const nextHtml = nextProp ? nextProp.__html : undefined
      const lastHtml = lastProp ? lastProp.__html : undefined

      if (nextHtml != null && lastHtml !== nextHtml) {
        add(propKey, nextHtml)
      }
    } else if (
      propKey === 'children' &&
      lastProp !== nextProp
    ) {
      add(propKey, nextProp)
    } else if (propKey.match(isEventRegex) && lastProp !== nextProp) {
      // we need the last event handler so we can remove it in the commit phase
      add(propKey, [lastProp, nextProp])
    } else {
      // For any other property we always add it to the queue and then we
      // filter it out using the whitelist during the commit.
      add(propKey, nextProp)
    }
  }

  return updatePayload
}

export function updateProps(qmlElement, updateQueue) {
  for (let [propKey, propValue] of updateQueue) {
    if (
      propKey === 'dangerouslySetInnerHTML' &&
      propValue &&
      propValue.__html != null
    ) {
      // TODO: implement this
    } else if (propKey === 'children') {
      qmlElement.data.length = 0;
      qmlElement.data.push(propValue);
    } else if ((match = propKey.match(isEventRegex))) {
      let [lastHandler, nextHandler] = propValue;
      listenTo(qmlElement, match[1], nextHandler, lastHandler);
    } else if (propValue != null) {
      qmlElement[propKey] = propValue;
    }
  }
}
