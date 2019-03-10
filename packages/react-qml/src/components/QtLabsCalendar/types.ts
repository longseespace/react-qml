// script: generateTypes, version: 0.3
// dependencies
import * as QtQml from '../QtQml/types';
import * as QtQuick from '../QtQuick/types';

type Signal<T> = {
  connect: (handler: T) => void;
  disconnect: (handler: T) => void;
};

export enum QQuickCalendar_Month {
  January = 0,
  February = 1,
  March = 2,
  April = 3,
  May = 4,
  June = 5,
  July = 6,
  August = 7,
  September = 8,
  October = 9,
  November = 10,
  December = 11,
}

export type QQuickCalendar = {} & QtQml.QObject;

export type QQuickCalendarModel = {
  from: any;
  to: any;
  readonly count: number;

  monthAt(index: number): number;
  yearAt(index: number): number;
  indexOf(date: any): number;
  indexOf(year: number, month: number): number;
} & QtQuick.QAbstractListModel;

export type QQuickControl = {
  font: any;
  readonly availableWidth: number;
  readonly availableHeight: number;
  padding: number;
  topPadding: number;
  leftPadding: number;
  rightPadding: number;
  bottomPadding: number;
  spacing: number;
  locale: any;
  readonly mirrored: boolean;
  focusPolicy: any;
  focusReason: any;
  readonly visualFocus: boolean;
  readonly hovered: boolean;
  hoverEnabled: boolean;
  wheelEnabled: boolean;
  background: QtQuick.QQuickItem;
  contentItem: QtQuick.QQuickItem;
  palette: any;

  paletteChanged: Signal<Function>;
} & QtQuick.QQuickItem;

export type QQuickDayOfWeekRow = {
  source: any;
  delegate: QtQml.QQmlComponent;
} & QQuickControl;

export type QQuickMonthGrid = {
  month: number;
  year: number;
  source: any;
  title: string;
  delegate: QtQml.QQmlComponent;

  pressed: Signal<Function>;
  released: Signal<Function>;
  clicked: Signal<Function>;
  pressAndHold: Signal<Function>;
} & QQuickControl;

export type QQuickWeekNumberColumn = {
  month: number;
  year: number;
  source: any;
  delegate: QtQml.QQmlComponent;
} & QQuickControl;

// end
