export function setInitialProps(qmlElement, nextProps) {
  console.log('setInitialProps');
  console.log('  qmlElement', qmlElement);
  console.log('  nextProps', JSON.stringify(nextProps));

  Object.keys(nextProps).forEach((propName) => {
    console.log('    propName', propName);
    console.log('    value', nextProps[propName]);

    switch (propName) {
      case 'children':
        qmlElement.data.length = 0;
        qmlElement.data.push(nextProps.children);
        break;

      case 'onClicked': {
        qmlElement.clicked.connect(nextProps.onClicked);
        break;
      }

      default:
        qmlElement[propName] = nextProps[propName];
    }
  })

  // Object.entries(nextProps).forEach(([propKey, propValue]) => {
  //   let match
  //
  //   // inline styles!
  //   if (propKey === 'style') {
  //     css(qmlElement, propValue)
  //
  //     // Quick support for dangerousSetInnerHTML={{__html}}
  //   } else if (
  //     propKey === 'dangerouslySetInnerHTML' &&
  //     propValue &&
  //     propValue.__html != null
  //   ) {
  //     qmlElement.innerHtml = propValue.__html
  //
  //     // Handle when `children` is a renderable (text, number, etc)
  //   } else if (propKey === 'children') {
  //     // doesn't cover an IE8 issue with textareas
  //     if (typeof propValue === 'number') propValue = `${propValue}`
  //     if (typeof propValue === 'string') qmlElement.textContent = propValue
  //
  //     // Add DOM event listeners
  //   } else if ((match = propKey.match(isEventRegex))) {
  //     let [, eventName] = match
  //     listenTo(qmlElement, eventName, propValue, null)
  //   } else if (propValue != null) {
  //     setValueOnElement(qmlElement, propKey, propValue)
  //   }
  // })
}

const isEventRegex = /^on([A-Z][a-zA-Z]+)$/

export function diffProps(domElement, lastProps, nextProps) {
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
      lastProp !== nextProp &&
      isRenderableChild(nextProp)
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

  // let styleUpdates = diffStyle(lastProps.style, nextProps.style)
  // if (styleUpdates) {
  //   add('style', styleUpdates)
  // }

  return updatePayload
}

export function updateProps(qmlElement, updateQueue) {
  for (let [propKey, propValue] of updateQueue) {
    console.log('    propKey', propKey);
    console.log('    propValue', JSON.stringify(propValue));

    switch (propKey) {
      case 'children':
        qmlElement.data.length = 0;
        qmlElement.data.push(propValue);
        break;

      case 'onClicked': {
        const [lastHandler, nextHandler] = propValue;
        qmlElement.clicked.disconnect(lastHandler);
        qmlElement.clicked.connect(nextHandler);
        break;
      }

      default:
        qmlElement[propKey] = propValue;
    }
  }
}

const isRenderableChild = child =>
  typeof child === 'string' || typeof child === 'number'
