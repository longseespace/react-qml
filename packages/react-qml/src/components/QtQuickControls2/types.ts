// script: generateTypes, version: 0.3
// dependencies
import * as QtQml from '../QtQml/types';
import * as QtQuick from '../QtQuick/types';
import * as QtQuickWindow from '../QtQuickWindow/types';

type Signal<T> = {
  connect: (handler: T) => void;
  disconnect: (handler: T) => void;
};

export type QQuickCheckLabel = {} & QtQuick.QQuickText;

export type QQuickColor = {
  transparent(color: any, opacity: number | undefined): any;
  blend(a: any, b: any, factor: number | undefined): any;
} & QtQml.QObject;

export type QQuickColorImage = {
  color: any;
  defaultColor: any;
} & QtQuick.QQuickImage;

export type QQuickDefaultBusyIndicator = {
  pen: any;
  fill: any;
} & QtQuick.QQuickItem;

export type QQuickDefaultDial = {
  progress: number | undefined;
  color: any;
} & QtQuick.QQuickPaintedItem;

export type QQuickDefaultProgressBar = {
  indeterminate: boolean | undefined;
  progress: number | undefined;
  color: any;
} & QtQuick.QQuickItem;

export type QQuickDefaultStyle = {
  readonly backgroundColor: any;
  readonly overlayModalColor: any;
  readonly overlayDimColor: any;
  readonly textColor: any;
  readonly textDarkColor: any;
  readonly textLightColor: any;
  readonly textLinkColor: any;
  readonly textSelectionColor: any;
  readonly textDisabledColor: any;
  readonly textDisabledLightColor: any;
  readonly textPlaceholderColor: any;
  readonly focusColor: any;
  readonly focusLightColor: any;
  readonly focusPressedColor: any;
  readonly buttonColor: any;
  readonly buttonPressedColor: any;
  readonly buttonCheckedColor: any;
  readonly buttonCheckedPressedColor: any;
  readonly buttonCheckedFocusColor: any;
  readonly toolButtonColor: any;
  readonly tabButtonColor: any;
  readonly tabButtonPressedColor: any;
  readonly tabButtonCheckedPressedColor: any;
  readonly delegateColor: any;
  readonly delegatePressedColor: any;
  readonly delegateFocusColor: any;
  readonly indicatorPressedColor: any;
  readonly indicatorDisabledColor: any;
  readonly indicatorFrameColor: any;
  readonly indicatorFramePressedColor: any;
  readonly indicatorFrameDisabledColor: any;
  readonly frameDarkColor: any;
  readonly frameLightColor: any;
  readonly scrollBarColor: any;
  readonly scrollBarPressedColor: any;
  readonly progressBarColor: any;
  readonly pageIndicatorColor: any;
  readonly separatorColor: any;
  readonly disabledDarkColor: any;
  readonly disabledLightColor: any;
} & QtQml.QObject;

export type QQuickIconImage = {
  name: string | undefined;
  color: any;
} & QtQuick.QQuickImage;

export enum QQuickIconLabel_Display {
  IconOnly = 0,
  TextOnly = 1,
  TextBesideIcon = 2,
  TextUnderIcon = 3,
}

export type QQuickIconLabel = {
  icon: any;
  text: string | undefined;
  font: any;
  color: any;
  display: QQuickIconLabel_Display | string;
  spacing: number | undefined;
  mirrored: boolean | undefined;
  alignment: any;
  topPadding: number | undefined;
  leftPadding: number | undefined;
  rightPadding: number | undefined;
  bottomPadding: number | undefined;
} & QtQuick.QQuickItem;

export type QQuickMnemonicLabel = {
  text: string | undefined;
  mnemonicVisible: boolean | undefined;
} & QtQuick.QQuickText;

export type QQuickPaddedRectangle = {
  padding: number | undefined;
  topPadding: number | undefined;
  leftPadding: number | undefined;
  rightPadding: number | undefined;
  bottomPadding: number | undefined;
} & QtQuick.QQuickRectangle;

export type QQuickPlaceholderText = {} & QtQuick.QQuickText;

export type QQuickTumblerView = {
  model: any;
  delegate: QtQml.QQmlComponent | null;
  path: QtQuick.QQuickPath | null;
} & QtQuick.QQuickItem;

export enum QQuickAbstractButton_Display {
  IconOnly = 0,
  TextOnly = 1,
  TextBesideIcon = 2,
  TextUnderIcon = 3,
}

export type QQuickAbstractButton = {
  text: string | undefined;
  down: boolean | undefined;
  readonly pressed: boolean;
  checked: boolean | undefined;
  checkable: boolean | undefined;
  autoExclusive: boolean | undefined;
  indicator: QtQuick.QQuickItem | null;
  icon: any;
  display: QQuickAbstractButton_Display | string;
  action: QQuickAction | null;

  toggle(): void;

  released: Signal<Function>;
  canceled: Signal<Function>;
  clicked: Signal<Function>;
  pressAndHold: Signal<Function>;
  doubleClicked: Signal<Function>;
  toggled: Signal<Function>;
  iconChanged: Signal<Function>;
  displayChanged: Signal<Function>;
  actionChanged: Signal<Function>;
} & QQuickControl;

export type QQuickAction = {
  text: string | undefined;
  icon: any;
  enabled: boolean | undefined;
  checked: boolean | undefined;
  checkable: boolean | undefined;
  shortcut: any;

  toggle(source: QtQml.QObject | null): void;
  toggle(): void;
  trigger(source: QtQml.QObject | null): void;
  trigger(): void;

  textChanged: Signal<Function>;
  iconChanged: Signal<Function>;
  enabledChanged: Signal<Function>;
  checkedChanged: Signal<Function>;
  checkableChanged: Signal<Function>;
  shortcutChanged: Signal<Function>;
  toggled: Signal<Function>;
  triggered: Signal<Function>;
} & QtQml.QObject;

export type QQuickActionGroup = {
  checkedAction: QQuickAction | null;
  readonly actions: QQuickAction;
  exclusive: boolean | undefined;
  enabled: boolean | undefined;

  addAction(action: QQuickAction | null): void;
  removeAction(action: QQuickAction | null): void;

  triggered: Signal<Function>;
} & QtQml.QObject;

export type QQuickActionGroupAttached = {
  group: QQuickActionGroup | null;
} & QtQml.QObject;

export type QQuickApplicationWindow = {
  background: QtQuick.QQuickItem | null;
  readonly contentItem: QtQuick.QQuickItem;
  readonly contentData: QtQml.QObject;
  readonly activeFocusControl: QtQuick.QQuickItem;
  header: QtQuick.QQuickItem | null;
  footer: QtQuick.QQuickItem | null;
  readonly overlay: QQuickOverlay;
  font: any;
  locale: any;
  palette: any;
  menuBar: QtQuick.QQuickItem | null;

  paletteChanged: Signal<Function>;
  menuBarChanged: Signal<Function>;
} & QtQuickWindow.QQuickWindowQmlImpl;

export type QQuickApplicationWindowAttached = {
  readonly window: QQuickApplicationWindow;
  readonly contentItem: QtQuick.QQuickItem;
  readonly activeFocusControl: QtQuick.QQuickItem;
  readonly header: QtQuick.QQuickItem;
  readonly footer: QtQuick.QQuickItem;
  readonly overlay: QQuickOverlay;
  readonly menuBar: QtQuick.QQuickItem;
} & QtQml.QObject;

export type QQuickBusyIndicator = {
  running: boolean | undefined;
} & QQuickControl;

export type QQuickButton = {
  autoRepeat: boolean | undefined;
  highlighted: boolean | undefined;
  flat: boolean | undefined;
} & QQuickAbstractButton;

export type QQuickButtonGroup = {
  checkedButton: QQuickAbstractButton | null;
  readonly buttons: QQuickAbstractButton;
  exclusive: boolean | undefined;

  addButton(button: QQuickAbstractButton | null): void;
  removeButton(button: QQuickAbstractButton | null): void;

  clicked: Signal<Function>;
  exclusiveChanged: Signal<Function>;
} & QtQml.QObject;

export type QQuickButtonGroupAttached = {
  group: QQuickButtonGroup | null;
} & QtQml.QObject;

export type QQuickCheckBox = {
  tristate: boolean | undefined;
  checkState: any;
} & QQuickAbstractButton;

export type QQuickCheckDelegate = {
  tristate: boolean | undefined;
  checkState: any;
} & QQuickItemDelegate;

export type QQuickComboBox = {
  readonly count: number;
  model: any;
  readonly delegateModel: QtQml.QQmlInstanceModel;
  pressed: boolean | undefined;
  readonly highlightedIndex: number;
  currentIndex: number | undefined;
  readonly currentText: string;
  displayText: string | undefined;
  textRole: string | undefined;
  delegate: QtQml.QQmlComponent | null;
  indicator: QtQuick.QQuickItem | null;
  popup: QQuickPopup | null;
  flat: boolean | undefined;
  down: boolean | undefined;
  editable: boolean | undefined;
  editText: string | undefined;
  validator: QtQuick.QValidator | null;
  inputMethodHints: any;
  readonly inputMethodComposing: boolean;
  readonly acceptableInput: boolean;

  incrementCurrentIndex(): void;
  decrementCurrentIndex(): void;
  selectAll(): void;
  textAt(index: number | undefined): string | undefined;
  find(text: string | undefined, flags: any): number | undefined;
  find(text: string | undefined): number | undefined;

  activated: Signal<Function>;
  highlighted: Signal<Function>;
  flatChanged: Signal<Function>;
  accepted: Signal<Function>;
  downChanged: Signal<Function>;
  editableChanged: Signal<Function>;
  editTextChanged: Signal<Function>;
  validatorChanged: Signal<Function>;
  inputMethodHintsChanged: Signal<Function>;
  inputMethodComposingChanged: Signal<Function>;
  acceptableInputChanged: Signal<Function>;
} & QQuickControl;

export type QQuickContainer = {
  readonly count: number;
  readonly contentModel: any;
  readonly contentData: QtQml.QObject;
  readonly contentChildren: QtQuick.QQuickItem;
  currentIndex: number | undefined;
  readonly currentItem: QtQuick.QQuickItem;

  setCurrentIndex(index: number | undefined): void;
  incrementCurrentIndex(): void;
  decrementCurrentIndex(): void;
  itemAt(index: number | undefined): any;
  addItem(item: QtQuick.QQuickItem | null): void;
  insertItem(index: number | undefined, item: QtQuick.QQuickItem | null): void;
  moveItem(from: number | undefined, to: number | undefined): void;
  removeItem(item: any): void;
  takeItem(index: number | undefined): any;
} & QQuickControl;

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

export type QQuickDelayButton = {
  delay: number | undefined;
  progress: number | undefined;
  transition: QtQuick.QQuickTransition | null;

  activated: Signal<Function>;
} & QQuickAbstractButton;

export enum QQuickDial_SnapMode {
  NoSnap = 0,
  SnapAlways = 1,
  SnapOnRelease = 2,
}

export type QQuickDial = {
  from: number | undefined;
  to: number | undefined;
  value: number | undefined;
  readonly position: number;
  readonly angle: number;
  stepSize: number | undefined;
  snapMode: QQuickDial_SnapMode | string;
  wrap: boolean | undefined;
  readonly pressed: boolean;
  handle: QtQuick.QQuickItem | null;
  live: boolean | undefined;

  increase(): void;
  decrease(): void;

  moved: Signal<Function>;
  liveChanged: Signal<Function>;
} & QQuickControl;

export enum QQuickDialog_StandardCode {
  Rejected = 0,
  Accepted = 1,
}

export type QQuickDialog = {
  title: string | undefined;
  header: QtQuick.QQuickItem | null;
  footer: QtQuick.QQuickItem | null;
  standardButtons: any;
  result: number | undefined;

  accept(): void;
  reject(): void;
  done(result: number | undefined): void;
  standardButton(button: any): any;

  accepted: Signal<Function>;
  rejected: Signal<Function>;
  applied: Signal<Function>;
  reset: Signal<Function>;
  discarded: Signal<Function>;
  helpRequested: Signal<Function>;
  resultChanged: Signal<Function>;
} & QQuickPopup;

export enum QQuickDialogButtonBox_Position {
  Header = 0,
  Footer = 1,
}

export type QQuickDialogButtonBox = {
  position: QQuickDialogButtonBox_Position | string;
  alignment: any;
  standardButtons: any;
  delegate: QtQml.QQmlComponent | null;

  standardButton(button: any): any;

  accepted: Signal<Function>;
  rejected: Signal<Function>;
  helpRequested: Signal<Function>;
  applied: Signal<Function>;
  reset: Signal<Function>;
  discarded: Signal<Function>;
  clicked: Signal<Function>;
} & QQuickContainer;

export type QQuickDialogButtonBoxAttached = {
  readonly buttonBox: QQuickDialogButtonBox;
  buttonRole: any;
} & QtQml.QObject;

export type QQuickDrawer = {
  edge: any;
  position: number | undefined;
  dragMargin: number | undefined;
  interactive: boolean | undefined;

  interactiveChanged: Signal<Function>;
} & QQuickPopup;

export type QQuickFrame = {} & QQuickPane;

export type QQuickGroupBox = {
  title: string | undefined;
  label: QtQuick.QQuickItem | null;
} & QQuickFrame;

export type QQuickItemDelegate = {
  highlighted: boolean | undefined;
} & QQuickAbstractButton;

export type QQuickLabel = {
  font: any;
  background: QtQuick.QQuickItem | null;
  palette: any;

  paletteChanged: Signal<Function>;
} & QtQuick.QQuickText;

export type QQuickMenu = {
  readonly count: number;
  readonly contentModel: any;
  readonly contentData: QtQml.QObject;
  title: string | undefined;
  cascade: boolean | undefined;
  overlap: number | undefined;
  delegate: QtQml.QQmlComponent | null;
  currentIndex: number | undefined;

  itemAt(index: number | undefined): any;
  addItem(item: QtQuick.QQuickItem | null): void;
  insertItem(index: number | undefined, item: QtQuick.QQuickItem | null): void;
  moveItem(from: number | undefined, to: number | undefined): void;
  removeItem(item: any): void;
  takeItem(index: number | undefined): any;
  menuAt(index: number | undefined): any;
  addMenu(menu: QQuickMenu | null): void;
  insertMenu(index: number | undefined, menu: QQuickMenu | null): void;
  removeMenu(menu: QQuickMenu | null): void;
  takeMenu(index: number | undefined): any;
  actionAt(index: number | undefined): any;
  addAction(action: QQuickAction | null): void;
  insertAction(index: number | undefined, action: QQuickAction | null): void;
  removeAction(action: QQuickAction | null): void;
  takeAction(index: number | undefined): any;
  popup(args: any): void;
  dismiss(): void;

  countChanged: Signal<Function>;
  titleChanged: Signal<Function>;
  cascadeChanged: Signal<Function>;
  overlapChanged: Signal<Function>;
  delegateChanged: Signal<Function>;
  currentIndexChanged: Signal<Function>;
} & QQuickPopup;

export type QQuickMenuBar = {
  delegate: QtQml.QQmlComponent | null;
  contentWidth: number | undefined;
  contentHeight: number | undefined;
  readonly menus: QQuickMenu;
  readonly contentData: QtQml.QObject;

  menuAt(index: number | undefined): any;
  addMenu(menu: QQuickMenu | null): void;
  insertMenu(index: number | undefined, menu: QQuickMenu | null): void;
  removeMenu(menu: QQuickMenu | null): void;
  takeMenu(index: number | undefined): any;
} & QQuickContainer;

export type QQuickMenuBarItem = {
  readonly menuBar: QQuickMenuBar;
  menu: QQuickMenu | null;
  highlighted: boolean | undefined;

  triggered: Signal<Function>;
} & QQuickAbstractButton;

export type QQuickMenuItem = {
  highlighted: boolean | undefined;
  arrow: QtQuick.QQuickItem | null;
  readonly menu: QQuickMenu;
  readonly subMenu: QQuickMenu;

  triggered: Signal<Function>;
  arrowChanged: Signal<Function>;
  menuChanged: Signal<Function>;
  subMenuChanged: Signal<Function>;
} & QQuickAbstractButton;

export type QQuickMenuSeparator = {} & QQuickControl;

export type QQuickOverlay = {
  modal: QtQml.QQmlComponent | null;
  modeless: QtQml.QQmlComponent | null;

  pressed: Signal<Function>;
  released: Signal<Function>;
} & QtQuick.QQuickItem;

export type QQuickOverlayAttached = {
  readonly overlay: QQuickOverlay;
  modal: QtQml.QQmlComponent | null;
  modeless: QtQml.QQmlComponent | null;

  pressed: Signal<Function>;
  released: Signal<Function>;
} & QtQml.QObject;

export type QQuickPage = {
  title: string | undefined;
  header: QtQuick.QQuickItem | null;
  footer: QtQuick.QQuickItem | null;
  readonly contentData: QtQml.QObject;
  readonly contentChildren: QtQuick.QQuickItem;
  contentWidth: number | undefined;
  contentHeight: number | undefined;

  contentWidthChanged: Signal<Function>;
  contentHeightChanged: Signal<Function>;
} & QQuickControl;

export type QQuickPageIndicator = {
  count: number | undefined;
  currentIndex: number | undefined;
  interactive: boolean | undefined;
  delegate: QtQml.QQmlComponent | null;
} & QQuickControl;

export type QQuickPane = {
  contentWidth: number | undefined;
  contentHeight: number | undefined;
  readonly contentData: QtQml.QObject;
  readonly contentChildren: QtQuick.QQuickItem;
} & QQuickControl;

export enum QQuickPopup_ClosePolicy {
  NoAutoClose = 0,
  CloseOnPressOutside = 1,
  CloseOnPressOutsideParent = 2,
  CloseOnReleaseOutside = 4,
  CloseOnReleaseOutsideParent = 8,
  CloseOnEscape = 16,
}
export enum QQuickPopup_TransformOrigin {
  TopLeft = 0,
  Top = 1,
  TopRight = 2,
  Left = 3,
  Center = 4,
  Right = 5,
  BottomLeft = 6,
  Bottom = 7,
  BottomRight = 8,
}

export type QQuickPopup = {
  x: number | undefined;
  y: number | undefined;
  z: number | undefined;
  width: number | undefined;
  height: number | undefined;
  implicitWidth: number | undefined;
  implicitHeight: number | undefined;
  contentWidth: number | undefined;
  contentHeight: number | undefined;
  readonly availableWidth: number;
  readonly availableHeight: number;
  margins: number | undefined;
  topMargin: number | undefined;
  leftMargin: number | undefined;
  rightMargin: number | undefined;
  bottomMargin: number | undefined;
  padding: number | undefined;
  topPadding: number | undefined;
  leftPadding: number | undefined;
  rightPadding: number | undefined;
  bottomPadding: number | undefined;
  locale: any;
  readonly mirrored: boolean;
  font: any;
  palette: any;
  parent: QtQuick.QQuickItem | null;
  background: QtQuick.QQuickItem | null;
  contentItem: QtQuick.QQuickItem | null;
  readonly contentData: QtQml.QObject;
  readonly contentChildren: QtQuick.QQuickItem;
  clip: boolean | undefined;
  focus: boolean | undefined;
  readonly activeFocus: boolean;
  modal: boolean | undefined;
  dim: boolean | undefined;
  visible: boolean | undefined;
  enabled: boolean | undefined;
  readonly opened: boolean;
  opacity: number | undefined;
  scale: number | undefined;
  closePolicy: QQuickPopup_ClosePolicy | string;
  transformOrigin: QQuickPopup_TransformOrigin | string;
  enter: QtQuick.QQuickTransition | null;
  exit: QtQuick.QQuickTransition | null;
  spacing: number | undefined;

  open(): void;
  close(): void;
  forceActiveFocus(reason: any): void;
  forceActiveFocus(): void;

  closed: Signal<Function>;
  aboutToShow: Signal<Function>;
  aboutToHide: Signal<Function>;
  mirroredChanged: Signal<Function>;
  paletteChanged: Signal<Function>;
  enabledChanged: Signal<Function>;
  openedChanged: Signal<Function>;
  windowChanged: Signal<Function>;
  spacingChanged: Signal<Function>;
} & QtQml.QObject;

export type QQuickProgressBar = {
  from: number | undefined;
  to: number | undefined;
  value: number | undefined;
  readonly position: number;
  readonly visualPosition: number;
  indeterminate: boolean | undefined;
} & QQuickControl;

export type QQuickRadioButton = {} & QQuickAbstractButton;

export type QQuickRadioDelegate = {} & QQuickItemDelegate;

export enum QQuickRangeSlider_SnapMode {
  NoSnap = 0,
  SnapAlways = 1,
  SnapOnRelease = 2,
}

export type QQuickRangeSlider = {
  from: number | undefined;
  to: number | undefined;
  readonly first: QQuickRangeSliderNode;
  readonly second: QQuickRangeSliderNode;
  stepSize: number | undefined;
  snapMode: QQuickRangeSlider_SnapMode | string;
  orientation: any;
  live: boolean | undefined;
  readonly horizontal: boolean;
  readonly vertical: boolean;

  setValues(
    firstValue: number | undefined,
    secondValue: number | undefined
  ): void;

  liveChanged: Signal<Function>;
} & QQuickControl;

export type QQuickRangeSliderNode = {
  value: number | undefined;
  readonly position: number;
  readonly visualPosition: number;
  handle: QtQuick.QQuickItem | null;
  pressed: boolean | undefined;
  hovered: boolean | undefined;

  increase(): void;
  decrease(): void;

  hoveredChanged: Signal<Function>;
} & QtQml.QObject;

export type QQuickRoundButton = {
  radius: number | undefined;
} & QQuickButton;

export enum QQuickScrollBar_SnapMode {
  NoSnap = 0,
  SnapAlways = 1,
  SnapOnRelease = 2,
}
export enum QQuickScrollBar_Policy {
  AsNeeded = 0,
  AlwaysOff = 1,
  AlwaysOn = 2,
}

export type QQuickScrollBar = {
  size: number | undefined;
  position: number | undefined;
  stepSize: number | undefined;
  active: boolean | undefined;
  pressed: boolean | undefined;
  orientation: any;
  snapMode: QQuickScrollBar_SnapMode | string;
  interactive: boolean | undefined;
  policy: QQuickScrollBar_Policy | string;
  readonly horizontal: boolean;
  readonly vertical: boolean;

  increase(): void;
  decrease(): void;
  setSize(size: number | undefined): void;
  setPosition(position: number | undefined): void;

  snapModeChanged: Signal<Function>;
  interactiveChanged: Signal<Function>;
  policyChanged: Signal<Function>;
} & QQuickControl;

export type QQuickScrollBarAttached = {
  horizontal: QQuickScrollBar | null;
  vertical: QQuickScrollBar | null;
} & QtQml.QObject;

export type QQuickScrollIndicator = {
  size: number | undefined;
  position: number | undefined;
  active: boolean | undefined;
  orientation: any;
  readonly horizontal: boolean;
  readonly vertical: boolean;

  setSize(size: number | undefined): void;
  setPosition(position: number | undefined): void;
} & QQuickControl;

export type QQuickScrollIndicatorAttached = {
  horizontal: QQuickScrollIndicator | null;
  vertical: QQuickScrollIndicator | null;
} & QtQml.QObject;

export type QQuickScrollView = {
  contentWidth: number | undefined;
  contentHeight: number | undefined;
  readonly contentData: QtQml.QObject;
  readonly contentChildren: QtQuick.QQuickItem;
} & QQuickControl;

export enum QQuickSlider_SnapMode {
  NoSnap = 0,
  SnapAlways = 1,
  SnapOnRelease = 2,
}

export type QQuickSlider = {
  from: number | undefined;
  to: number | undefined;
  value: number | undefined;
  readonly position: number;
  readonly visualPosition: number;
  stepSize: number | undefined;
  snapMode: QQuickSlider_SnapMode | string;
  pressed: boolean | undefined;
  readonly horizontal: boolean;
  readonly vertical: boolean;
  orientation: any;
  handle: QtQuick.QQuickItem | null;
  live: boolean | undefined;

  increase(): void;
  decrease(): void;
  valueAt(position: number | undefined): number | undefined;

  moved: Signal<Function>;
  liveChanged: Signal<Function>;
} & QQuickControl;

export type QQuickSpinBox = {
  from: number | undefined;
  to: number | undefined;
  value: number | undefined;
  stepSize: number | undefined;
  editable: boolean | undefined;
  validator: QtQuick.QValidator | null;
  textFromValue: any;
  valueFromText: any;
  readonly up: QQuickSpinButton;
  readonly down: QQuickSpinButton;
  inputMethodHints: any;
  readonly inputMethodComposing: boolean;
  wrap: boolean | undefined;

  increase(): void;
  decrease(): void;

  valueModified: Signal<Function>;
  inputMethodHintsChanged: Signal<Function>;
  inputMethodComposingChanged: Signal<Function>;
  wrapChanged: Signal<Function>;
} & QQuickControl;

export type QQuickSpinButton = {
  pressed: boolean | undefined;
  indicator: QtQuick.QQuickItem | null;
  hovered: boolean | undefined;

  hoveredChanged: Signal<Function>;
} & QtQml.QObject;

export enum QQuickStackView_Status {
  Inactive = 0,
  Deactivating = 1,
  Activating = 2,
  Active = 3,
}
export enum QQuickStackView_LoadBehavior {
  DontLoad = 0,
  ForceLoad = 1,
}
export enum QQuickStackView_Operation {
  Transition = -1,
  Immediate = 0,
  PushTransition = 1,
  ReplaceTransition = 2,
  PopTransition = 3,
}

export type QQuickStackView = {
  readonly busy: boolean;
  readonly depth: number;
  readonly currentItem: QtQuick.QQuickItem;
  initialItem: any;
  popEnter: QtQuick.QQuickTransition | null;
  popExit: QtQuick.QQuickTransition | null;
  pushEnter: QtQuick.QQuickTransition | null;
  pushExit: QtQuick.QQuickTransition | null;
  replaceEnter: QtQuick.QQuickTransition | null;
  replaceExit: QtQuick.QQuickTransition | null;
  readonly empty: boolean;

  clear(operation: QQuickStackView_Operation | string): void;
  clear(): void;
  get(
    index: number | undefined,
    behavior: QQuickStackView_LoadBehavior | string
  ): any;
  get(index: number | undefined): any;
  find(callback: any, behavior: QQuickStackView_LoadBehavior | string): any;
  find(callback: any): any;
  push(args: any): void;
  pop(args: any): void;
  replace(args: any): void;

  emptyChanged: Signal<Function>;
} & QQuickControl;

export type QQuickStackViewAttached = {
  readonly index: number;
  readonly view: QQuickStackView;
  readonly status: any;
  visible: boolean | undefined;

  activated: Signal<Function>;
  activating: Signal<Function>;
  deactivated: Signal<Function>;
  deactivating: Signal<Function>;
  removed: Signal<Function>;
} & QtQml.QObject;

export type QQuickSwipe = {
  position: number | undefined;
  readonly complete: boolean;
  left: QtQml.QQmlComponent | null;
  behind: QtQml.QQmlComponent | null;
  right: QtQml.QQmlComponent | null;
  readonly leftItem: QtQuick.QQuickItem;
  readonly behindItem: QtQuick.QQuickItem;
  readonly rightItem: QtQuick.QQuickItem;
  enabled: boolean | undefined;
  transition: QtQuick.QQuickTransition | null;

  close(): void;
  open(side: any): void;

  completed: Signal<Function>;
  opened: Signal<Function>;
  closed: Signal<Function>;
} & QtQml.QObject;

export enum QQuickSwipeDelegate_Side {
  Left = 1,
  Right = -1,
}

export type QQuickSwipeDelegate = {
  readonly swipe: QQuickSwipe;
} & QQuickItemDelegate;

export type QQuickSwipeDelegateAttached = {
  readonly pressed: boolean;

  clicked: Signal<Function>;
} & QtQml.QObject;

export type QQuickSwipeView = {
  interactive: boolean | undefined;
  orientation: any;
  readonly horizontal: boolean;
  readonly vertical: boolean;

  interactiveChanged: Signal<Function>;
  orientationChanged: Signal<Function>;
} & QQuickContainer;

export type QQuickSwipeViewAttached = {
  readonly index: number;
  readonly isCurrentItem: boolean;
  readonly view: QQuickSwipeView;
  readonly isNextItem: boolean;
  readonly isPreviousItem: boolean;
} & QtQml.QObject;

export type QQuickSwitch = {
  position: number | undefined;
  readonly visualPosition: number;
} & QQuickAbstractButton;

export type QQuickSwitchDelegate = {
  position: number | undefined;
  readonly visualPosition: number;
} & QQuickItemDelegate;

export enum QQuickTabBar_Position {
  Header = 0,
  Footer = 1,
}

export type QQuickTabBar = {
  position: QQuickTabBar_Position | string;
  contentWidth: number | undefined;
  contentHeight: number | undefined;

  contentWidthChanged: Signal<Function>;
  contentHeightChanged: Signal<Function>;
} & QQuickContainer;

export type QQuickTabBarAttached = {
  readonly index: number;
  readonly tabBar: QQuickTabBar;
  readonly position: any;
} & QtQml.QObject;

export type QQuickTabButton = {} & QQuickAbstractButton;

export type QQuickTextArea = {
  font: any;
  implicitWidth: number | undefined;
  implicitHeight: number | undefined;
  background: QtQuick.QQuickItem | null;
  placeholderText: string | undefined;
  focusReason: any;
  readonly hovered: boolean;
  hoverEnabled: boolean | undefined;
  palette: any;

  implicitWidthChanged3: Signal<Function>;
  implicitHeightChanged3: Signal<Function>;
  pressAndHold: Signal<Function>;
  pressed: Signal<Function>;
  released: Signal<Function>;
  hoveredChanged: Signal<Function>;
  hoverEnabledChanged: Signal<Function>;
  paletteChanged: Signal<Function>;
} & QtQuick.QQuickTextEdit;

export type QQuickTextAreaAttached = {
  flickable: QQuickTextArea | null;
} & QtQml.QObject;

export type QQuickTextField = {
  font: any;
  implicitWidth: number | undefined;
  implicitHeight: number | undefined;
  background: QtQuick.QQuickItem | null;
  placeholderText: string | undefined;
  focusReason: any;
  readonly hovered: boolean;
  hoverEnabled: boolean | undefined;
  palette: any;

  implicitWidthChanged3: Signal<Function>;
  implicitHeightChanged3: Signal<Function>;
  pressAndHold: Signal<Function>;
  pressed: Signal<Function>;
  released: Signal<Function>;
  hoveredChanged: Signal<Function>;
  hoverEnabledChanged: Signal<Function>;
  paletteChanged: Signal<Function>;
} & QtQuick.QQuickTextInput;

export enum QQuickToolBar_Position {
  Header = 0,
  Footer = 1,
}

export type QQuickToolBar = {
  position: QQuickToolBar_Position | string;
} & QQuickPane;

export type QQuickToolButton = {} & QQuickButton;

export type QQuickToolSeparator = {
  orientation: any;
  readonly horizontal: boolean;
  readonly vertical: boolean;
} & QQuickControl;

export type QQuickToolTip = {
  delay: number | undefined;
  timeout: number | undefined;
  text: string | undefined;
} & QQuickPopup;

export type QQuickToolTipAttached = {
  text: string | undefined;
  delay: number | undefined;
  timeout: number | undefined;
  visible: boolean | undefined;
  readonly toolTip: QQuickToolTip;

  show(text: string | undefined, ms: number | undefined): void;
  show(text: string | undefined): void;
  hide(): void;
} & QtQml.QObject;

export type QQuickTumbler = {
  model: any;
  readonly count: number;
  currentIndex: number | undefined;
  readonly currentItem: QtQuick.QQuickItem;
  delegate: QtQml.QQmlComponent | null;
  visibleItemCount: number | undefined;
  wrap: boolean | undefined;
  readonly moving: boolean;

  wrapChanged: Signal<Function>;
  movingChanged: Signal<Function>;
} & QQuickControl;

export type QQuickTumblerAttached = {
  readonly tumbler: QQuickTumbler;
  readonly displacement: number;
} & QtQml.QObject;

// end
