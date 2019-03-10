// script: generateTypes, version: 0.3
// dependencies
import * as QtQml from '../QtQml/types';

type Signal<T> = {
  connect: (handler: T) => void;
  disconnect: (handler: T) => void;
};

export enum QAbstractItemModel_LayoutChangeHint {
  NoLayoutChangeHint = 0,
  VerticalSortHint = 1,
  HorizontalSortHint = 2,
}

export type QAbstractItemModel = {
  submit(): boolean;
  revert(): void;
  hasIndex(row: number, column: number, parent: any): boolean;
  hasIndex(row: number, column: number): boolean;
  index(row: number, column: number, parent: any): any;
  index(row: number, column: number): any;
  parent(child: any): any;
  sibling(row: number, column: number, idx: any): any;
  rowCount(parent: any): number;
  rowCount(): number;
  columnCount(parent: any): number;
  columnCount(): number;
  hasChildren(parent: any): boolean;
  hasChildren(): boolean;
  data(index: any, role: number): any;
  data(index: any): any;
  setData(index: any, value: any, role: number): boolean;
  setData(index: any, value: any): boolean;
  headerData(section: number, orientation: any, role: number): any;
  headerData(section: number, orientation: any): any;
  fetchMore(parent: any): void;
  canFetchMore(parent: any): boolean;
  flags(index: any): any;
  match(start: any, role: number, value: any, hits: number, flags: any): any;
  match(start: any, role: number, value: any, hits: number): any;
  match(start: any, role: number, value: any): any;

  dataChanged: Signal<Function>;
  headerDataChanged: Signal<Function>;
  layoutChanged: Signal<Function>;
  layoutAboutToBeChanged: Signal<Function>;
  rowsAboutToBeInserted: Signal<Function>;
  rowsInserted: Signal<Function>;
  rowsAboutToBeRemoved: Signal<Function>;
  rowsRemoved: Signal<Function>;
  columnsAboutToBeInserted: Signal<Function>;
  columnsInserted: Signal<Function>;
  columnsAboutToBeRemoved: Signal<Function>;
  columnsRemoved: Signal<Function>;
  modelAboutToBeReset: Signal<Function>;
  modelReset: Signal<Function>;
  rowsAboutToBeMoved: Signal<Function>;
  rowsMoved: Signal<Function>;
  columnsAboutToBeMoved: Signal<Function>;
  columnsMoved: Signal<Function>;
} & QtQml.QObject;

export type QAbstractListModel = {} & QAbstractItemModel;

export enum QItemSelectionModel_SelectionFlags {
  NoUpdate = 0,
  Clear = 1,
  Select = 2,
  Deselect = 4,
  Toggle = 8,
  Current = 16,
  Rows = 32,
  Columns = 64,
  SelectCurrent = 18,
  ToggleCurrent = 24,
  ClearAndSelect = 3,
}

export type QItemSelectionModel = {
  model: QAbstractItemModel;
  readonly hasSelection: boolean;
  readonly currentIndex: any;
  readonly selection: any;
  readonly selectedIndexes: any;

  setCurrentIndex(index: any, command: any): void;
  select(index: any, command: any): void;
  select(selection: any, command: any): void;
  clear(): void;
  reset(): void;
  clearSelection(): void;
  clearCurrentIndex(): void;
  isSelected(index: any): boolean;
  isRowSelected(row: number, parent: any): boolean;
  isColumnSelected(column: number, parent: any): boolean;
  rowIntersectsSelection(row: number, parent: any): boolean;
  columnIntersectsSelection(column: number, parent: any): boolean;
  selectedRows(column: number): any;
  selectedRows(): any;
  selectedColumns(row: number): any;
  selectedColumns(): any;

  selectionChanged: Signal<Function>;
  currentChanged: Signal<Function>;
  currentRowChanged: Signal<Function>;
  currentColumnChanged: Signal<Function>;
  modelChanged: Signal<Function>;
} & QtQml.QObject;

export type QQmlDelegateModel = {
  model: any;
  delegate: QtQml.QQmlComponent;
  filterOnGroup: string;
  readonly items: QQmlDelegateModelGroup;
  readonly persistedItems: QQmlDelegateModelGroup;
  readonly groups: QQmlDelegateModelGroup;
  readonly parts: QtQml.QObject;
  rootIndex: any;

  modelIndex(idx: number): any;
  parentModelIndex(): any;

  filterGroupChanged: Signal<Function>;
  defaultGroupsChanged: Signal<Function>;
} & QtQml.QQmlInstanceModel;

export type QQmlDelegateModelAttached = {
  readonly model: QQmlDelegateModel;
  groups: any;
  readonly isUnresolved: boolean;

  unresolvedChanged: Signal<Function>;
} & QtQml.QObject;

export type QQmlDelegateModelGroup = {
  readonly count: number;
  name: string;
  includeByDefault: boolean;

  insert(param0: any): void;
  create(param0: any): void;
  resolve(param0: any): void;
  remove(param0: any): void;
  addGroups(param0: any): void;
  removeGroups(param0: any): void;
  setGroups(param0: any): void;
  move(param0: any): void;
  get(index: number): any;

  defaultIncludeChanged: Signal<Function>;
  changed: Signal<Function>;
} & QtQml.QObject;

export type QQmlDelegateModelParts = {} & QtQml.QObject;

export type QQmlListElement = {} & QtQml.QObject;

export type QQmlListModel = {
  readonly count: number;
  dynamicRoles: boolean;

  clear(): void;
  remove(args: any): void;
  append(args: any): void;
  insert(args: any): void;
  get(index: number): any;
  set(index: number, param1: any): void;
  setProperty(index: number, property: string, value: any): void;
  move(from: number, to: number, count: number): void;
  sync(): void;
} & QAbstractListModel;

export type QQmlObjectModel = {
  readonly children: QtQml.QObject;

  clear(): void;
  get(index: number): any;
  append(object: QtQml.QObject): void;
  insert(index: number, object: QtQml.QObject): void;
  move(from: number, to: number, n: number): void;
  move(from: number, to: number): void;
  remove(index: number, n: number): void;
  remove(index: number): void;
} & QtQml.QQmlInstanceModel;

export type QQmlObjectModelAttached = {
  readonly index: number;
} & QtQml.QObject;

// end
