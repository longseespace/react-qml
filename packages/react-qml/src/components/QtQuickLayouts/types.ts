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
  columnSpacing: number | undefined;
  rowSpacing: number | undefined;
  columns: number | undefined;
  rows: number | undefined;
  flow: QQuickGridLayout_Flow | string;
} & QQuickGridLayoutBase;

export type QQuickGridLayoutBase = {
  layoutDirection: any;

  layoutDirectionChanged: Signal<Function>;
} & QQuickLayout;

export type QQuickLayout = {} & QtQuick.QQuickItem;

export type QQuickLayoutAttached = {
  minimumWidth: number | undefined;
  minimumHeight: number | undefined;
  preferredWidth: number | undefined;
  preferredHeight: number | undefined;
  maximumWidth: number | undefined;
  maximumHeight: number | undefined;
  fillHeight: boolean | undefined;
  fillWidth: boolean | undefined;
  row: number | undefined;
  column: number | undefined;
  rowSpan: number | undefined;
  columnSpan: number | undefined;
  alignment: any;
  margins: number | undefined;
  leftMargin: number | undefined;
  topMargin: number | undefined;
  rightMargin: number | undefined;
  bottomMargin: number | undefined;
} & QtQml.QObject;

export type QQuickLinearLayout = {
  spacing: number | undefined;
} & QQuickGridLayoutBase;

export type QQuickRowLayout = {} & QQuickLinearLayout;

export type QQuickStackLayout = {
  readonly count: number;
  currentIndex: number | undefined;

  itemAt(index: number | undefined): any;
} & QQuickLayout;

// end
