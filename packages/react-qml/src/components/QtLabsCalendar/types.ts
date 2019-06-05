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

  monthAt(index: number | undefined): number | undefined;
  yearAt(index: number | undefined): number | undefined;
  indexOf(date: any): number | undefined;
  indexOf(
    year: number | undefined,
    month: number | undefined
  ): number | undefined;
} & QtQuick.QAbstractListModel;

export type QQuickControl = {
  font: any;
  readonly availableWidth: number;
  readonly availableHeight: number;
  padding: number | undefined;
  topPadding: number | undefined;
  leftPadding: number | undefined;
  rightPadding: number | undefined;
  bottomPadding: number | undefined;
  spacing: number | undefined;
  locale: any;
  readonly mirrored: boolean;
  focusPolicy: any;
  focusReason: any;
  readonly visualFocus: boolean;
  readonly hovered: boolean;
  hoverEnabled: boolean | undefined;
  wheelEnabled: boolean | undefined;
  background: QtQuick.QQuickItem | null;
  contentItem: QtQuick.QQuickItem | null;
  palette: any;

  paletteChanged: Signal<Function>;
} & QtQuick.QQuickItem;

export type QQuickDayOfWeekRow = {
  source: any;
  delegate: QtQml.QQmlComponent | null;
} & QQuickControl;

export type QQuickMonthGrid = {
  month: number | undefined;
  year: number | undefined;
  source: any;
  title: string | undefined;
  delegate: QtQml.QQmlComponent | null;

  pressed: Signal<Function>;
  released: Signal<Function>;
  clicked: Signal<Function>;
  pressAndHold: Signal<Function>;
} & QQuickControl;

export type QQuickWeekNumberColumn = {
  month: number | undefined;
  year: number | undefined;
  source: any;
  delegate: QtQml.QQmlComponent | null;
} & QQuickControl;

// end
