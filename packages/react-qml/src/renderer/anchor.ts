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
  source: QmlElement;
  sourceProp: AnchorRefProp;
  target?: QmlElement;
  targetProp?: AnchorRefProp;
  onTargetChanged?: () => void;
};

export interface AnchorRef {
  value(): any;
  isReady(): boolean;
  type(): string;
  addSubscription(source: QmlElement, sourceProp: AnchorRefProp): void;
  removeSubscription(source: QmlElement, sourceProp: AnchorRefProp): void;
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

    this.subscriptions.forEach(({ source, sourceProp }) => {
      source.anchors[sourceProp] = this.value();
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

  addSubscription(source: QmlElement, sourceProp: AnchorRefProp): void {
    this.subscriptions.push({ source, sourceProp });
    if (this.qmlElement) {
      source.anchors[sourceProp] = this.value();
    }
  }

  removeSubscription(source: QmlElement, sourceProp: AnchorRefProp): void {
    for (let index = 0; index < this.subscriptions.length; index++) {
      const subscription = this.subscriptions[index];
      if (
        subscription.source === source &&
        subscription.sourceProp === sourceProp
      ) {
        // found
        this.subscriptions.splice(index, 1);
        console.log('Subscription removed', source, sourceProp);
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

export class ParentAnchor {
  private static parentAnchorSubscriptions: Array<AnchorSubscription> = [];

  private static updateAnchors = (
    childElement: QmlElement,
    childPropName: AnchorRefProp,
    parentPropName?: AnchorRefProp
  ) => {
    if (!childElement.parent) {
      console.warn('ChildElement has no parent', childElement);
      return;
    }
    if (childPropName === 'fill' || childPropName === 'centerIn') {
      childElement.anchors[childPropName] = childElement.parent;
    } else {
      if (!parentPropName) {
        console.warn('Undefined anchor reference');
        return;
      }
      childElement.anchors[childPropName] = childElement.parent[parentPropName];
    }
  };

  static addSubscription(
    childElement: QmlElement,
    childPropName: AnchorRefProp,
    parentAnchorRef?: string
  ): void {
    let parentPropName: AnchorRefProp | undefined = undefined;
    // parse parentAnchorRef first
    if (
      parentAnchorRef &&
      parentAnchorRef.length > 0 &&
      parentAnchorRef !== 'parent'
    ) {
      const parts = parentAnchorRef.split('.');
      if (parts.length === 2 && parts[0] === 'parent') {
        if (!isAnchorProp(parts[1])) {
          console.warn(`Invalid anchor reference: ${parts[1]}`);
          return;
        }
        parentPropName = <AnchorRefProp>parts[1];
      }
    }
    const onTargetChanged = () => {
      ParentAnchor.updateAnchors(childElement, childPropName, parentPropName);
    };
    ParentAnchor.parentAnchorSubscriptions.push({
      source: childElement,
      sourceProp: childPropName,
      targetProp: parentPropName,
      onTargetChanged,
    });

    if (childElement.parent) {
      ParentAnchor.updateAnchors(childElement, childPropName, parentPropName);
    }

    childElement.parentChanged.connect(onTargetChanged);
  }

  static removeSubscription(
    childElement: QmlElement,
    childPropName: AnchorRefProp
  ): void {
    for (
      let index = 0;
      index < ParentAnchor.parentAnchorSubscriptions.length;
      index++
    ) {
      const subscription = ParentAnchor.parentAnchorSubscriptions[index];
      if (
        subscription.source === childElement &&
        subscription.sourceProp === childPropName
      ) {
        // found
        if (subscription.onTargetChanged) {
          childElement.parentChanged.disconnect(subscription.onTargetChanged);
        }
        ParentAnchor.parentAnchorSubscriptions.splice(index, 1);
        console.log('Subscription removed', childElement, childPropName);
        // early return
        return;
      }
    }
  }
}

export default Anchor;
