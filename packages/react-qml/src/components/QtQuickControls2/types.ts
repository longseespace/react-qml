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
  transparent(color: any, opacity: number): any;
  blend(a: any, b: any, factor: number): any;
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
  progress: number;
  color: any;
} & QtQuick.QQuickPaintedItem;

export type QQuickDefaultProgressBar = {
  indeterminate: boolean;
  progress: number;
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
  name: string;
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
  text: string;
  font: any;
  color: any;
  display: QQuickIconLabel_Display;
  spacing: number;
  mirrored: boolean;
  alignment: any;
  topPadding: number;
  leftPadding: number;
  rightPadding: number;
  bottomPadding: number;
} & QtQuick.QQuickItem;

export type QQuickMnemonicLabel = {
  text: string;
  mnemonicVisible: boolean;
} & QtQuick.QQuickText;

export type QQuickPaddedRectangle = {
  padding: number;
  topPadding: number;
  leftPadding: number;
  rightPadding: number;
  bottomPadding: number;
} & QtQuick.QQuickRectangle;

export type QQuickPlaceholderText = {} & QtQuick.QQuickText;

export type QQuickTumblerView = {
  model: any;
  delegate: QtQml.QQmlComponent;
  path: QtQuick.QQuickPath;
} & QtQuick.QQuickItem;

export enum QQuickAbstractButton_Display {
  IconOnly = 0,
  TextOnly = 1,
  TextBesideIcon = 2,
  TextUnderIcon = 3,
}

export type QQuickAbstractButton = {
  text: string;
  down: boolean;
  readonly pressed: boolean;
  checked: boolean;
  checkable: boolean;
  autoExclusive: boolean;
  indicator: QtQuick.QQuickItem;
  icon: any;
  display: QQuickAbstractButton_Display;
  action: QQuickAction;

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
  text: string;
  icon: any;
  enabled: boolean;
  checked: boolean;
  checkable: boolean;
  shortcut: any;

  toggle(source: QtQml.QObject): void;
  toggle(): void;
  trigger(source: QtQml.QObject): void;
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
  checkedAction: QQuickAction;
  readonly actions: QQuickAction;
  exclusive: boolean;
  enabled: boolean;

  addAction(action: QQuickAction): void;
  removeAction(action: QQuickAction): void;

  triggered: Signal<Function>;
} & QtQml.QObject;

export type QQuickActionGroupAttached = {
  group: QQuickActionGroup;
} & QtQml.QObject;

export type QQuickApplicationWindow = {
  background: QtQuick.QQuickItem;
  readonly contentItem: QtQuick.QQuickItem;
  readonly contentData: QtQml.QObject;
  readonly activeFocusControl: QtQuick.QQuickItem;
  header: QtQuick.QQuickItem;
  footer: QtQuick.QQuickItem;
  readonly overlay: QQuickOverlay;
  font: any;
  locale: any;
  palette: any;
  menuBar: QtQuick.QQuickItem;

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
  running: boolean;
} & QQuickControl;

export type QQuickButton = {
  autoRepeat: boolean;
  highlighted: boolean;
  flat: boolean;
} & QQuickAbstractButton;

export type QQuickButtonGroup = {
  checkedButton: QQuickAbstractButton;
  readonly buttons: QQuickAbstractButton;
  exclusive: boolean;

  addButton(button: QQuickAbstractButton): void;
  removeButton(button: QQuickAbstractButton): void;

  clicked: Signal<Function>;
  exclusiveChanged: Signal<Function>;
} & QtQml.QObject;

export type QQuickButtonGroupAttached = {
  group: QQuickButtonGroup;
} & QtQml.QObject;

export type QQuickCheckBox = {
  tristate: boolean;
  checkState: any;
} & QQuickAbstractButton;

export type QQuickCheckDelegate = {
  tristate: boolean;
  checkState: any;
} & QQuickItemDelegate;

export type QQuickComboBox = {
  readonly count: number;
  model: any;
  readonly delegateModel: QtQml.QQmlInstanceModel;
  pressed: boolean;
  readonly highlightedIndex: number;
  currentIndex: number;
  readonly currentText: string;
  displayText: string;
  textRole: string;
  delegate: QtQml.QQmlComponent;
  indicator: QtQuick.QQuickItem;
  popup: QQuickPopup;
  flat: boolean;
  down: boolean;
  editable: boolean;
  editText: string;
  validator: QtQuick.QValidator;
  inputMethodHints: any;
  readonly inputMethodComposing: boolean;
  readonly acceptableInput: boolean;

  incrementCurrentIndex(): void;
  decrementCurrentIndex(): void;
  selectAll(): void;
  textAt(index: number): string;
  find(text: string, flags: any): number;
  find(text: string): number;

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
  currentIndex: number;
  readonly currentItem: QtQuick.QQuickItem;

  setCurrentIndex(index: number): void;
  incrementCurrentIndex(): void;
  decrementCurrentIndex(): void;
  itemAt(index: number): any;
  addItem(item: QtQuick.QQuickItem): void;
  insertItem(index: number, item: QtQuick.QQuickItem): void;
  moveItem(from: number, to: number): void;
  removeItem(item: any): void;
  takeItem(index: number): any;
} & QQuickControl;

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

export type QQuickDelayButton = {
  delay: number;
  progress: number;
  transition: QtQuick.QQuickTransition;

  activated: Signal<Function>;
} & QQuickAbstractButton;

export enum QQuickDial_SnapMode {
  NoSnap = 0,
  SnapAlways = 1,
  SnapOnRelease = 2,
}

export type QQuickDial = {
  from: number;
  to: number;
  value: number;
  readonly position: number;
  readonly angle: number;
  stepSize: number;
  snapMode: QQuickDial_SnapMode;
  wrap: boolean;
  readonly pressed: boolean;
  handle: QtQuick.QQuickItem;
  live: boolean;

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
  title: string;
  header: QtQuick.QQuickItem;
  footer: QtQuick.QQuickItem;
  standardButtons: any;
  result: number;

  accept(): void;
  reject(): void;
  done(result: number): void;
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
  position: QQuickDialogButtonBox_Position;
  alignment: any;
  standardButtons: any;
  delegate: QtQml.QQmlComponent;

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
  position: number;
  dragMargin: number;
  interactive: boolean;

  interactiveChanged: Signal<Function>;
} & QQuickPopup;

export type QQuickFrame = {} & QQuickPane;

export type QQuickGroupBox = {
  title: string;
  label: QtQuick.QQuickItem;
} & QQuickFrame;

export type QQuickItemDelegate = {
  highlighted: boolean;
} & QQuickAbstractButton;

export type QQuickLabel = {
  font: any;
  background: QtQuick.QQuickItem;
  palette: any;

  paletteChanged: Signal<Function>;
} & QtQuick.QQuickText;

export type QQuickMenu = {
  readonly count: number;
  readonly contentModel: any;
  readonly contentData: QtQml.QObject;
  title: string;
  cascade: boolean;
  overlap: number;
  delegate: QtQml.QQmlComponent;
  currentIndex: number;

  itemAt(index: number): any;
  addItem(item: QtQuick.QQuickItem): void;
  insertItem(index: number, item: QtQuick.QQuickItem): void;
  moveItem(from: number, to: number): void;
  removeItem(item: any): void;
  takeItem(index: number): any;
  menuAt(index: number): any;
  addMenu(menu: QQuickMenu): void;
  insertMenu(index: number, menu: QQuickMenu): void;
  removeMenu(menu: QQuickMenu): void;
  takeMenu(index: number): any;
  actionAt(index: number): any;
  addAction(action: QQuickAction): void;
  insertAction(index: number, action: QQuickAction): void;
  removeAction(action: QQuickAction): void;
  takeAction(index: number): any;
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
  delegate: QtQml.QQmlComponent;
  contentWidth: number;
  contentHeight: number;
  readonly menus: QQuickMenu;
  readonly contentData: QtQml.QObject;

  menuAt(index: number): any;
  addMenu(menu: QQuickMenu): void;
  insertMenu(index: number, menu: QQuickMenu): void;
  removeMenu(menu: QQuickMenu): void;
  takeMenu(index: number): any;
} & QQuickContainer;

export type QQuickMenuBarItem = {
  readonly menuBar: QQuickMenuBar;
  menu: QQuickMenu;
  highlighted: boolean;

  triggered: Signal<Function>;
} & QQuickAbstractButton;

export type QQuickMenuItem = {
  highlighted: boolean;
  arrow: QtQuick.QQuickItem;
  readonly menu: QQuickMenu;
  readonly subMenu: QQuickMenu;

  triggered: Signal<Function>;
  arrowChanged: Signal<Function>;
  menuChanged: Signal<Function>;
  subMenuChanged: Signal<Function>;
} & QQuickAbstractButton;

export type QQuickMenuSeparator = {} & QQuickControl;

export type QQuickOverlay = {
  modal: QtQml.QQmlComponent;
  modeless: QtQml.QQmlComponent;

  pressed: Signal<Function>;
  released: Signal<Function>;
} & QtQuick.QQuickItem;

export type QQuickOverlayAttached = {
  readonly overlay: QQuickOverlay;
  modal: QtQml.QQmlComponent;
  modeless: QtQml.QQmlComponent;

  pressed: Signal<Function>;
  released: Signal<Function>;
} & QtQml.QObject;

export type QQuickPage = {
  title: string;
  header: QtQuick.QQuickItem;
  footer: QtQuick.QQuickItem;
  readonly contentData: QtQml.QObject;
  readonly contentChildren: QtQuick.QQuickItem;
  contentWidth: number;
  contentHeight: number;

  contentWidthChanged: Signal<Function>;
  contentHeightChanged: Signal<Function>;
} & QQuickControl;

export type QQuickPageIndicator = {
  count: number;
  currentIndex: number;
  interactive: boolean;
  delegate: QtQml.QQmlComponent;
} & QQuickControl;

export type QQuickPane = {
  contentWidth: number;
  contentHeight: number;
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
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  implicitWidth: number;
  implicitHeight: number;
  contentWidth: number;
  contentHeight: number;
  readonly availableWidth: number;
  readonly availableHeight: number;
  margins: number;
  topMargin: number;
  leftMargin: number;
  rightMargin: number;
  bottomMargin: number;
  padding: number;
  topPadding: number;
  leftPadding: number;
  rightPadding: number;
  bottomPadding: number;
  locale: any;
  readonly mirrored: boolean;
  font: any;
  palette: any;
  parent: QtQuick.QQuickItem;
  background: QtQuick.QQuickItem;
  contentItem: QtQuick.QQuickItem;
  readonly contentData: QtQml.QObject;
  readonly contentChildren: QtQuick.QQuickItem;
  clip: boolean;
  focus: boolean;
  readonly activeFocus: boolean;
  modal: boolean;
  dim: boolean;
  visible: boolean;
  enabled: boolean;
  readonly opened: boolean;
  opacity: number;
  scale: number;
  closePolicy: QQuickPopup_ClosePolicy;
  transformOrigin: QQuickPopup_TransformOrigin;
  enter: QtQuick.QQuickTransition;
  exit: QtQuick.QQuickTransition;
  spacing: number;

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
  from: number;
  to: number;
  value: number;
  readonly position: number;
  readonly visualPosition: number;
  indeterminate: boolean;
} & QQuickControl;

export type QQuickRadioButton = {} & QQuickAbstractButton;

export type QQuickRadioDelegate = {} & QQuickItemDelegate;

export enum QQuickRangeSlider_SnapMode {
  NoSnap = 0,
  SnapAlways = 1,
  SnapOnRelease = 2,
}

export type QQuickRangeSlider = {
  from: number;
  to: number;
  readonly first: QQuickRangeSliderNode;
  readonly second: QQuickRangeSliderNode;
  stepSize: number;
  snapMode: QQuickRangeSlider_SnapMode;
  orientation: any;
  live: boolean;
  readonly horizontal: boolean;
  readonly vertical: boolean;

  setValues(firstValue: number, secondValue: number): void;

  liveChanged: Signal<Function>;
} & QQuickControl;

export type QQuickRangeSliderNode = {
  value: number;
  readonly position: number;
  readonly visualPosition: number;
  handle: QtQuick.QQuickItem;
  pressed: boolean;
  hovered: boolean;

  increase(): void;
  decrease(): void;

  hoveredChanged: Signal<Function>;
} & QtQml.QObject;

export type QQuickRoundButton = {
  radius: number;
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
  size: number;
  position: number;
  stepSize: number;
  active: boolean;
  pressed: boolean;
  orientation: any;
  snapMode: QQuickScrollBar_SnapMode;
  interactive: boolean;
  policy: QQuickScrollBar_Policy;
  readonly horizontal: boolean;
  readonly vertical: boolean;

  increase(): void;
  decrease(): void;
  setSize(size: number): void;
  setPosition(position: number): void;

  snapModeChanged: Signal<Function>;
  interactiveChanged: Signal<Function>;
  policyChanged: Signal<Function>;
} & QQuickControl;

export type QQuickScrollBarAttached = {
  horizontal: QQuickScrollBar;
  vertical: QQuickScrollBar;
} & QtQml.QObject;

export type QQuickScrollIndicator = {
  size: number;
  position: number;
  active: boolean;
  orientation: any;
  readonly horizontal: boolean;
  readonly vertical: boolean;

  setSize(size: number): void;
  setPosition(position: number): void;
} & QQuickControl;

export type QQuickScrollIndicatorAttached = {
  horizontal: QQuickScrollIndicator;
  vertical: QQuickScrollIndicator;
} & QtQml.QObject;

export type QQuickScrollView = {
  contentWidth: number;
  contentHeight: number;
  readonly contentData: QtQml.QObject;
  readonly contentChildren: QtQuick.QQuickItem;
} & QQuickControl;

export enum QQuickSlider_SnapMode {
  NoSnap = 0,
  SnapAlways = 1,
  SnapOnRelease = 2,
}

export type QQuickSlider = {
  from: number;
  to: number;
  value: number;
  readonly position: number;
  readonly visualPosition: number;
  stepSize: number;
  snapMode: QQuickSlider_SnapMode;
  pressed: boolean;
  readonly horizontal: boolean;
  readonly vertical: boolean;
  orientation: any;
  handle: QtQuick.QQuickItem;
  live: boolean;

  increase(): void;
  decrease(): void;
  valueAt(position: number): number;

  moved: Signal<Function>;
  liveChanged: Signal<Function>;
} & QQuickControl;

export type QQuickSpinBox = {
  from: number;
  to: number;
  value: number;
  stepSize: number;
  editable: boolean;
  validator: QtQuick.QValidator;
  textFromValue: any;
  valueFromText: any;
  readonly up: QQuickSpinButton;
  readonly down: QQuickSpinButton;
  inputMethodHints: any;
  readonly inputMethodComposing: boolean;
  wrap: boolean;

  increase(): void;
  decrease(): void;

  valueModified: Signal<Function>;
  inputMethodHintsChanged: Signal<Function>;
  inputMethodComposingChanged: Signal<Function>;
  wrapChanged: Signal<Function>;
} & QQuickControl;

export type QQuickSpinButton = {
  pressed: boolean;
  indicator: QtQuick.QQuickItem;
  hovered: boolean;

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
  popEnter: QtQuick.QQuickTransition;
  popExit: QtQuick.QQuickTransition;
  pushEnter: QtQuick.QQuickTransition;
  pushExit: QtQuick.QQuickTransition;
  replaceEnter: QtQuick.QQuickTransition;
  replaceExit: QtQuick.QQuickTransition;
  readonly empty: boolean;

  clear(operation: QQuickStackView_Operation): void;
  clear(): void;
  get(index: number, behavior: QQuickStackView_LoadBehavior): any;
  get(index: number): any;
  find(callback: any, behavior: QQuickStackView_LoadBehavior): any;
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
  visible: boolean;

  activated: Signal<Function>;
  activating: Signal<Function>;
  deactivated: Signal<Function>;
  deactivating: Signal<Function>;
  removed: Signal<Function>;
} & QtQml.QObject;

export type QQuickSwipe = {
  position: number;
  readonly complete: boolean;
  left: QtQml.QQmlComponent;
  behind: QtQml.QQmlComponent;
  right: QtQml.QQmlComponent;
  readonly leftItem: QtQuick.QQuickItem;
  readonly behindItem: QtQuick.QQuickItem;
  readonly rightItem: QtQuick.QQuickItem;
  enabled: boolean;
  transition: QtQuick.QQuickTransition;

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
  interactive: boolean;
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
  position: number;
  readonly visualPosition: number;
} & QQuickAbstractButton;

export type QQuickSwitchDelegate = {
  position: number;
  readonly visualPosition: number;
} & QQuickItemDelegate;

export enum QQuickTabBar_Position {
  Header = 0,
  Footer = 1,
}

export type QQuickTabBar = {
  position: QQuickTabBar_Position;
  contentWidth: number;
  contentHeight: number;

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
  implicitWidth: number;
  implicitHeight: number;
  background: QtQuick.QQuickItem;
  placeholderText: string;
  focusReason: any;
  readonly hovered: boolean;
  hoverEnabled: boolean;
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
  flickable: QQuickTextArea;
} & QtQml.QObject;

export type QQuickTextField = {
  font: any;
  implicitWidth: number;
  implicitHeight: number;
  background: QtQuick.QQuickItem;
  placeholderText: string;
  focusReason: any;
  readonly hovered: boolean;
  hoverEnabled: boolean;
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
  position: QQuickToolBar_Position;
} & QQuickPane;

export type QQuickToolButton = {} & QQuickButton;

export type QQuickToolSeparator = {
  orientation: any;
  readonly horizontal: boolean;
  readonly vertical: boolean;
} & QQuickControl;

export type QQuickToolTip = {
  delay: number;
  timeout: number;
  text: string;
} & QQuickPopup;

export type QQuickToolTipAttached = {
  text: string;
  delay: number;
  timeout: number;
  visible: boolean;
  readonly toolTip: QQuickToolTip;

  show(text: string, ms: number): void;
  show(text: string): void;
  hide(): void;
} & QtQml.QObject;

export type QQuickTumbler = {
  model: any;
  readonly count: number;
  currentIndex: number;
  readonly currentItem: QtQuick.QQuickItem;
  delegate: QtQml.QQmlComponent;
  visibleItemCount: number;
  wrap: boolean;
  readonly moving: boolean;

  wrapChanged: Signal<Function>;
  movingChanged: Signal<Function>;
} & QQuickControl;

export type QQuickTumblerAttached = {
  readonly tumbler: QQuickTumbler;
  readonly displacement: number;
} & QtQml.QObject;

// end
