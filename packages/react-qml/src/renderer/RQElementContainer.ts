import { RegistryComponentMetadata } from '../common/AppRegistry';
import { diffProps, updateProps } from './RQAttributePayload';
import { inspect } from 'util';
import UIManager from './UIManager';

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

  parent: RQElementContainer | undefined;
  private children: Set<RQElementContainer>;

  constructor(
    element: Qml.QmlElement,
    metadata: RegistryComponentMetadata,
    parent?: RQElementContainer
  ) {
    this.element = element;
    this.metadata = metadata;
    this.viewTag = ++globalTagCounter;
    this.children = new Set();
    this.parent = parent;
  }

  setNativeProps(props: any) {
    this.updateNativeProps({}, props);
  }

  updateNativeProps(prevProps: any, nextProps: any) {
    const { element } = this;
    if (!element) {
      return;
    }

    // generate update payload
    const updatePayload = diffProps(prevProps, nextProps);
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

  appendChild(child: RQElementContainer) {
    // on Container level
    this.children.add(child);
    child.parent = this;

    // on Element level
    UIManager.appendChild(this, child);
  }

  removeChild(child: RQElementContainer) {
    // remove children recursively
    child.removeAllChildren();

    // then remove child
    child.parent = undefined;
    this.children.delete(child);
    UIManager.removeChild(this, child);
  }

  removeAllChildren() {
    this.children.forEach(child => {
      this.removeChild(child);
    });
  }
}

export default RQElementContainer;
