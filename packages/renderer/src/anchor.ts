import { QmlElement } from './qml';

export type AnchorLineProp =
  | 'left'
  | 'top'
  | 'right'
  | 'bottom'
  | 'horizontalCenter'
  | 'verticalCenter'
  | 'baseline';

export type AnchorItemProp = 'fill' | 'centerIn';

export type AnchorRefProp = AnchorLineProp | AnchorItemProp;

const ANCHOR_LINES = [
  'left',
  'top',
  'right',
  'bottom',
  'horizontalCenter',
  'verticalCenter',
  'baseline',
];

const ANCHOR_ITEM_REF = ['fill', 'centerIn'];

export function isAnchorLineProp(key: string): boolean {
  return ANCHOR_LINES.indexOf(key) > -1;
}

export function isAnchorItemProp(key: string): boolean {
  return ANCHOR_ITEM_REF.indexOf(key) > -1;
}

export function isAnchorProp(key: string): boolean {
  return isAnchorLineProp(key) || isAnchorItemProp(key);
}

export type AnchorPrimitiveKey =
  | 'margins'
  | 'topMargin'
  | 'bottomMargin'
  | 'leftMargin'
  | 'rightMargin'
  | 'horizontalCenterOffset'
  | 'verticalCenterOffset'
  | 'baselineOffset'
  | 'alignWhenCentered';

type AnchorSubscription = {
  element: QmlElement;
  propName: AnchorRefProp;
};

export interface AnchorRef {
  value(): any;
  isReady(): boolean;
  type(): string;
  addSubscription(element: QmlElement, propName: AnchorRefProp): void;
  removeSubscription(element: QmlElement, propName: AnchorRefProp): void;
}

abstract class AbstractAnchorRef implements AnchorRef {
  protected qmlElement: QmlElement | null;
  protected subscriptions: Array<AnchorSubscription> = [];

  constructor(qmlElement: QmlElement | null = null) {
    this.qmlElement = qmlElement;
  }

  abstract value(): any;
  abstract type(): string;

  protected processSubscriptions() {
    if (!this.isReady()) {
      throw new Error('Anchor not ready');
    }

    this.subscriptions.forEach(({ element, propName }) => {
      element.anchors[propName] = this.value();
    });
  }

  setQmlElement(qmlElement: QmlElement): void {
    if (this.qmlElement != null) {
      throw new Error('Anchor ref cannot be used twice');
    }
    this.qmlElement = qmlElement;
    this.processSubscriptions();
  }

  isReady() {
    return this.qmlElement != null;
  }

  addSubscription(element: QmlElement, propName: AnchorRefProp): void {
    this.subscriptions.push({ element, propName });
    if (this.qmlElement) {
      element.anchors[propName] = this.value();
    }
  }

  removeSubscription(element: QmlElement, propName: AnchorRefProp): void {
    for (let index = 0; index < this.subscriptions.length; index++) {
      const subscription = this.subscriptions[index];
      if (
        subscription.element === element &&
        subscription.propName === propName
      ) {
        // found
        this.subscriptions.splice(index, 1);
        console.log('Subscription removed', element, propName);
        // early return
        return;
      }
    }
  }
}

export class AnchorLineRef extends AbstractAnchorRef {
  private line: AnchorLineProp;

  constructor(line: AnchorLineProp, qmlElement: QmlElement | null = null) {
    super(qmlElement);
    this.line = line;
  }

  value() {
    if (this.qmlElement) {
      return this.qmlElement[this.line];
    }
    return undefined;
  }

  type() {
    return 'anchor_line';
  }
}

export class Anchor extends AbstractAnchorRef {
  readonly id: Symbol;

  readonly left: AnchorLineRef;
  readonly horizontalCenter: AnchorLineRef;
  readonly right: AnchorLineRef;
  readonly top: AnchorLineRef;
  readonly verticalCenter: AnchorLineRef;
  readonly baseline: AnchorLineRef;
  readonly bottom: AnchorLineRef;

  constructor() {
    super();
    this.id = Symbol();

    // anchor lines
    this.left = new AnchorLineRef('left');
    this.horizontalCenter = new AnchorLineRef('horizontalCenter');
    this.right = new AnchorLineRef('right');
    this.top = new AnchorLineRef('top');
    this.verticalCenter = new AnchorLineRef('verticalCenter');
    this.baseline = new AnchorLineRef('baseline');
    this.bottom = new AnchorLineRef('bottom');
  }

  setQmlElement(qmlElement: QmlElement): void {
    super.setQmlElement(qmlElement);

    this.left.setQmlElement(qmlElement);
    this.horizontalCenter.setQmlElement(qmlElement);
    this.right.setQmlElement(qmlElement);
    this.top.setQmlElement(qmlElement);
    this.verticalCenter.setQmlElement(qmlElement);
    this.baseline.setQmlElement(qmlElement);
    this.bottom.setQmlElement(qmlElement);
  }

  value() {
    if (this.qmlElement) {
      return this.qmlElement;
    }
    return undefined;
  }

  type(): string {
    return 'anchor';
  }

  static createRef() {
    return new Anchor();
  }
}

export default Anchor;
