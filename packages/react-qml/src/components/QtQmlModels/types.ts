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
  submit(): boolean | undefined;
  revert(): void;
  hasIndex(
    row: number | undefined,
    column: number | undefined,
    parent: any
  ): boolean | undefined;
  hasIndex(
    row: number | undefined,
    column: number | undefined
  ): boolean | undefined;
  index(row: number | undefined, column: number | undefined, parent: any): any;
  index(row: number | undefined, column: number | undefined): any;
  parent(child: any): any;
  sibling(row: number | undefined, column: number | undefined, idx: any): any;
  rowCount(parent: any): number | undefined;
  rowCount(): number | undefined;
  columnCount(parent: any): number | undefined;
  columnCount(): number | undefined;
  hasChildren(parent: any): boolean | undefined;
  hasChildren(): boolean | undefined;
  data(index: any, role: number | undefined): any;
  data(index: any): any;
  setData(
    index: any,
    value: any,
    role: number | undefined
  ): boolean | undefined;
  setData(index: any, value: any): boolean | undefined;
  headerData(
    section: number | undefined,
    orientation: any,
    role: number | undefined
  ): any;
  headerData(section: number | undefined, orientation: any): any;
  fetchMore(parent: any): void;
  canFetchMore(parent: any): boolean | undefined;
  flags(index: any): any;
  match(
    start: any,
    role: number | undefined,
    value: any,
    hits: number | undefined,
    flags: any
  ): any;
  match(
    start: any,
    role: number | undefined,
    value: any,
    hits: number | undefined
  ): any;
  match(start: any, role: number | undefined, value: any): any;

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
  model: QAbstractItemModel | null;
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
  isSelected(index: any): boolean | undefined;
  isRowSelected(row: number | undefined, parent: any): boolean | undefined;
  isColumnSelected(
    column: number | undefined,
    parent: any
  ): boolean | undefined;
  rowIntersectsSelection(
    row: number | undefined,
    parent: any
  ): boolean | undefined;
  columnIntersectsSelection(
    column: number | undefined,
    parent: any
  ): boolean | undefined;
  selectedRows(column: number | undefined): any;
  selectedRows(): any;
  selectedColumns(row: number | undefined): any;
  selectedColumns(): any;

  selectionChanged: Signal<Function>;
  currentChanged: Signal<Function>;
  currentRowChanged: Signal<Function>;
  currentColumnChanged: Signal<Function>;
  modelChanged: Signal<Function>;
} & QtQml.QObject;

export type QQmlDelegateModel = {
  model: any;
  delegate: QtQml.QQmlComponent | null;
  filterOnGroup: string | undefined;
  readonly items: QQmlDelegateModelGroup;
  readonly persistedItems: QQmlDelegateModelGroup;
  readonly groups: QQmlDelegateModelGroup;
  readonly parts: QtQml.QObject;
  rootIndex: any;

  modelIndex(idx: number | undefined): any;
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
  name: string | undefined;
  includeByDefault: boolean | undefined;

  insert(param0: any): void;
  create(param0: any): void;
  resolve(param0: any): void;
  remove(param0: any): void;
  addGroups(param0: any): void;
  removeGroups(param0: any): void;
  setGroups(param0: any): void;
  move(param0: any): void;
  get(index: number | undefined): any;

  defaultIncludeChanged: Signal<Function>;
  changed: Signal<Function>;
} & QtQml.QObject;

export type QQmlDelegateModelParts = {} & QtQml.QObject;

export type QQmlListElement = {} & QtQml.QObject;

export type QQmlListModel = {
  readonly count: number;
  dynamicRoles: boolean | undefined;

  clear(): void;
  remove(args: any): void;
  append(args: any): void;
  insert(args: any): void;
  get(index: number | undefined): any;
  set(index: number | undefined, param1: any): void;
  setProperty(
    index: number | undefined,
    property: string | undefined,
    value: any
  ): void;
  move(
    from: number | undefined,
    to: number | undefined,
    count: number | undefined
  ): void;
  sync(): void;
} & QAbstractListModel;

export type QQmlObjectModel = {
  readonly children: QtQml.QObject;

  clear(): void;
  get(index: number | undefined): any;
  append(object: QtQml.QObject | null): void;
  insert(index: number | undefined, object: QtQml.QObject | null): void;
  move(
    from: number | undefined,
    to: number | undefined,
    n: number | undefined
  ): void;
  move(from: number | undefined, to: number | undefined): void;
  remove(index: number | undefined, n: number | undefined): void;
  remove(index: number | undefined): void;
} & QtQml.QQmlInstanceModel;

export type QQmlObjectModelAttached = {
  readonly index: number;
} & QtQml.QObject;

// end
