// script: generateTypes, version: 0.3
// dependencies
import * as QtQml from '../QtQml/types';
import * as QtQuick from '../QtQuick/types';

type Signal<T> = {
  connect: (handler: T) => void;
  disconnect: (handler: T) => void;
}


  export enum QPlatformDialogHelper_StandardButtons{
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
HighestBit = 27
    }
export enum QPlatformDialogHelper_ButtonRole{
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
EOL = -1
    }

  export type QPlatformDialogHelper = {
  

  

  accept: Signal<Function>;
reject: Signal<Function>;

  } & QtQml.QObject



  export type QQuickPlatformColorDialog = {
  color: any;
currentColor: any;
options: any;

  

  

  } & QQuickPlatformDialog

export enum QQuickPlatformDialog_StandardCode{
  Rejected = 0,
Accepted = 1
    }

  export type QQuickPlatformDialog = {
  readonly data: QtQml.QObject;
parentWindow: any;
title: string | undefined;
flags: any;
modality: any;
visible: boolean | undefined;
result: number | undefined;

  open(): void;
close(): void;
accept(): void;
reject(): void;
done(result: number | undefined): void;

  accepted: Signal<Function>;
rejected: Signal<Function>;

  } & QtQml.QObject

export enum QQuickPlatformFileDialog_FileMode{
  OpenFile = 0,
OpenFiles = 1,
SaveFile = 2
    }

  export type QQuickPlatformFileDialog = {
  fileMode: QQuickPlatformFileDialog_FileMode | string;
file: string | undefined;
files: any;
currentFile: string | undefined;
currentFiles: any;
folder: string | undefined;
options: any;
nameFilters: any;
readonly selectedNameFilter: QQuickPlatformFileNameFilter;
defaultSuffix: string | undefined;
acceptLabel: string | undefined;
rejectLabel: string | undefined;

  

  

  } & QQuickPlatformDialog



  export type QQuickPlatformFileNameFilter = {
  index: number | undefined;
readonly name: string;
readonly extensions: any;

  

  indexChanged: Signal<Function>;
nameChanged: Signal<Function>;
extensionsChanged: Signal<Function>;

  } & QtQml.QObject



  export type QQuickPlatformFolderDialog = {
  folder: string | undefined;
currentFolder: string | undefined;
options: any;
acceptLabel: string | undefined;
rejectLabel: string | undefined;

  

  

  } & QQuickPlatformDialog



  export type QQuickPlatformFontDialog = {
  font: any;
currentFont: any;
options: any;

  

  

  } & QQuickPlatformDialog



  export type QQuickPlatformMenu = {
  readonly data: QtQml.QObject;
readonly items: QQuickPlatformMenuItem;
readonly menuBar: QQuickPlatformMenuBar;
readonly parentMenu: QQuickPlatformMenu;
readonly systemTrayIcon: QQuickPlatformSystemTrayIcon;
readonly menuItem: QQuickPlatformMenuItem;
enabled: boolean | undefined;
visible: boolean | undefined;
minimumWidth: number | undefined;
type: any;
title: string | undefined;
iconSource: string | undefined;
iconName: string | undefined;
font: any;

  open(args: any): void;
close(): void;
addItem(item: QQuickPlatformMenuItem | null): void;
insertItem(index: number | undefined, item: QQuickPlatformMenuItem | null): void;
removeItem(item: QQuickPlatformMenuItem | null): void;
addMenu(menu: QQuickPlatformMenu | null): void;
insertMenu(index: number | undefined, menu: QQuickPlatformMenu | null): void;
removeMenu(menu: QQuickPlatformMenu | null): void;
clear(): void;

  aboutToShow: Signal<Function>;
aboutToHide: Signal<Function>;

  } & QtQml.QObject



  export type QQuickPlatformMenuBar = {
  readonly data: QtQml.QObject;
readonly menus: QQuickPlatformMenu;
window: any;

  addMenu(menu: QQuickPlatformMenu | null): void;
insertMenu(index: number | undefined, menu: QQuickPlatformMenu | null): void;
removeMenu(menu: QQuickPlatformMenu | null): void;
clear(): void;

  

  } & QtQml.QObject



  export type QQuickPlatformMenuItem = {
  readonly menu: QQuickPlatformMenu;
readonly subMenu: QQuickPlatformMenu;
group: QQuickPlatformMenuItemGroup | null;
enabled: boolean | undefined;
visible: boolean | undefined;
separator: boolean | undefined;
checkable: boolean | undefined;
checked: boolean | undefined;
role: any;
text: string | undefined;
iconSource: string | undefined;
iconName: string | undefined;
shortcut: any;
font: any;

  toggle(): void;

  triggered: Signal<Function>;
hovered: Signal<Function>;

  } & QtQml.QObject



  export type QQuickPlatformMenuItemGroup = {
  enabled: boolean | undefined;
visible: boolean | undefined;
exclusive: boolean | undefined;
checkedItem: QQuickPlatformMenuItem | null;
readonly items: QQuickPlatformMenuItem;

  addItem(item: QQuickPlatformMenuItem | null): void;
removeItem(item: QQuickPlatformMenuItem | null): void;
clear(): void;

  triggered: Signal<Function>;
hovered: Signal<Function>;

  } & QtQml.QObject



  export type QQuickPlatformMenuSeparator = {
  

  

  

  } & QQuickPlatformMenuItem



  export type QQuickPlatformMessageDialog = {
  text: string | undefined;
informativeText: string | undefined;
detailedText: string | undefined;
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

  } & QQuickPlatformDialog



  export type QQuickPlatformStandardPaths = {
  

  displayName(type: any): string | undefined;
findExecutable(executableName: string | undefined, paths: any): string | undefined;
findExecutable(executableName: string | undefined): string | undefined;
locate(type: any, fileName: string | undefined, options: any): string | undefined;
locate(type: any, fileName: string | undefined): string | undefined;
locateAll(type: any, fileName: string | undefined, options: any): any;
locateAll(type: any, fileName: string | undefined): any;
setTestModeEnabled(testMode: boolean | undefined): void;
standardLocations(type: any): any;
writableLocation(type: any): string | undefined;

  

  } & QtQml.QObject



  export type QQuickPlatformSystemTrayIcon = {
  readonly available: boolean;
readonly supportsMessages: boolean;
visible: boolean | undefined;
iconSource: string | undefined;
iconName: string | undefined;
tooltip: string | undefined;
menu: QQuickPlatformMenu | null;

  show(): void;
hide(): void;
showMessage(title: string | undefined, message: string | undefined, iconType: any, msecs: number | undefined): void;
showMessage(title: string | undefined, message: string | undefined, iconType: any): void;
showMessage(title: string | undefined, message: string | undefined): void;

  activated: Signal<Function>;
messageClicked: Signal<Function>;

  } & QtQml.QObject

  // end