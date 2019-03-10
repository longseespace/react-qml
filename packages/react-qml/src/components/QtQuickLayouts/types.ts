// script: generateTypes, version: 0.3
// dependencies
import * as QtQml from '../QtQml/types';
import * as QtQuick from '../QtQuick/types';

type Signal<T> = {
  connect: (handler: T) => void;
  disconnect: (handler: T) => void;
};

export type QQuickColumnLayout = {} & QQuickLinearLayout;

export enum QQuickGridLayout_Flow {
  LeftToRight = 0,
  TopToBottom = 1,
}

export type QQuickGridLayout = {
  columnSpacing: number;
  rowSpacing: number;
  columns: number;
  rows: number;
  flow: QQuickGridLayout_Flow;
} & QQuickGridLayoutBase;

export type QQuickGridLayoutBase = {
  layoutDirection: any;

  layoutDirectionChanged: Signal<Function>;
} & QQuickLayout;

export type QQuickLayout = {} & QtQuick.QQuickItem;

export type QQuickLayoutAttached = {
  minimumWidth: number;
  minimumHeight: number;
  preferredWidth: number;
  preferredHeight: number;
  maximumWidth: number;
  maximumHeight: number;
  fillHeight: boolean;
  fillWidth: boolean;
  row: number;
  column: number;
  rowSpan: number;
  columnSpan: number;
  alignment: any;
  margins: number;
  leftMargin: number;
  topMargin: number;
  rightMargin: number;
  bottomMargin: number;
} & QtQml.QObject;

export type QQuickLinearLayout = {
  spacing: number;
} & QQuickGridLayoutBase;

export type QQuickRowLayout = {} & QQuickLinearLayout;

export type QQuickStackLayout = {
  readonly count: number;
  currentIndex: number;

  itemAt(index: number): any;
} & QQuickLayout;

// end
