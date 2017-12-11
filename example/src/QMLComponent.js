export function setInitialProps(qmlElement, nextProps) {
  console.log('setInitialProps');
  console.log('  qmlElement', qmlElement);
  console.log('  nextProps', JSON.stringify(nextProps));

  Object.keys(nextProps).forEach((propName) => {
    console.log('    propName', propName);
    console.log('    value', nextProps[propName]);

    switch (propName) {
      case 'children':
        qmlElement.children = [nextProps.children]
        break;

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
