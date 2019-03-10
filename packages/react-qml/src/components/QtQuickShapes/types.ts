// script: generateTypes, version: 0.3
// dependencies
import * as QtQml from '../QtQml/types';
import * as QtQuick from '../QtQuick/types';

type Signal<T> = {
  connect: (handler: T) => void;
  disconnect: (handler: T) => void;
};

export enum QQuickShape_RendererType {
  UnknownRenderer = 0,
  GeometryRenderer = 1,
  NvprRenderer = 2,
  SoftwareRenderer = 3,
}
export enum QQuickShape_Status {
  Null = 0,
  Ready = 1,
  Processing = 2,
}

export type QQuickShape = {
  readonly rendererType: QQuickShape_RendererType;
  asynchronous: boolean;
  vendorExtensionsEnabled: boolean;
  readonly status: QQuickShape_Status;
  readonly data: QtQml.QObject;

  rendererChanged: Signal<Function>;
} & QtQuick.QQuickItem;

export type QQuickShapeConicalGradient = {
  centerX: number;
  centerY: number;
  angle: number;
} & QQuickShapeGradient;

export enum QQuickShapeGradient_SpreadMode {
  PadSpread = 0,
  RepeatSpread = 1,
  ReflectSpread = 2,
}

export type QQuickShapeGradient = {
  spread: QQuickShapeGradient_SpreadMode;
} & QtQuick.QQuickGradient;

export type QQuickShapeLinearGradient = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
} & QQuickShapeGradient;

export enum QQuickShapePath_FillRule {
  OddEvenFill = 0,
  WindingFill = 1,
}
export enum QQuickShapePath_JoinStyle {
  MiterJoin = 0,
  BevelJoin = 64,
  RoundJoin = 128,
}
export enum QQuickShapePath_CapStyle {
  FlatCap = 0,
  SquareCap = 16,
  RoundCap = 32,
}
export enum QQuickShapePath_StrokeStyle {
  SolidLine = 1,
  DashLine = 2,
}

export type QQuickShapePath = {
  strokeColor: any;
  strokeWidth: number;
  fillColor: any;
  fillRule: QQuickShapePath_FillRule;
  joinStyle: QQuickShapePath_JoinStyle;
  miterLimit: number;
  capStyle: QQuickShapePath_CapStyle;
  strokeStyle: QQuickShapePath_StrokeStyle;
  dashOffset: number;
  dashPattern: any;
  fillGradient: QQuickShapeGradient;

  shapePathChanged: Signal<Function>;
} & QtQuick.QQuickPath;

export type QQuickShapeRadialGradient = {
  centerX: number;
  centerY: number;
  centerRadius: number;
  focalX: number;
  focalY: number;
  focalRadius: number;
} & QQuickShapeGradient;

// end
