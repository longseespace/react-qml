import { QmlElement } from './qml';
import { EventEmitter } from 'events';

const TYPE_ANCHOR = Symbol('rq.anchor');

export type AnchorLineKey =
  | 'left'
  | 'top'
  | 'right'
  | 'bottom'
  | 'horizontalCenter'
  | 'verticalCenter'
  | 'baseline';

const ANCHOR_LINES = [
  'left',
  'top',
  'right',
  'bottom',
  'horizontalCenter',
  'verticalCenter',
  'baseline',
];

export function isAnchorKey(key: string): boolean {
  return ANCHOR_LINES.indexOf(key) > -1;
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

export interface AnchorRef {
  value(): any;
  isReady(): boolean;
  subscribe(callback: () => void): void;
}

export class AnchorLineRef extends EventEmitter implements AnchorRef {
  private anchor: Anchor;
  private line: AnchorLineKey;

  constructor(anchor: Anchor, line: AnchorLineKey) {
    super();

    this.anchor = anchor;
    this.line = line;
  }

  value() {
    const qmlElement = this.anchor.qmlElement();
    if (qmlElement) {
      return qmlElement[this.line];
    }
    return undefined;
  }

  isReady() {
    return this.anchor.isReady();
  }

  subscribe(callback: () => void): void {
    this.once('ready', callback);
  }
}

export class Anchor extends EventEmitter implements AnchorRef {
  private _id: Symbol;
  private ready: boolean = false;
  private _qmlElement: QmlElement | null;

  readonly left: AnchorLineRef;
  readonly horizontalCenter: AnchorLineRef;
  readonly right: AnchorLineRef;
  readonly top: AnchorLineRef;
  readonly verticalCenter: AnchorLineRef;
  readonly baseline: AnchorLineRef;
  readonly bottom: AnchorLineRef;

  constructor() {
    super();

    this._id = Symbol();
    this._qmlElement = null;

    // anchor lines
    this.left = new AnchorLineRef(this, 'left');
    this.horizontalCenter = new AnchorLineRef(this, 'horizontalCenter');
    this.right = new AnchorLineRef(this, 'right');
    this.top = new AnchorLineRef(this, 'top');
    this.verticalCenter = new AnchorLineRef(this, 'verticalCenter');
    this.baseline = new AnchorLineRef(this, 'baseline');
    this.bottom = new AnchorLineRef(this, 'bottom');
  }

  setQmlElement(qmlElement: QmlElement): void {
    if (this._qmlElement != null) {
      throw new Error('Anchor ref cannot be used twice');
    }
    this._qmlElement = qmlElement;
    this.ready = true;

    this.emit('ready');
    this.left.emit('ready');
    this.horizontalCenter.emit('ready');
    this.right.emit('ready');
    this.top.emit('ready');
    this.verticalCenter.emit('ready');
    this.baseline.emit('ready');
    this.bottom.emit('ready');
  }

  qmlElement() {
    return this._qmlElement;
  }

  id() {
    return this.id;
  }

  value() {
    if (this._qmlElement) {
      return this._qmlElement;
    }
    return undefined;
  }

  isReady() {
    return this.ready;
  }

  subscribe(callback: () => void): void {
    this.once('ready', callback);
  }

  static type(): Symbol {
    return TYPE_ANCHOR;
  }

  static createRef() {
    return new Anchor();
  }

  static isAnchor(obj: any) {
    const isObj = typeof obj === 'object';
    const hasType = typeof obj.type === 'function';
    const hasCorrectType = obj.type() === TYPE_ANCHOR;

    return isObj && hasType && hasCorrectType;
  }
}

export default Anchor;
