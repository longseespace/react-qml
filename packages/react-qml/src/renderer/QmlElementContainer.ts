import {
  QmlElementContainer,
  QmlElement,
  QmlElementMeasureCallback,
} from './qmlTypes';
import { RegistryComponentMetadata } from './registry';
import { inspect } from 'util';

function isNumber(x: any) {
  return typeof x === 'number';
}

type Style = { [key: string]: any };

function updateElementStyle(element: QmlElement, style: Style) {
  for (let styleName in style) {
    const styleValue = style[styleName];

    if (element.hasOwnProperty(styleName)) {
      element[styleName] = styleValue;
    }
  }
}

class QmlElementContainerImpl implements QmlElementContainer {
  element: QmlElement;
  metadata: RegistryComponentMetadata;

  constructor(element: QmlElement, metadata: RegistryComponentMetadata) {
    this.element = element;
    this.metadata = metadata;
  }

  setNativeProps(props: any) {
    const { element } = this;
    if (!element) {
      return;
    }
    for (let propKey in props) {
      const propValue = props[propKey];
      if (propKey === 'style') {
        updateElementStyle(element, propValue);
        continue;
      }
      if (element.hasOwnProperty(propKey)) {
        element[propKey] = propValue;
      }
    }
  }

  measure(callback: QmlElementMeasureCallback) {
    const { element } = this;
    if (!element) {
      return;
    }
    callback(
      isNumber(element.x) ? element.x : 0,
      isNumber(element.y) ? element.y : 0,
      isNumber(element.width) ? element.width : 0,
      isNumber(element.height) ? element.height : 0,
      isNumber(element.x) ? element.x : 0,
      isNumber(element.y) ? element.y : 0
    );
  }
}

export default QmlElementContainerImpl;
