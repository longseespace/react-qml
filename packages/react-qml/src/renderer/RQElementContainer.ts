import { RegistryComponentMetadata } from '../common/AppRegistry';
import { diffProps, updateProps } from './RQAttributePayload';
import { inspect } from 'util';

export type RQElementMeasureCallback = (
  x: number,
  y: number,
  width: number,
  height: number,
  pageX: number,
  pageY: number
) => void;

function isNumber(x: any) {
  return typeof x === 'number';
}

let globalTagCounter = 0;

class RQElementContainer {
  readonly element: Qml.QmlElement;
  readonly metadata: RegistryComponentMetadata;
  readonly viewTag: number;

  constructor(element: Qml.QmlElement, metadata: RegistryComponentMetadata) {
    this.element = element;
    this.metadata = metadata;
    this.viewTag = ++globalTagCounter;
  }

  setNativeProps(props: any) {
    const { element } = this;
    if (!element) {
      return;
    }

    // generate update payload
    const updatePayload = diffProps({}, props);
    if (updatePayload != null) {
      console.log('updatePayload');
      console.log(inspect(updatePayload, { depth: 1 }));

      updateProps(this, updatePayload);
    }
  }

  measure(callback: RQElementMeasureCallback) {
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

  getViewTag() {
    return this.viewTag;
  }
}

export default RQElementContainer;
