// script: generateTypes, version: 0.3
// dependencies
import * as QtQml from '../QtQml/types';
import * as QtQuick from '../QtQuick/types';

type Signal<T> = {
  connect: (handler: T) => void;
  disconnect: (handler: T) => void;
};

export type QQuickRootItem = {
  setWidth(w: number): void;
  setHeight(h: number): void;
} & QtQuick.QQuickItem;

export type QQuickScreen = {} & QtQml.QObject;

export type QQuickScreenAttached = {
  orientationUpdateMask: any;

  angleBetween(a: number, b: number): number;
} & QQuickScreenInfo;

export type QQuickScreenInfo = {
  readonly name: string;
  readonly manufacturer: string;
  readonly model: string;
  readonly serialNumber: string;
  readonly width: number;
  readonly height: number;
  readonly desktopAvailableWidth: number;
  readonly desktopAvailableHeight: number;
  readonly logicalPixelDensity: number;
  readonly pixelDensity: number;
  readonly devicePixelRatio: number;
  readonly primaryOrientation: any;
  readonly orientation: any;
  readonly virtualX: number;
  readonly virtualY: number;

  manufacturerChanged: Signal<Function>;
  modelChanged: Signal<Function>;
  serialNumberChanged: Signal<Function>;
  desktopGeometryChanged: Signal<Function>;
  virtualXChanged: Signal<Function>;
  virtualYChanged: Signal<Function>;
} & QtQml.QObject;

export enum QQuickWindow_SceneGraphError {
  ContextNotAvailable = 1,
}
export enum QQuickWindow_TextRenderType {
  QtTextRendering = 0,
  NativeTextRendering = 1,
}

export type QQuickWindow = {
  readonly data: QtQml.QObject;
  color: any;
  readonly contentItem: QtQuick.QQuickItem;
  readonly activeFocusItem: QtQuick.QQuickItem;

  update(): void;
  releaseResources(): void;

  frameSwapped: Signal<Function>;
  openglContextCreated: Signal<Function>;
  sceneGraphInitialized: Signal<Function>;
  sceneGraphInvalidated: Signal<Function>;
  beforeSynchronizing: Signal<Function>;
  afterSynchronizing: Signal<Function>;
  beforeRendering: Signal<Function>;
  afterRendering: Signal<Function>;
  afterAnimating: Signal<Function>;
  sceneGraphAboutToStop: Signal<Function>;
  closing: Signal<Function>;
  colorChanged: Signal<Function>;
  activeFocusItemChanged: Signal<Function>;
  sceneGraphError: Signal<Function>;
} & QWindow;

export type QQuickWindowAttached = {
  readonly visibility: any;
  readonly active: boolean;
  readonly activeFocusItem: QtQuick.QQuickItem;
  readonly contentItem: QtQuick.QQuickItem;
  readonly width: number;
  readonly height: number;
  readonly window: QQuickWindow;
} & QtQml.QObject;

export type QQuickWindowQmlImpl = {
  visible: boolean;
  visibility: any;
  screen: QtQml.QObject;

  visibleChanged: Signal<Function>;
  visibilityChanged: Signal<Function>;
  screenChanged: Signal<Function>;
} & QQuickWindow;

export enum QWindow_Visibility {
  Hidden = 0,
  AutomaticVisibility = 1,
  Windowed = 2,
  Minimized = 3,
  Maximized = 4,
  FullScreen = 5,
}
export enum QWindow_AncestorMode {
  ExcludeTransients = 0,
  IncludeTransients = 1,
}

export type QWindow = {
  title: string;
  modality: any;
  flags: any;
  x: number;
  y: number;
  width: number;
  height: number;
  minimumWidth: number;
  minimumHeight: number;
  maximumWidth: number;
  maximumHeight: number;
  visible: boolean;
  readonly active: boolean;
  visibility: QWindow_Visibility;
  contentOrientation: any;
  opacity: number;

  requestActivate(): void;
  setVisible(visible: boolean): void;
  show(): void;
  hide(): void;
  showMinimized(): void;
  showMaximized(): void;
  showFullScreen(): void;
  showNormal(): void;
  close(): boolean;
  raise(): void;
  lower(): void;
  setTitle(param0: string): void;
  setX(arg: number): void;
  setY(arg: number): void;
  setWidth(arg: number): void;
  setHeight(arg: number): void;
  setGeometry(posx: number, posy: number, w: number, h: number): void;
  setGeometry(rect: any): void;
  setMinimumWidth(w: number): void;
  setMinimumHeight(h: number): void;
  setMaximumWidth(w: number): void;
  setMaximumHeight(h: number): void;
  alert(msec: number): void;
  requestUpdate(): void;

  screenChanged: Signal<Function>;
  modalityChanged: Signal<Function>;
  windowStateChanged: Signal<Function>;
  windowTitleChanged: Signal<Function>;
  xChanged: Signal<Function>;
  yChanged: Signal<Function>;
  widthChanged: Signal<Function>;
  heightChanged: Signal<Function>;
  minimumWidthChanged: Signal<Function>;
  minimumHeightChanged: Signal<Function>;
  maximumWidthChanged: Signal<Function>;
  maximumHeightChanged: Signal<Function>;
  visibleChanged: Signal<Function>;
  visibilityChanged: Signal<Function>;
  activeChanged: Signal<Function>;
  contentOrientationChanged: Signal<Function>;
  focusObjectChanged: Signal<Function>;
  opacityChanged: Signal<Function>;
} & QtQml.QObject;

// end
