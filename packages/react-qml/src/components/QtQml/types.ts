// script: generateTypes, version: 0.3
// dependencies

type Signal<T> = {
  connect: (handler: T) => void;
  disconnect: (handler: T) => void;
};

export type QObject = {
  objectName: string | undefined;

  toString(): void;
  destroy(): void;
  destroy(delay: number | undefined): void;

  objectNameChanged: Signal<Function>;
};

export type QQmlBind = {
  target: QObject | null;
  property: string | undefined;
  value: any;
  when: boolean | undefined;
  delayed: boolean | undefined;
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
  readonly status: QQmlComponent_Status | string;
  readonly url: string;

  loadUrl(url: string | undefined): void;
  loadUrl(
    url: string | undefined,
    mode: QQmlComponent_CompilationMode | string
  ): void;
  setData(param0: any, baseUrl: string | undefined): void;
  errorString(): string | undefined;

  statusChanged: Signal<Function>;
  progressChanged: Signal<Function>;
} & QObject;

export type QQmlComponentAttached = {
  completed: Signal<Function>;
  destruction: Signal<Function>;
} & QObject;

export type QQmlConnections = {
  target: QObject | null;
  enabled: boolean | undefined;
  ignoreUnknownSignals: boolean | undefined;

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
  active: boolean | undefined;
  asynchronous: boolean | undefined;
  model: any;
  readonly count: number;
  delegate: QQmlComponent | null;
  readonly object: QObject;

  objectAt(index: number | undefined): any;

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
  name: string | undefined;
} & QObject;

export type QQmlTimer = {
  interval: number | undefined;
  running: boolean | undefined;
  repeat: boolean | undefined;
  triggeredOnStart: boolean | undefined;
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
  accepted: boolean | undefined;
} & QObject;

// end
