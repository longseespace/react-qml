// script: generateTypes, version: 0.3
// dependencies
import * as QtQml from '../QtQml/types';
import * as QtQuick from '../QtQuick/types';

type Signal<T> = {
  connect: (handler: T) => void;
  disconnect: (handler: T) => void;
};

export enum QPlatformDialogHelper_StandardButtons {
  NoButton = 0,
  Ok = 1024,
  Save = 2048,
  SaveAll = 4096,
  Open = 8192,
  Yes = 16384,
  YesToAll = 32768,
  No = 65536,
  NoToAll = 131072,
  Abort = 262144,
  Retry = 524288,
  Ignore = 1048576,
  Close = 2097152,
  Cancel = 4194304,
  Discard = 8388608,
  Help = 16777216,
  Apply = 33554432,
  Reset = 67108864,
  RestoreDefaults = 134217728,
  FirstButton = 1024,
  LastButton = 134217728,
  LowestBit = 10,
  HighestBit = 27,
}
export enum QPlatformDialogHelper_ButtonRole {
  InvalidRole = -1,
  AcceptRole = 0,
  RejectRole = 1,
  DestructiveRole = 2,
  ActionRole = 3,
  HelpRole = 4,
  YesRole = 5,
  NoRole = 6,
  ResetRole = 7,
  ApplyRole = 8,
  NRoles = 9,
  RoleMask = 268435455,
  AlternateRole = 268435456,
  Stretch = 536870912,
  Reverse = 1073741824,
  EOL = -1,
}

export type QPlatformDialogHelper = {
  accept: Signal<Function>;
  reject: Signal<Function>;
} & QtQml.QObject;

export type QQuickPlatformColorDialog = {
  color: any;
  currentColor: any;
  options: any;
} & QQuickPlatformDialog;

export enum QQuickPlatformDialog_StandardCode {
  Rejected = 0,
  Accepted = 1,
}

export type QQuickPlatformDialog = {
  readonly data: QtQml.QObject;
  parentWindow: any;
  title: string;
  flags: any;
  modality: any;
  visible: boolean;
  result: number;

  open(): void;
  close(): void;
  accept(): void;
  reject(): void;
  done(result: number): void;

  accepted: Signal<Function>;
  rejected: Signal<Function>;
} & QtQml.QObject;

export enum QQuickPlatformFileDialog_FileMode {
  OpenFile = 0,
  OpenFiles = 1,
  SaveFile = 2,
}

export type QQuickPlatformFileDialog = {
  fileMode: QQuickPlatformFileDialog_FileMode;
  file: string;
  files: any;
  currentFile: string;
  currentFiles: any;
  folder: string;
  options: any;
  nameFilters: any;
  readonly selectedNameFilter: QQuickPlatformFileNameFilter;
  defaultSuffix: string;
  acceptLabel: string;
  rejectLabel: string;
} & QQuickPlatformDialog;

export type QQuickPlatformFileNameFilter = {
  index: number;
  readonly name: string;
  readonly extensions: any;

  indexChanged: Signal<Function>;
  nameChanged: Signal<Function>;
  extensionsChanged: Signal<Function>;
} & QtQml.QObject;

export type QQuickPlatformFolderDialog = {
  folder: string;
  currentFolder: string;
  options: any;
  acceptLabel: string;
  rejectLabel: string;
} & QQuickPlatformDialog;

export type QQuickPlatformFontDialog = {
  font: any;
  currentFont: any;
  options: any;
} & QQuickPlatformDialog;

export type QQuickPlatformMenu = {
  readonly data: QtQml.QObject;
  readonly items: QQuickPlatformMenuItem;
  readonly menuBar: QQuickPlatformMenuBar;
  readonly parentMenu: QQuickPlatformMenu;
  readonly systemTrayIcon: QQuickPlatformSystemTrayIcon;
  readonly menuItem: QQuickPlatformMenuItem;
  enabled: boolean;
  visible: boolean;
  minimumWidth: number;
  type: any;
  title: string;
  iconSource: string;
  iconName: string;
  font: any;

  open(args: any): void;
  close(): void;
  addItem(item: QQuickPlatformMenuItem): void;
  insertItem(index: number, item: QQuickPlatformMenuItem): void;
  removeItem(item: QQuickPlatformMenuItem): void;
  addMenu(menu: QQuickPlatformMenu): void;
  insertMenu(index: number, menu: QQuickPlatformMenu): void;
  removeMenu(menu: QQuickPlatformMenu): void;
  clear(): void;

  aboutToShow: Signal<Function>;
  aboutToHide: Signal<Function>;
} & QtQml.QObject;

export type QQuickPlatformMenuBar = {
  readonly data: QtQml.QObject;
  readonly menus: QQuickPlatformMenu;
  window: any;

  addMenu(menu: QQuickPlatformMenu): void;
  insertMenu(index: number, menu: QQuickPlatformMenu): void;
  removeMenu(menu: QQuickPlatformMenu): void;
  clear(): void;
} & QtQml.QObject;

export type QQuickPlatformMenuItem = {
  readonly menu: QQuickPlatformMenu;
  readonly subMenu: QQuickPlatformMenu;
  group: QQuickPlatformMenuItemGroup;
  enabled: boolean;
  visible: boolean;
  separator: boolean;
  checkable: boolean;
  checked: boolean;
  role: any;
  text: string;
  iconSource: string;
  iconName: string;
  shortcut: any;
  font: any;

  toggle(): void;

  triggered: Signal<Function>;
  hovered: Signal<Function>;
} & QtQml.QObject;

export type QQuickPlatformMenuItemGroup = {
  enabled: boolean;
  visible: boolean;
  exclusive: boolean;
  checkedItem: QQuickPlatformMenuItem;
  readonly items: QQuickPlatformMenuItem;

  addItem(item: QQuickPlatformMenuItem): void;
  removeItem(item: QQuickPlatformMenuItem): void;
  clear(): void;

  triggered: Signal<Function>;
  hovered: Signal<Function>;
} & QtQml.QObject;

export type QQuickPlatformMenuSeparator = {} & QQuickPlatformMenuItem;

export type QQuickPlatformMessageDialog = {
  text: string;
  informativeText: string;
  detailedText: string;
  buttons: any;

  clicked: Signal<Function>;
  okClicked: Signal<Function>;
  saveClicked: Signal<Function>;
  saveAllClicked: Signal<Function>;
  openClicked: Signal<Function>;
  yesClicked: Signal<Function>;
  yesToAllClicked: Signal<Function>;
  noClicked: Signal<Function>;
  noToAllClicked: Signal<Function>;
  abortClicked: Signal<Function>;
  retryClicked: Signal<Function>;
  ignoreClicked: Signal<Function>;
  closeClicked: Signal<Function>;
  cancelClicked: Signal<Function>;
  discardClicked: Signal<Function>;
  helpClicked: Signal<Function>;
  applyClicked: Signal<Function>;
  resetClicked: Signal<Function>;
  restoreDefaultsClicked: Signal<Function>;
} & QQuickPlatformDialog;

export type QQuickPlatformStandardPaths = {
  displayName(type: any): string;
  findExecutable(executableName: string, paths: any): string;
  findExecutable(executableName: string): string;
  locate(type: any, fileName: string, options: any): string;
  locate(type: any, fileName: string): string;
  locateAll(type: any, fileName: string, options: any): any;
  locateAll(type: any, fileName: string): any;
  setTestModeEnabled(testMode: boolean): void;
  standardLocations(type: any): any;
  writableLocation(type: any): string;
} & QtQml.QObject;

export type QQuickPlatformSystemTrayIcon = {
  readonly available: boolean;
  readonly supportsMessages: boolean;
  visible: boolean;
  iconSource: string;
  iconName: string;
  tooltip: string;
  menu: QQuickPlatformMenu;

  show(): void;
  hide(): void;
  showMessage(
    title: string,
    message: string,
    iconType: any,
    msecs: number
  ): void;
  showMessage(title: string, message: string, iconType: any): void;
  showMessage(title: string, message: string): void;

  activated: Signal<Function>;
  messageClicked: Signal<Function>;
} & QtQml.QObject;

// end
