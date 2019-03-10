// script: generateTypes, version: 0.3
type Signal<T> = {
  connect: (handler: T) => void;
  disconnect: (handler: T) => void;
};

export type QObject = {
  objectName: string;

  toString(): void;
  destroy(): void;
  destroy(delay: number): void;

  objectNameChanged: Signal<Function>;
};

export type QQmlBind = {
  target: QObject;
  property: string;
  value: any;
  when: boolean;
  delayed: boolean;
} & QObject;

export enum QQmlComponent_CompilationMode {
  PreferSynchronous = 0,
  Asynchronous = 1,
}
export enum QQmlComponent_Status {
  Null = 0,
  Ready = 1,
  Loading = 2,
  Error = 3,
}

export type QQmlComponent = {
  readonly progress: number;
  readonly status: QQmlComponent_Status;
  readonly url: string;

  loadUrl(url: string): void;
  loadUrl(url: string, mode: QQmlComponent_CompilationMode): void;
  setData(param0: any, baseUrl: string): void;
  errorString(): string;

  statusChanged: Signal<Function>;
  progressChanged: Signal<Function>;
} & QObject;

export type QQmlComponentAttached = {
  completed: Signal<Function>;
  destruction: Signal<Function>;
} & QObject;

export type QQmlConnections = {
  target: QObject;
  enabled: boolean;
  ignoreUnknownSignals: boolean;

  enabledChanged: Signal<Function>;
} & QObject;

export type QQmlInstanceModel = {
  readonly count: number;

  modelUpdated: Signal<Function>;
  createdItem: Signal<Function>;
  initItem: Signal<Function>;
  destroyingItem: Signal<Function>;
} & QObject;

export type QQmlInstantiator = {
  active: boolean;
  asynchronous: boolean;
  model: any;
  readonly count: number;
  delegate: QQmlComponent;
  readonly object: QObject;

  objectAt(index: number): any;

  objectAdded: Signal<Function>;
  objectRemoved: Signal<Function>;
} & QObject;

export enum QQmlLocale_MeasurementSystem {
  MetricSystem = 0,
  ImperialSystem = 1,
  ImperialUSSystem = 1,
  ImperialUKSystem = 2,
}
export enum QQmlLocale_FormatType {
  LongFormat = 0,
  ShortFormat = 1,
  NarrowFormat = 2,
}
export enum QQmlLocale_CurrencySymbolFormat {
  CurrencyIsoCode = 0,
  CurrencySymbol = 1,
  CurrencyDisplayName = 2,
}
export enum QQmlLocale_DayOfWeek {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

export type QQmlLocale = {};

export type QQmlLoggingCategory = {
  name: string;
} & QObject;

export type QQmlTimer = {
  interval: number;
  running: boolean;
  repeat: boolean;
  triggeredOnStart: boolean;
  readonly parent: QObject;

  start(): void;
  stop(): void;
  restart(): void;

  triggered: Signal<Function>;
} & QObject;

export type QQuickMouseEvent = {
  readonly x: number;
  readonly y: number;
  readonly button: number;
  readonly buttons: number;
  readonly modifiers: number;
  readonly source: number;
  readonly wasHeld: boolean;
  readonly isClick: boolean;
  accepted: boolean;
} & QObject;

// end
