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
  readonly rendererType: QQuickShape_RendererType | string;
  asynchronous: boolean | undefined;
  vendorExtensionsEnabled: boolean | undefined;
  readonly status: QQuickShape_Status | string;
  readonly data: QtQml.QObject;

  rendererChanged: Signal<Function>;
} & QtQuick.QQuickItem;

export type QQuickShapeConicalGradient = {
  centerX: number | undefined;
  centerY: number | undefined;
  angle: number | undefined;
} & QQuickShapeGradient;

export enum QQuickShapeGradient_SpreadMode {
  PadSpread = 0,
  RepeatSpread = 1,
  ReflectSpread = 2,
}

export type QQuickShapeGradient = {
  spread: QQuickShapeGradient_SpreadMode | string;
} & QtQuick.QQuickGradient;

export type QQuickShapeLinearGradient = {
  x1: number | undefined;
  y1: number | undefined;
  x2: number | undefined;
  y2: number | undefined;
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
  strokeWidth: number | undefined;
  fillColor: any;
  fillRule: QQuickShapePath_FillRule | string;
  joinStyle: QQuickShapePath_JoinStyle | string;
  miterLimit: number | undefined;
  capStyle: QQuickShapePath_CapStyle | string;
  strokeStyle: QQuickShapePath_StrokeStyle | string;
  dashOffset: number | undefined;
  dashPattern: any;
  fillGradient: QQuickShapeGradient | null;

  shapePathChanged: Signal<Function>;
} & QtQuick.QQuickPath;

export type QQuickShapeRadialGradient = {
  centerX: number | undefined;
  centerY: number | undefined;
  centerRadius: number | undefined;
  focalX: number | undefined;
  focalY: number | undefined;
  focalRadius: number | undefined;
} & QQuickShapeGradient;

// end
