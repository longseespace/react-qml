import { RegistryComponentMetadata } from '../common/AppRegistry';
import StyleSheet from '../common/StyleSheet';

function isNumber(x: any) {
  return typeof x === 'number';
}

export type QmlElementMeasureCallback = (
  x: number,
  y: number,
  width: number,
  height: number,
  pageX: number,
  pageY: number
) => void;

// a QmlElementContainer
export interface QmlElementContainer {
  element: Qml.QmlElement;
  metadata: RegistryComponentMetadata;
  measure?: (callback: QmlElementMeasureCallback) => void;
  setNativeProps?: (arg: any) => void;
}

class QmlElementContainerImpl implements QmlElementContainer {
  element: Qml.QmlElement;
  metadata: RegistryComponentMetadata;

  constructor(element: Qml.QmlElement, metadata: RegistryComponentMetadata) {
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
        StyleSheet.setStyle(element, propValue);
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
