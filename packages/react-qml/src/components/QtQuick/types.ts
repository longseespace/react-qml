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

export enum QDoubleValidator_Notation {
  StandardNotation = 0,
  ScientificNotation = 1,
}

export type QDoubleValidator = {
  bottom: number | undefined;
  top: number | undefined;
  decimals: number | undefined;
  notation: QDoubleValidator_Notation | string;

  bottomChanged: Signal<Function>;
  topChanged: Signal<Function>;
  decimalsChanged: Signal<Function>;
  notationChanged: Signal<Function>;
} & QValidator;

export enum QInputMethod_Action {
  Click = 0,
  ContextMenu = 1,
}

export type QInputMethod = {
  readonly cursorRectangle: any;
  readonly anchorRectangle: any;
  readonly keyboardRectangle: any;
  readonly inputItemClipRectangle: any;
  readonly visible: boolean;
  readonly animating: boolean;
  readonly locale: any;
  readonly inputDirection: any;

  show(): void;
  hide(): void;
  update(queries: any): void;
  reset(): void;
  commit(): void;
  invokeAction(
    a: QInputMethod_Action | string,
    cursorPosition: number | undefined
  ): void;

  inputDirectionChanged: Signal<Function>;
} & QtQml.QObject;

export type QIntValidator = {
  bottom: number | undefined;
  top: number | undefined;

  bottomChanged: Signal<Function>;
  topChanged: Signal<Function>;
} & QValidator;

export enum QKeySequence_StandardKey {
  UnknownKey = 0,
  HelpContents = 1,
  WhatsThis = 2,
  Open = 3,
  Close = 4,
  Save = 5,
  New = 6,
  Delete = 7,
  Cut = 8,
  Copy = 9,
  Paste = 10,
  Undo = 11,
  Redo = 12,
  Back = 13,
  Forward = 14,
  Refresh = 15,
  ZoomIn = 16,
  ZoomOut = 17,
  Print = 18,
  AddTab = 19,
  NextChild = 20,
  PreviousChild = 21,
  Find = 22,
  FindNext = 23,
  FindPrevious = 24,
  Replace = 25,
  SelectAll = 26,
  Bold = 27,
  Italic = 28,
  Underline = 29,
  MoveToNextChar = 30,
  MoveToPreviousChar = 31,
  MoveToNextWord = 32,
  MoveToPreviousWord = 33,
  MoveToNextLine = 34,
  MoveToPreviousLine = 35,
  MoveToNextPage = 36,
  MoveToPreviousPage = 37,
  MoveToStartOfLine = 38,
  MoveToEndOfLine = 39,
  MoveToStartOfBlock = 40,
  MoveToEndOfBlock = 41,
  MoveToStartOfDocument = 42,
  MoveToEndOfDocument = 43,
  SelectNextChar = 44,
  SelectPreviousChar = 45,
  SelectNextWord = 46,
  SelectPreviousWord = 47,
  SelectNextLine = 48,
  SelectPreviousLine = 49,
  SelectNextPage = 50,
  SelectPreviousPage = 51,
  SelectStartOfLine = 52,
  SelectEndOfLine = 53,
  SelectStartOfBlock = 54,
  SelectEndOfBlock = 55,
  SelectStartOfDocument = 56,
  SelectEndOfDocument = 57,
  DeleteStartOfWord = 58,
  DeleteEndOfWord = 59,
  DeleteEndOfLine = 60,
  InsertParagraphSeparator = 61,
  InsertLineSeparator = 62,
  SaveAs = 63,
  Preferences = 64,
  Quit = 65,
  FullScreen = 66,
  Deselect = 67,
  DeleteCompleteLine = 68,
  Backspace = 69,
  Cancel = 70,
}

export type QKeySequence = {};

export type QPointingDeviceUniqueId = {
  readonly numericId: any;
};

export type QQmlApplication = {
  readonly arguments: any;
  name: string | undefined;
  version: string | undefined;
  organization: string | undefined;
  domain: string | undefined;

  setName(arg: string | undefined): void;
  setVersion(arg: string | undefined): void;
  setOrganization(arg: string | undefined): void;
  setDomain(arg: string | undefined): void;

  aboutToQuit: Signal<Function>;
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

export enum QQmlEasingValueType_Type {
  Linear = 0,
  InQuad = 1,
  OutQuad = 2,
  InOutQuad = 3,
  OutInQuad = 4,
  InCubic = 5,
  OutCubic = 6,
  InOutCubic = 7,
  OutInCubic = 8,
  InQuart = 9,
  OutQuart = 10,
  InOutQuart = 11,
  OutInQuart = 12,
  InQuint = 13,
  OutQuint = 14,
  InOutQuint = 15,
  OutInQuint = 16,
  InSine = 17,
  OutSine = 18,
  InOutSine = 19,
  OutInSine = 20,
  InExpo = 21,
  OutExpo = 22,
  InOutExpo = 23,
  OutInExpo = 24,
  InCirc = 25,
  OutCirc = 26,
  InOutCirc = 27,
  OutInCirc = 28,
  InElastic = 29,
  OutElastic = 30,
  InOutElastic = 31,
  OutInElastic = 32,
  InBack = 33,
  OutBack = 34,
  InOutBack = 35,
  OutInBack = 36,
  InBounce = 37,
  OutBounce = 38,
  InOutBounce = 39,
  OutInBounce = 40,
  InCurve = 41,
  OutCurve = 42,
  SineCurve = 43,
  CosineCurve = 44,
  Bezier = 45,
}

export type QQmlEasingValueType = {
  type: QQmlEasingValueType_Type | string;
  amplitude: number | undefined;
  overshoot: number | undefined;
  period: number | undefined;
  bezierCurve: any;
};

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

export enum QQuickAbstractAnimation_Loops {
  Infinite = -2,
}

export type QQuickAbstractAnimation = {
  running: boolean | undefined;
  paused: boolean | undefined;
  alwaysRunToEnd: boolean | undefined;
  loops: number | undefined;

  restart(): void;
  start(): void;
  pause(): void;
  resume(): void;
  stop(): void;
  complete(): void;

  started: Signal<Function>;
  stopped: Signal<Function>;
  runningChanged: Signal<Function>;
  pausedChanged: Signal<Function>;
  alwaysRunToEndChanged: Signal<Function>;
  loopCountChanged: Signal<Function>;
} & QtQml.QObject;

export type QQuickAccessibleAttached = {
  role: any;
  name: string | undefined;
  description: string | undefined;
  ignored: boolean | undefined;
  checkable: boolean | undefined;
  checked: boolean | undefined;
  editable: boolean | undefined;
  focusable: boolean | undefined;
  focused: boolean | undefined;
  multiLine: boolean | undefined;
  readOnly: boolean | undefined;
  selected: boolean | undefined;
  selectable: boolean | undefined;
  pressed: boolean | undefined;
  checkStateMixed: boolean | undefined;
  defaultButton: boolean | undefined;
  passwordEdit: boolean | undefined;
  selectableText: boolean | undefined;
  searchEdit: boolean | undefined;

  valueChanged(): void;
  cursorPositionChanged(): void;
  setIgnored(ignored: boolean | undefined): void;

  checkableChanged: Signal<Function>;
  checkedChanged: Signal<Function>;
  editableChanged: Signal<Function>;
  focusableChanged: Signal<Function>;
  focusedChanged: Signal<Function>;
  multiLineChanged: Signal<Function>;
  readOnlyChanged: Signal<Function>;
  selectedChanged: Signal<Function>;
  selectableChanged: Signal<Function>;
  pressedChanged: Signal<Function>;
  checkStateMixedChanged: Signal<Function>;
  defaultButtonChanged: Signal<Function>;
  passwordEditChanged: Signal<Function>;
  selectableTextChanged: Signal<Function>;
  searchEditChanged: Signal<Function>;
  pressAction: Signal<Function>;
  toggleAction: Signal<Function>;
  increaseAction: Signal<Function>;
  decreaseAction: Signal<Function>;
  scrollUpAction: Signal<Function>;
  scrollDownAction: Signal<Function>;
  scrollLeftAction: Signal<Function>;
  scrollRightAction: Signal<Function>;
  previousPageAction: Signal<Function>;
  nextPageAction: Signal<Function>;
} & QtQml.QObject;

export type QQuickAnchorAnimation = {
  readonly targets: QQuickItem;
  duration: number | undefined;
  easing: any;

  durationChanged: Signal<Function>;
  easingChanged: Signal<Function>;
} & QQuickAbstractAnimation;

export type QQuickAnchorChanges = {
  target: QQuickItem | null;
  readonly anchors: QQuickAnchorSet;
} & QQuickStateOperation;

export type QQuickAnchorSet = {
  left: any;
  right: any;
  horizontalCenter: any;
  top: any;
  bottom: any;
  verticalCenter: any;
  baseline: any;
} & QtQml.QObject;

export type QQuickAnchors = {
  left: any;
  right: any;
  horizontalCenter: any;
  top: any;
  bottom: any;
  verticalCenter: any;
  baseline: any;
  margins: number | undefined;
  leftMargin: number | undefined;
  rightMargin: number | undefined;
  horizontalCenterOffset: number | undefined;
  topMargin: number | undefined;
  bottomMargin: number | undefined;
  verticalCenterOffset: number | undefined;
  baselineOffset: number | undefined;
  fill: QQuickItem | null;
  centerIn: QQuickItem | null;
  alignWhenCentered: boolean | undefined;

  centerAlignedChanged: Signal<Function>;
} & QtQml.QObject;

export type QQuickAnimatedImage = {
  playing: boolean | undefined;
  paused: boolean | undefined;
  currentFrame: number | undefined;
  readonly frameCount: number;
  readonly sourceSize: any;

  frameChanged: Signal<Function>;
} & QQuickImage;

export enum QQuickAnimatedSprite_LoopParameters {
  Infinite = -1,
}

export type QQuickAnimatedSprite = {
  running: boolean | undefined;
  interpolate: boolean | undefined;
  source: string | undefined;
  reverse: boolean | undefined;
  frameSync: boolean | undefined;
  frameCount: number | undefined;
  frameHeight: number | undefined;
  frameWidth: number | undefined;
  frameX: number | undefined;
  frameY: number | undefined;
  frameRate: number | undefined;
  frameDuration: number | undefined;
  loops: number | undefined;
  paused: boolean | undefined;
  currentFrame: number | undefined;

  start(): void;
  stop(): void;
  restart(): void;
  advance(frames: number | undefined): void;
  advance(): void;
  pause(): void;
  resume(): void;
  setRunning(arg: boolean | undefined): void;
  setPaused(arg: boolean | undefined): void;
  setInterpolate(arg: boolean | undefined): void;
  setSource(arg: string | undefined): void;
  setReverse(arg: boolean | undefined): void;
  setFrameSync(arg: boolean | undefined): void;
  setFrameCount(arg: number | undefined): void;
  setFrameHeight(arg: number | undefined): void;
  setFrameWidth(arg: number | undefined): void;
  setFrameX(arg: number | undefined): void;
  setFrameY(arg: number | undefined): void;
  setFrameRate(arg: number | undefined): void;
  setFrameDuration(arg: number | undefined): void;
  resetFrameRate(): void;
  resetFrameDuration(): void;
  setLoops(arg: number | undefined): void;
  setCurrentFrame(arg: number | undefined): void;

  pausedChanged: Signal<Function>;
  runningChanged: Signal<Function>;
  interpolateChanged: Signal<Function>;
  sourceChanged: Signal<Function>;
  reverseChanged: Signal<Function>;
  frameSyncChanged: Signal<Function>;
  frameCountChanged: Signal<Function>;
  frameHeightChanged: Signal<Function>;
  frameWidthChanged: Signal<Function>;
  frameXChanged: Signal<Function>;
  frameYChanged: Signal<Function>;
  frameRateChanged: Signal<Function>;
  frameDurationChanged: Signal<Function>;
  loopsChanged: Signal<Function>;
  currentFrameChanged: Signal<Function>;
} & QQuickItem;

export type QQuickAnimationController = {
  progress: number | undefined;
  animation: QQuickAbstractAnimation | null;

  reload(): void;
  completeToBeginning(): void;
  completeToEnd(): void;
} & QtQml.QObject;

export type QQuickAnimationGroup = {
  readonly animations: QQuickAbstractAnimation;
} & QQuickAbstractAnimation;

export type QQuickAnimator = {
  target: QQuickItem | null;
  easing: any;
  duration: number | undefined;
  to: number | undefined;
  from: number | undefined;

  targetItemChanged: Signal<Function>;
  durationChanged: Signal<Function>;
  easingChanged: Signal<Function>;
  toChanged: Signal<Function>;
  fromChanged: Signal<Function>;
} & QQuickAbstractAnimation;

export type QQuickApplication = {
  readonly active: boolean;
  readonly layoutDirection: any;
  readonly supportsMultipleWindows: boolean;
  readonly state: any;
  readonly font: any;
  displayName: string | undefined;
  readonly screens: any;

  stateChanged: Signal<Function>;
} & QQmlApplication;

export type QQuickBasePositioner = {
  spacing: number | undefined;
  populate: QQuickTransition | null;
  move: QQuickTransition | null;
  add: QQuickTransition | null;
  padding: number | undefined;
  topPadding: number | undefined;
  leftPadding: number | undefined;
  rightPadding: number | undefined;
  bottomPadding: number | undefined;

  forceLayout(): void;

  paddingChanged: Signal<Function>;
  topPaddingChanged: Signal<Function>;
  leftPaddingChanged: Signal<Function>;
  rightPaddingChanged: Signal<Function>;
  bottomPaddingChanged: Signal<Function>;
  positioningComplete: Signal<Function>;
} & QQuickImplicitSizeItem;

export type QQuickBehavior = {
  animation: QQuickAbstractAnimation | null;
  enabled: boolean | undefined;
} & QtQml.QObject;

export enum QQuickBorderImage_TileMode {
  Stretch = 0,
  Repeat = 1,
  Round = 2,
}

export type QQuickBorderImage = {
  readonly border: QQuickScaleGrid;
  horizontalTileMode: QQuickBorderImage_TileMode | string;
  verticalTileMode: QQuickBorderImage_TileMode | string;
  readonly sourceSize: any;
} & QQuickImageBase;

export enum QQuickBorderImageMesh_TileMode {
  Stretch = 0,
  Repeat = 1,
  Round = 2,
}

export type QQuickBorderImageMesh = {
  readonly border: QQuickScaleGrid;
  size: any;
  horizontalTileMode: QQuickBorderImageMesh_TileMode | string;
  verticalTileMode: QQuickBorderImageMesh_TileMode | string;
} & QQuickShaderEffectMesh;

export enum QQuickCanvasItem_RenderTarget {
  Image = 0,
  FramebufferObject = 1,
}
export enum QQuickCanvasItem_RenderStrategy {
  Immediate = 0,
  Threaded = 1,
  Cooperative = 2,
}

export type QQuickCanvasItem = {
  readonly available: boolean;
  contextType: string | undefined;
  readonly context: any;
  canvasSize: any;
  tileSize: any;
  canvasWindow: any;
  renderTarget: QQuickCanvasItem_RenderTarget | string;
  renderStrategy: QQuickCanvasItem_RenderStrategy | string;

  loadImage(url: string | undefined): void;
  unloadImage(url: string | undefined): void;
  isImageLoaded(url: string | undefined): boolean | undefined;
  isImageLoading(url: string | undefined): boolean | undefined;
  isImageError(url: string | undefined): boolean | undefined;
  getContext(args: any): void;
  requestAnimationFrame(args: any): void;
  cancelRequestAnimationFrame(args: any): void;
  requestPaint(): void;
  markDirty(dirtyRect: any): void;
  markDirty(): void;
  save(filename: string | undefined): boolean | undefined;
  toDataURL(type: string | undefined): string | undefined;
  toDataURL(): string | undefined;

  paint: Signal<Function>;
  painted: Signal<Function>;
  imageLoaded: Signal<Function>;
} & QQuickItem;

export type QQuickCloseEvent = {
  accepted: boolean | undefined;
} & QtQml.QObject;

export type QQuickColorAnimation = {
  from: any;
  to: any;
} & QQuickPropertyAnimation;

export type QQuickColumn = {} & QQuickBasePositioner;

export type QQuickCurve = {
  x: number | undefined;
  y: number | undefined;
  relativeX: number | undefined;
  relativeY: number | undefined;
} & QQuickPathElement;

export type QQuickDoubleValidator = {
  locale: string | undefined;

  localeNameChanged: Signal<Function>;
} & QDoubleValidator;

export enum QQuickDrag_DragType {
  None = 0,
  Automatic = 1,
  Internal = 2,
}
export enum QQuickDrag_Axis {
  XAxis = 1,
  YAxis = 2,
  XAndYAxis = 3,
  XandYAxis = 3,
}

export type QQuickDrag = {
  target: QQuickItem | null;
  axis: QQuickDrag_Axis | string;
  minimumX: number | undefined;
  maximumX: number | undefined;
  minimumY: number | undefined;
  maximumY: number | undefined;
  readonly active: boolean;
  filterChildren: boolean | undefined;
  smoothed: boolean | undefined;
  threshold: number | undefined;
} & QtQml.QObject;

export type QQuickDragAttached = {
  active: boolean | undefined;
  source: QtQml.QObject | null;
  readonly target: QtQml.QObject;
  hotSpot: any;
  imageSource: string | undefined;
  keys: any;
  mimeData: any;
  supportedActions: any;
  proposedAction: any;
  dragType: any;

  start(param0: any): void;
  startDrag(param0: any): void;
  cancel(): void;
  drop(): number | undefined;

  dragStarted: Signal<Function>;
  dragFinished: Signal<Function>;
} & QtQml.QObject;

export type QQuickDropArea = {
  readonly containsDrag: boolean;
  keys: any;
  readonly drag: QQuickDropAreaDrag;

  sourceChanged: Signal<Function>;
  entered: Signal<Function>;
  exited: Signal<Function>;
  positionChanged: Signal<Function>;
  dropped: Signal<Function>;
} & QQuickItem;

export type QQuickDropAreaDrag = {
  readonly x: number;
  readonly y: number;
  readonly source: QtQml.QObject;

  positionChanged: Signal<Function>;
} & QtQml.QObject;

export type QQuickDropEvent = {
  readonly x: number;
  readonly y: number;
  readonly source: QtQml.QObject;
  readonly keys: any;
  readonly supportedActions: any;
  readonly proposedAction: any;
  action: any;
  accepted: boolean | undefined;
  readonly hasColor: boolean;
  readonly hasHtml: boolean;
  readonly hasText: boolean;
  readonly hasUrls: boolean;
  readonly colorData: any;
  readonly html: string;
  readonly text: string;
  readonly urls: any;
  readonly formats: any;

  getDataAsString(param0: any): void;
  getDataAsArrayBuffer(param0: any): void;
  acceptProposedAction(param0: any): void;
  accept(param0: any): void;
} & QtQml.QObject;

export type QQuickEnterKeyAttached = {
  type: any;
} & QtQml.QObject;

export enum QQuickFlickable_BoundsBehavior {
  StopAtBounds = 0,
  DragOverBounds = 1,
  OvershootBounds = 2,
  DragAndOvershootBounds = 3,
}
export enum QQuickFlickable_BoundsMovement {
  FollowBoundsBehavior = 1,
}
export enum QQuickFlickable_FlickableDirection {
  AutoFlickDirection = 0,
  HorizontalFlick = 1,
  VerticalFlick = 2,
  HorizontalAndVerticalFlick = 3,
  AutoFlickIfNeeded = 12,
}

export type QQuickFlickable = {
  contentWidth: number | undefined;
  contentHeight: number | undefined;
  contentX: number | undefined;
  contentY: number | undefined;
  readonly contentItem: QQuickItem;
  topMargin: number | undefined;
  bottomMargin: number | undefined;
  readonly originY: number;
  leftMargin: number | undefined;
  rightMargin: number | undefined;
  readonly originX: number;
  readonly horizontalVelocity: number;
  readonly verticalVelocity: number;
  boundsBehavior: QQuickFlickable_BoundsBehavior | string;
  boundsMovement: QQuickFlickable_BoundsMovement | string;
  rebound: QQuickTransition | null;
  maximumFlickVelocity: number | undefined;
  flickDeceleration: number | undefined;
  readonly moving: boolean;
  readonly movingHorizontally: boolean;
  readonly movingVertically: boolean;
  readonly flicking: boolean;
  readonly flickingHorizontally: boolean;
  readonly flickingVertically: boolean;
  readonly dragging: boolean;
  readonly draggingHorizontally: boolean;
  readonly draggingVertically: boolean;
  flickableDirection: QQuickFlickable_FlickableDirection | string;
  interactive: boolean | undefined;
  pressDelay: number | undefined;
  readonly atXEnd: boolean;
  readonly atYEnd: boolean;
  readonly atXBeginning: boolean;
  readonly atYBeginning: boolean;
  readonly visibleArea: QQuickFlickableVisibleArea;
  pixelAligned: boolean | undefined;
  readonly horizontalOvershoot: number;
  readonly verticalOvershoot: number;
  readonly flickableData: QtQml.QObject;
  readonly flickableChildren: QQuickItem;

  resizeContent(
    w: number | undefined,
    h: number | undefined,
    center: any
  ): void;
  returnToBounds(): void;
  flick(xVelocity: number | undefined, yVelocity: number | undefined): void;
  cancelFlick(): void;

  isAtBoundaryChanged: Signal<Function>;
  boundsMovementChanged: Signal<Function>;
  movementStarted: Signal<Function>;
  movementEnded: Signal<Function>;
  flickStarted: Signal<Function>;
  flickEnded: Signal<Function>;
  dragStarted: Signal<Function>;
  dragEnded: Signal<Function>;
  horizontalOvershootChanged: Signal<Function>;
  verticalOvershootChanged: Signal<Function>;
} & QQuickItem;

export type QQuickFlickableVisibleArea = {
  readonly xPosition: number;
  readonly yPosition: number;
  readonly widthRatio: number;
  readonly heightRatio: number;

  xPositionChanged: Signal<Function>;
  yPositionChanged: Signal<Function>;
  widthRatioChanged: Signal<Function>;
  heightRatioChanged: Signal<Function>;
} & QtQml.QObject;

export enum QQuickFlipable_Side {
  Front = 0,
  Back = 1,
}

export type QQuickFlipable = {
  front: QQuickItem | null;
  back: QQuickItem | null;
  readonly side: QQuickFlipable_Side | string;
} & QQuickItem;

export enum QQuickFlow_Flow {
  LeftToRight = 0,
  TopToBottom = 1,
}

export type QQuickFlow = {
  flow: QQuickFlow_Flow | string;
  layoutDirection: any;
  readonly effectiveLayoutDirection: any;
} & QQuickBasePositioner;

export type QQuickFocusScope = {} & QQuickItem;

export enum QQuickFontLoader_Status {
  Null = 0,
  Ready = 1,
  Loading = 2,
  Error = 3,
}

export type QQuickFontLoader = {
  source: string | undefined;
  name: string | undefined;
  readonly status: QQuickFontLoader_Status | string;
} & QtQml.QObject;

export type QQuickFontMetrics = {
  font: any;
  readonly ascent: number;
  readonly descent: number;
  readonly height: number;
  readonly leading: number;
  readonly lineSpacing: number;
  readonly minimumLeftBearing: number;
  readonly minimumRightBearing: number;
  readonly maximumCharacterWidth: number;
  readonly xHeight: number;
  readonly averageCharacterWidth: number;
  readonly underlinePosition: number;
  readonly overlinePosition: number;
  readonly strikeOutPosition: number;
  readonly lineWidth: number;

  advanceWidth(text: string | undefined): number | undefined;
  boundingRect(text: string | undefined): any;
  tightBoundingRect(text: string | undefined): any;
  elidedText(
    text: string | undefined,
    mode: any,
    width: number | undefined,
    flags: number | undefined
  ): string | undefined;
  elidedText(
    text: string | undefined,
    mode: any,
    width: number | undefined
  ): string | undefined;

  fontChanged: Signal<Function>;
} & QtQml.QObject;

export enum QQuickFontValueType_FontWeight {
  Thin = 0,
  ExtraLight = 12,
  Light = 25,
  Normal = 50,
  Medium = 57,
  DemiBold = 63,
  Bold = 75,
  ExtraBold = 81,
  Black = 87,
}
export enum QQuickFontValueType_Capitalization {
  MixedCase = 0,
  AllUppercase = 1,
  AllLowercase = 2,
  SmallCaps = 3,
  Capitalize = 4,
}
export enum QQuickFontValueType_HintingPreference {
  PreferDefaultHinting = 0,
  PreferNoHinting = 1,
  PreferVerticalHinting = 2,
  PreferFullHinting = 3,
}

export type QQuickFontValueType = {
  family: string | undefined;
  styleName: string | undefined;
  bold: boolean | undefined;
  weight: QQuickFontValueType_FontWeight | string;
  italic: boolean | undefined;
  underline: boolean | undefined;
  overline: boolean | undefined;
  strikeout: boolean | undefined;
  pointSize: number | undefined;
  pixelSize: number | undefined;
  capitalization: QQuickFontValueType_Capitalization | string;
  letterSpacing: number | undefined;
  wordSpacing: number | undefined;
  hintingPreference: QQuickFontValueType_HintingPreference | string;
  kerning: boolean | undefined;
  preferShaping: boolean | undefined;

  toString(): string | undefined;
};

export type QQuickGrabGestureEvent = {
  readonly touchPoints: QtQml.QObject;
  readonly dragThreshold: number;

  grab(): void;
} & QtQml.QObject;

export type QQuickGradient = {
  readonly stops: QQuickGradientStop;

  updated: Signal<Function>;
} & QtQml.QObject;

export type QQuickGradientStop = {
  position: number | undefined;
  color: any;
} & QtQml.QObject;

export enum QQuickGraphicsInfo_GraphicsApi {
  Unknown = 0,
  Software = 1,
  OpenGL = 2,
  Direct3D12 = 3,
}
export enum QQuickGraphicsInfo_ShaderType {
  UnknownShadingLanguage = 0,
  GLSL = 1,
  HLSL = 2,
}
export enum QQuickGraphicsInfo_ShaderCompilationType {
  RuntimeCompilation = 1,
  OfflineCompilation = 2,
}
export enum QQuickGraphicsInfo_ShaderSourceType {
  ShaderSourceString = 1,
  ShaderSourceFile = 2,
  ShaderByteCode = 4,
}
export enum QQuickGraphicsInfo_OpenGLContextProfile {
  OpenGLNoProfile = 0,
  OpenGLCoreProfile = 1,
  OpenGLCompatibilityProfile = 2,
}
export enum QQuickGraphicsInfo_RenderableType {
  SurfaceFormatUnspecified = 0,
  SurfaceFormatOpenGL = 1,
  SurfaceFormatOpenGLES = 2,
}

export type QQuickGraphicsInfo = {
  readonly api: QQuickGraphicsInfo_GraphicsApi | string;
  readonly shaderType: QQuickGraphicsInfo_ShaderType | string;
  readonly shaderCompilationType:
    | QQuickGraphicsInfo_ShaderCompilationType
    | string;
  readonly shaderSourceType: QQuickGraphicsInfo_ShaderSourceType | string;
  readonly majorVersion: number;
  readonly minorVersion: number;
  readonly profile: QQuickGraphicsInfo_OpenGLContextProfile | string;
  readonly renderableType: QQuickGraphicsInfo_RenderableType | string;
} & QtQml.QObject;

export enum QQuickGrid_Flow {
  LeftToRight = 0,
  TopToBottom = 1,
}
export enum QQuickGrid_HAlignment {
  AlignLeft = 1,
  AlignRight = 2,
  AlignHCenter = 4,
}
export enum QQuickGrid_VAlignment {
  AlignTop = 32,
  AlignBottom = 64,
  AlignVCenter = 128,
}

export type QQuickGrid = {
  rows: number | undefined;
  columns: number | undefined;
  rowSpacing: number | undefined;
  columnSpacing: number | undefined;
  flow: QQuickGrid_Flow | string;
  layoutDirection: any;
  readonly effectiveLayoutDirection: any;
  horizontalItemAlignment: QQuickGrid_HAlignment | string;
  readonly effectiveHorizontalItemAlignment: QQuickGrid_HAlignment | string;
  verticalItemAlignment: QQuickGrid_VAlignment | string;

  horizontalAlignmentChanged: Signal<Function>;
  effectiveHorizontalAlignmentChanged: Signal<Function>;
  verticalAlignmentChanged: Signal<Function>;
} & QQuickBasePositioner;

export type QQuickGridMesh = {
  resolution: any;
} & QQuickShaderEffectMesh;

export enum QQuickGridView_Flow {
  FlowLeftToRight = 0,
  FlowTopToBottom = 2,
}
export enum QQuickGridView_SnapMode {
  NoSnap = 0,
  SnapToRow = 1,
  SnapOneRow = 2,
}

export type QQuickGridView = {
  flow: QQuickGridView_Flow | string;
  cellWidth: number | undefined;
  cellHeight: number | undefined;
  snapMode: QQuickGridView_SnapMode | string;

  moveCurrentIndexUp(): void;
  moveCurrentIndexDown(): void;
  moveCurrentIndexLeft(): void;
  moveCurrentIndexRight(): void;

  highlightMoveDurationChanged: Signal<Function>;
} & QQuickItemView;

export type QQuickGridViewAttached = {} & QQuickItemViewAttached;

export enum QQuickImage_HAlignment {
  AlignLeft = 1,
  AlignRight = 2,
  AlignHCenter = 4,
}
export enum QQuickImage_VAlignment {
  AlignTop = 32,
  AlignBottom = 64,
  AlignVCenter = 128,
}
export enum QQuickImage_FillMode {
  Stretch = 0,
  PreserveAspectFit = 1,
  PreserveAspectCrop = 2,
  Tile = 3,
  TileVertically = 4,
  TileHorizontally = 5,
  Pad = 6,
}

export type QQuickImage = {
  fillMode: QQuickImage_FillMode | string;
  readonly paintedWidth: number;
  readonly paintedHeight: number;
  horizontalAlignment: QQuickImage_HAlignment | string;
  verticalAlignment: QQuickImage_VAlignment | string;
  mipmap: boolean | undefined;
  autoTransform: boolean | undefined;

  paintedGeometryChanged: Signal<Function>;
  horizontalAlignmentChanged: Signal<Function>;
  verticalAlignmentChanged: Signal<Function>;
  mipmapChanged: Signal<Function>;
  autoTransformChanged: Signal<Function>;
} & QQuickImageBase;

export enum QQuickImageBase_Status {
  Null = 0,
  Ready = 1,
  Loading = 2,
  Error = 3,
}

export type QQuickImageBase = {
  readonly status: QQuickImageBase_Status | string;
  source: string | undefined;
  readonly progress: number;
  asynchronous: boolean | undefined;
  cache: boolean | undefined;
  sourceSize: any;
  mirror: boolean | undefined;

  sourceChanged: Signal<Function>;
  statusChanged: Signal<Function>;
  progressChanged: Signal<Function>;
} & QQuickImplicitSizeItem;

export type QQuickImplicitSizeItem = {
  readonly implicitWidth: number;
  readonly implicitHeight: number;
} & QQuickItem;

export type QQuickIntValidator = {
  locale: string | undefined;

  localeNameChanged: Signal<Function>;
} & QIntValidator;

export enum QQuickItem_TransformOrigin {
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

export type QQuickItem = {
  parent: QQuickItem | null;
  readonly data: QtQml.QObject;
  readonly resources: QtQml.QObject;
  readonly children: QQuickItem;
  x: number | undefined;
  y: number | undefined;
  z: number | undefined;
  width: number | undefined;
  height: number | undefined;
  opacity: number | undefined;
  enabled: boolean | undefined;
  visible: boolean | undefined;
  readonly visibleChildren: QQuickItem;
  readonly states: QQuickState;
  readonly transitions: QQuickTransition;
  state: string | undefined;
  readonly childrenRect: any;
  readonly anchors: QQuickAnchors;
  readonly left: any;
  readonly right: any;
  readonly horizontalCenter: any;
  readonly top: any;
  readonly bottom: any;
  readonly verticalCenter: any;
  readonly baseline: any;
  baselineOffset: number | undefined;
  clip: boolean | undefined;
  focus: boolean | undefined;
  readonly activeFocus: boolean;
  activeFocusOnTab: boolean | undefined;
  rotation: number | undefined;
  scale: number | undefined;
  transformOrigin: QQuickItem_TransformOrigin | string;
  readonly transformOriginPoint: any;
  readonly transform: QQuickTransform;
  smooth: boolean | undefined;
  antialiasing: boolean | undefined;
  implicitWidth: number | undefined;
  implicitHeight: number | undefined;
  readonly layer: QQuickItemLayer;

  update(): void;
  grabToImage(callback: any, targetSize: any): boolean | undefined;
  grabToImage(callback: any): boolean | undefined;
  contains(point: any): boolean | undefined;
  mapFromItem(param0: any): void;
  mapToItem(param0: any): void;
  mapFromGlobal(param0: any): void;
  mapToGlobal(param0: any): void;
  forceActiveFocus(): void;
  forceActiveFocus(reason: any): void;
  nextItemInFocusChain(forward: boolean | undefined): any;
  nextItemInFocusChain(): any;
  childAt(x: number | undefined, y: number | undefined): any;

  childrenRectChanged: Signal<Function>;
  baselineOffsetChanged: Signal<Function>;
  stateChanged: Signal<Function>;
  focusChanged: Signal<Function>;
  activeFocusChanged: Signal<Function>;
  activeFocusOnTabChanged: Signal<Function>;
  parentChanged: Signal<Function>;
  transformOriginChanged: Signal<Function>;
  smoothChanged: Signal<Function>;
  antialiasingChanged: Signal<Function>;
  clipChanged: Signal<Function>;
  windowChanged: Signal<Function>;
} & QtQml.QObject;

export type QQuickItemGrabResult = {
  readonly image: any;
  readonly url: string;

  saveToFile(fileName: string | undefined): boolean | undefined;
  saveToFile(fileName: string | undefined): boolean | undefined;

  ready: Signal<Function>;
} & QtQml.QObject;

export type QQuickItemLayer = {
  enabled: boolean | undefined;
  textureSize: any;
  sourceRect: any;
  mipmap: boolean | undefined;
  smooth: boolean | undefined;
  wrapMode: any;
  format: any;
  samplerName: any;
  effect: QtQml.QQmlComponent | null;
  textureMirroring: any;
  samples: number | undefined;

  enabledChanged: Signal<Function>;
  sizeChanged: Signal<Function>;
  mipmapChanged: Signal<Function>;
  wrapModeChanged: Signal<Function>;
  nameChanged: Signal<Function>;
  effectChanged: Signal<Function>;
  smoothChanged: Signal<Function>;
  formatChanged: Signal<Function>;
  sourceRectChanged: Signal<Function>;
  textureMirroringChanged: Signal<Function>;
  samplesChanged: Signal<Function>;
} & QtQml.QObject;

export enum QQuickItemView_LayoutDirection {
  LeftToRight = 0,
  RightToLeft = 1,
  VerticalTopToBottom = 2,
  VerticalBottomToTop = 3,
}
export enum QQuickItemView_VerticalLayoutDirection {
  TopToBottom = 2,
  BottomToTop = 3,
}
export enum QQuickItemView_HighlightRangeMode {
  NoHighlightRange = 0,
  ApplyRange = 1,
  StrictlyEnforceRange = 2,
}
export enum QQuickItemView_PositionMode {
  Beginning = 0,
  Center = 1,
  End = 2,
  Visible = 3,
  Contain = 4,
  SnapPosition = 5,
}

export type QQuickItemView = {
  model: any;
  delegate: QtQml.QQmlComponent | null;
  readonly count: number;
  currentIndex: number | undefined;
  readonly currentItem: QQuickItem;
  keyNavigationWraps: boolean | undefined;
  keyNavigationEnabled: boolean | undefined;
  cacheBuffer: number | undefined;
  displayMarginBeginning: number | undefined;
  displayMarginEnd: number | undefined;
  layoutDirection: any;
  readonly effectiveLayoutDirection: any;
  verticalLayoutDirection: QQuickItemView_VerticalLayoutDirection | string;
  header: QtQml.QQmlComponent | null;
  readonly headerItem: QQuickItem;
  footer: QtQml.QQmlComponent | null;
  readonly footerItem: QQuickItem;
  populate: QQuickTransition | null;
  add: QQuickTransition | null;
  addDisplaced: QQuickTransition | null;
  move: QQuickTransition | null;
  moveDisplaced: QQuickTransition | null;
  remove: QQuickTransition | null;
  removeDisplaced: QQuickTransition | null;
  displaced: QQuickTransition | null;
  highlight: QtQml.QQmlComponent | null;
  readonly highlightItem: QQuickItem;
  highlightFollowsCurrentItem: boolean | undefined;
  highlightRangeMode: QQuickItemView_HighlightRangeMode | string;
  preferredHighlightBegin: number | undefined;
  preferredHighlightEnd: number | undefined;
  highlightMoveDuration: number | undefined;

  positionViewAtIndex(
    index: number | undefined,
    mode: number | undefined
  ): void;
  indexAt(x: number | undefined, y: number | undefined): number | undefined;
  itemAt(x: number | undefined, y: number | undefined): any;
  positionViewAtBeginning(): void;
  positionViewAtEnd(): void;
  forceLayout(): void;

  keyNavigationEnabledChanged: Signal<Function>;
  populateTransitionChanged: Signal<Function>;
  addTransitionChanged: Signal<Function>;
  addDisplacedTransitionChanged: Signal<Function>;
  moveTransitionChanged: Signal<Function>;
  moveDisplacedTransitionChanged: Signal<Function>;
  removeTransitionChanged: Signal<Function>;
  removeDisplacedTransitionChanged: Signal<Function>;
  displacedTransitionChanged: Signal<Function>;
} & QQuickFlickable;

export type QQuickItemViewAttached = {
  readonly view: QQuickItemView;
  readonly isCurrentItem: boolean;
  delayRemove: boolean | undefined;
  readonly section: string;
  readonly previousSection: string;
  readonly nextSection: string;

  currentItemChanged: Signal<Function>;
  add: Signal<Function>;
  remove: Signal<Function>;
  prevSectionChanged: Signal<Function>;
} & QtQml.QObject;

export type QQuickKeyEvent = {
  readonly key: number;
  readonly text: string;
  readonly modifiers: number;
  readonly isAutoRepeat: boolean;
  readonly count: number;
  readonly nativeScanCode: any;
  accepted: boolean | undefined;

  matches(key: any): boolean | undefined;
} & QtQml.QObject;

export enum QQuickKeyNavigationAttached_Priority {
  BeforeItem = 0,
  AfterItem = 1,
}

export type QQuickKeyNavigationAttached = {
  left: QQuickItem | null;
  right: QQuickItem | null;
  up: QQuickItem | null;
  down: QQuickItem | null;
  tab: QQuickItem | null;
  backtab: QQuickItem | null;
  priority: QQuickKeyNavigationAttached_Priority | string;
} & QtQml.QObject;

export enum QQuickKeysAttached_Priority {
  BeforeItem = 0,
  AfterItem = 1,
}

export type QQuickKeysAttached = {
  enabled: boolean | undefined;
  readonly forwardTo: QQuickItem;
  priority: QQuickKeysAttached_Priority | string;

  pressed: Signal<Function>;
  released: Signal<Function>;
  shortcutOverride: Signal<Function>;
  digit0Pressed: Signal<Function>;
  digit1Pressed: Signal<Function>;
  digit2Pressed: Signal<Function>;
  digit3Pressed: Signal<Function>;
  digit4Pressed: Signal<Function>;
  digit5Pressed: Signal<Function>;
  digit6Pressed: Signal<Function>;
  digit7Pressed: Signal<Function>;
  digit8Pressed: Signal<Function>;
  digit9Pressed: Signal<Function>;
  leftPressed: Signal<Function>;
  rightPressed: Signal<Function>;
  upPressed: Signal<Function>;
  downPressed: Signal<Function>;
  tabPressed: Signal<Function>;
  backtabPressed: Signal<Function>;
  asteriskPressed: Signal<Function>;
  numberSignPressed: Signal<Function>;
  escapePressed: Signal<Function>;
  returnPressed: Signal<Function>;
  enterPressed: Signal<Function>;
  deletePressed: Signal<Function>;
  spacePressed: Signal<Function>;
  backPressed: Signal<Function>;
  cancelPressed: Signal<Function>;
  selectPressed: Signal<Function>;
  yesPressed: Signal<Function>;
  noPressed: Signal<Function>;
  context1Pressed: Signal<Function>;
  context2Pressed: Signal<Function>;
  context3Pressed: Signal<Function>;
  context4Pressed: Signal<Function>;
  callPressed: Signal<Function>;
  hangupPressed: Signal<Function>;
  flipPressed: Signal<Function>;
  menuPressed: Signal<Function>;
  volumeUpPressed: Signal<Function>;
  volumeDownPressed: Signal<Function>;
} & QtQml.QObject;

export type QQuickLayoutMirroringAttached = {
  enabled: boolean | undefined;
  childrenInherit: boolean | undefined;
} & QtQml.QObject;

export enum QQuickListView_Orientation {
  Horizontal = 1,
  Vertical = 2,
}
export enum QQuickListView_SnapMode {
  NoSnap = 0,
  SnapToItem = 1,
  SnapOneItem = 2,
}
export enum QQuickListView_HeaderPositioning {
  InlineHeader = 0,
  OverlayHeader = 1,
  PullBackHeader = 2,
}
export enum QQuickListView_FooterPositioning {
  InlineFooter = 0,
  OverlayFooter = 1,
  PullBackFooter = 2,
}

export type QQuickListView = {
  highlightMoveVelocity: number | undefined;
  highlightResizeVelocity: number | undefined;
  highlightResizeDuration: number | undefined;
  spacing: number | undefined;
  orientation: QQuickListView_Orientation | string;
  readonly section: QQuickViewSection;
  readonly currentSection: string;
  snapMode: QQuickListView_SnapMode | string;
  headerPositioning: QQuickListView_HeaderPositioning | string;
  footerPositioning: QQuickListView_FooterPositioning | string;

  incrementCurrentIndex(): void;
  decrementCurrentIndex(): void;

  headerPositioningChanged: Signal<Function>;
  footerPositioningChanged: Signal<Function>;
} & QQuickItemView;

export type QQuickListViewAttached = {} & QQuickItemViewAttached;

export enum QQuickLoader_Status {
  Null = 0,
  Ready = 1,
  Loading = 2,
  Error = 3,
}

export type QQuickLoader = {
  active: boolean | undefined;
  source: string | undefined;
  sourceComponent: QtQml.QQmlComponent | null;
  readonly item: QtQml.QObject;
  readonly status: QQuickLoader_Status | string;
  readonly progress: number;
  asynchronous: boolean | undefined;

  setSource(param0: any): void;

  loaded: Signal<Function>;
} & QQuickImplicitSizeItem;

export type QQuickMatrix4x4 = {
  matrix: any;
} & QQuickTransform;

export type QQuickMouseArea = {
  readonly mouseX: number;
  readonly mouseY: number;
  readonly containsMouse: boolean;
  readonly pressed: boolean;
  enabled: boolean | undefined;
  scrollGestureEnabled: boolean | undefined;
  readonly pressedButtons: any;
  acceptedButtons: any;
  hoverEnabled: boolean | undefined;
  readonly drag: QQuickDrag;
  preventStealing: boolean | undefined;
  propagateComposedEvents: boolean | undefined;
  cursorShape: any;
  readonly containsPress: boolean;
  pressAndHoldInterval: number | undefined;

  hoveredChanged: Signal<Function>;
  scrollGestureEnabledChanged: Signal<Function>;
  positionChanged: Signal<Function>;
  mouseXChanged: Signal<Function>;
  mouseYChanged: Signal<Function>;
  pressAndHold: Signal<Function>;
  released: Signal<Function>;
  clicked: Signal<Function>;
  doubleClicked: Signal<Function>;
  wheel: Signal<Function>;
  entered: Signal<Function>;
  exited: Signal<Function>;
  canceled: Signal<Function>;
  containsPressChanged: Signal<Function>;
  pressAndHoldIntervalChanged: Signal<Function>;
} & QQuickItem;

export type QQuickMultiPointTouchArea = {
  readonly touchPoints: QQuickTouchPoint;
  minimumTouchPoints: number | undefined;
  maximumTouchPoints: number | undefined;
  mouseEnabled: boolean | undefined;

  pressed: Signal<Function>;
  updated: Signal<Function>;
  released: Signal<Function>;
  canceled: Signal<Function>;
  gestureStarted: Signal<Function>;
  touchUpdated: Signal<Function>;
} & QQuickItem;

export type QQuickNumberAnimation = {
  from: number | undefined;
  to: number | undefined;
} & QQuickPropertyAnimation;

export type QQuickOpacityAnimator = {} & QQuickAnimator;

export enum QQuickOpenGLInfo_ContextProfile {
  NoProfile = 0,
  CoreProfile = 1,
  CompatibilityProfile = 2,
}
export enum QQuickOpenGLInfo_RenderableType {
  Unspecified = 0,
  OpenGL = 1,
  OpenGLES = 2,
}

export type QQuickOpenGLInfo = {
  readonly majorVersion: number;
  readonly minorVersion: number;
  readonly profile: QQuickOpenGLInfo_ContextProfile | string;
  readonly renderableType: QQuickOpenGLInfo_RenderableType | string;
} & QtQml.QObject;

export type QQuickPackage = {
  readonly data: QtQml.QObject;
} & QtQml.QObject;

export type QQuickPackageAttached = {
  name: string | undefined;
} & QtQml.QObject;

export enum QQuickPaintedItem_RenderTarget {
  Image = 0,
  FramebufferObject = 1,
  InvertedYFramebufferObject = 2,
}

export type QQuickPaintedItem = {
  contentsSize: any;
  fillColor: any;
  contentsScale: number | undefined;
  renderTarget: QQuickPaintedItem_RenderTarget | string;
  textureSize: any;
} & QQuickItem;

export type QQuickParallelAnimation = {} & QQuickAnimationGroup;

export type QQuickParentAnimation = {
  target: QQuickItem | null;
  newParent: QQuickItem | null;
  via: QQuickItem | null;
} & QQuickAnimationGroup;

export type QQuickParentChange = {
  target: QQuickItem | null;
  parent: QQuickItem | null;
  x: any;
  y: any;
  width: any;
  height: any;
  scale: any;
  rotation: any;
} & QQuickStateOperation;

export type QQuickPath = {
  readonly pathElements: QQuickPathElement;
  startX: number | undefined;
  startY: number | undefined;
  readonly closed: boolean;

  changed: Signal<Function>;
} & QtQml.QObject;

export enum QQuickPathAnimation_Orientation {
  Fixed = 0,
  RightFirst = 1,
  LeftFirst = 2,
  BottomFirst = 3,
  TopFirst = 4,
}

export type QQuickPathAnimation = {
  duration: number | undefined;
  easing: any;
  path: QQuickPath | null;
  target: QQuickItem | null;
  orientation: QQuickPathAnimation_Orientation | string;
  anchorPoint: any;
  orientationEntryDuration: number | undefined;
  orientationExitDuration: number | undefined;
  endRotation: number | undefined;

  durationChanged: Signal<Function>;
  easingChanged: Signal<Function>;
  orientationChanged: Signal<Function>;
  anchorPointChanged: Signal<Function>;
  orientationEntryDurationChanged: Signal<Function>;
  orientationExitDurationChanged: Signal<Function>;
  endRotationChanged: Signal<Function>;
} & QQuickAbstractAnimation;

export enum QQuickPathArc_ArcDirection {
  Clockwise = 0,
  Counterclockwise = 1,
}

export type QQuickPathArc = {
  radiusX: number | undefined;
  radiusY: number | undefined;
  useLargeArc: boolean | undefined;
  direction: QQuickPathArc_ArcDirection | string;
  xAxisRotation: number | undefined;

  xAxisRotationChanged: Signal<Function>;
} & QQuickCurve;

export type QQuickPathAttribute = {
  name: string | undefined;
  value: number | undefined;
} & QQuickPathElement;

export type QQuickPathCatmullRomCurve = {} & QQuickCurve;

export type QQuickPathCubic = {
  control1X: number | undefined;
  control1Y: number | undefined;
  control2X: number | undefined;
  control2Y: number | undefined;
  relativeControl1X: number | undefined;
  relativeControl1Y: number | undefined;
  relativeControl2X: number | undefined;
  relativeControl2Y: number | undefined;
} & QQuickCurve;

export type QQuickPathElement = {
  changed: Signal<Function>;
} & QtQml.QObject;

export type QQuickPathInterpolator = {
  path: QQuickPath | null;
  progress: number | undefined;
  readonly x: number;
  readonly y: number;
  readonly angle: number;
} & QtQml.QObject;

export type QQuickPathLine = {} & QQuickCurve;

export type QQuickPathMove = {} & QQuickCurve;

export type QQuickPathPercent = {
  value: number | undefined;
} & QQuickPathElement;

export type QQuickPathQuad = {
  controlX: number | undefined;
  controlY: number | undefined;
  relativeControlX: number | undefined;
  relativeControlY: number | undefined;
} & QQuickCurve;

export type QQuickPathSvg = {
  path: string | undefined;
} & QQuickCurve;

export enum QQuickPathView_HighlightRangeMode {
  NoHighlightRange = 0,
  ApplyRange = 1,
  StrictlyEnforceRange = 2,
}
export enum QQuickPathView_SnapMode {
  NoSnap = 0,
  SnapToItem = 1,
  SnapOneItem = 2,
}
export enum QQuickPathView_MovementDirection {
  Shortest = 0,
  Negative = 1,
  Positive = 2,
}
export enum QQuickPathView_PositionMode {
  Beginning = 0,
  Center = 1,
  End = 2,
  Contain = 4,
  SnapPosition = 5,
}

export type QQuickPathView = {
  model: any;
  path: QQuickPath | null;
  currentIndex: number | undefined;
  readonly currentItem: QQuickItem;
  offset: number | undefined;
  highlight: QtQml.QQmlComponent | null;
  readonly highlightItem: QQuickItem;
  preferredHighlightBegin: number | undefined;
  preferredHighlightEnd: number | undefined;
  highlightRangeMode: QQuickPathView_HighlightRangeMode | string;
  highlightMoveDuration: number | undefined;
  dragMargin: number | undefined;
  maximumFlickVelocity: number | undefined;
  flickDeceleration: number | undefined;
  interactive: boolean | undefined;
  readonly moving: boolean;
  readonly flicking: boolean;
  readonly dragging: boolean;
  readonly count: number;
  delegate: QtQml.QQmlComponent | null;
  pathItemCount: number | undefined;
  snapMode: QQuickPathView_SnapMode | string;
  movementDirection: QQuickPathView_MovementDirection | string;
  cacheItemCount: number | undefined;

  incrementCurrentIndex(): void;
  decrementCurrentIndex(): void;
  positionViewAtIndex(
    index: number | undefined,
    mode: number | undefined
  ): void;
  indexAt(x: number | undefined, y: number | undefined): number | undefined;
  itemAt(x: number | undefined, y: number | undefined): any;

  snapPositionChanged: Signal<Function>;
  movementStarted: Signal<Function>;
  movementEnded: Signal<Function>;
  movementDirectionChanged: Signal<Function>;
  flickStarted: Signal<Function>;
  flickEnded: Signal<Function>;
  dragStarted: Signal<Function>;
  dragEnded: Signal<Function>;
} & QQuickItem;

export type QQuickPathViewAttached = {
  readonly view: QQuickPathView;
  readonly isCurrentItem: boolean;
  readonly onPath: boolean;

  currentItemChanged: Signal<Function>;
  pathChanged: Signal<Function>;
} & QtQml.QObject;

export type QQuickPauseAnimation = {
  duration: number | undefined;

  durationChanged: Signal<Function>;
} & QQuickAbstractAnimation;

export type QQuickPen = {
  width: number | undefined;
  color: any;
  pixelAligned: boolean | undefined;

  penChanged: Signal<Function>;
} & QtQml.QObject;

export enum QQuickPinch_Axis {
  NoDrag = 0,
  XAxis = 1,
  YAxis = 2,
  XAndYAxis = 3,
  XandYAxis = 3,
}

export type QQuickPinch = {
  target: QQuickItem | null;
  minimumScale: number | undefined;
  maximumScale: number | undefined;
  minimumRotation: number | undefined;
  maximumRotation: number | undefined;
  dragAxis: QQuickPinch_Axis | string;
  minimumX: number | undefined;
  maximumX: number | undefined;
  minimumY: number | undefined;
  maximumY: number | undefined;
  readonly active: boolean;
} & QtQml.QObject;

export type QQuickPinchArea = {
  enabled: boolean | undefined;
  readonly pinch: QQuickPinch;

  pinchStarted: Signal<Function>;
  pinchUpdated: Signal<Function>;
  pinchFinished: Signal<Function>;
  smartZoom: Signal<Function>;
} & QQuickItem;

export type QQuickPinchEvent = {
  readonly center: any;
  readonly startCenter: any;
  readonly previousCenter: any;
  readonly scale: number;
  readonly previousScale: number;
  readonly angle: number;
  readonly previousAngle: number;
  readonly rotation: number;
  readonly point1: any;
  readonly startPoint1: any;
  readonly point2: any;
  readonly startPoint2: any;
  readonly pointCount: number;
  accepted: boolean | undefined;
} & QtQml.QObject;

export type QQuickPositionerAttached = {
  readonly index: number;
  readonly isFirstItem: boolean;
  readonly isLastItem: boolean;
} & QtQml.QObject;

export type QQuickPropertyAction = {
  target: QtQml.QObject | null;
  property: string | undefined;
  properties: string | undefined;
  readonly targets: QtQml.QObject;
  readonly exclude: QtQml.QObject;
  value: any;

  valueChanged: Signal<Function>;
  propertiesChanged: Signal<Function>;
} & QQuickAbstractAnimation;

export type QQuickPropertyAnimation = {
  duration: number | undefined;
  from: any;
  to: any;
  easing: any;
  target: QtQml.QObject | null;
  property: string | undefined;
  properties: string | undefined;
  readonly targets: QtQml.QObject;
  readonly exclude: QtQml.QObject;

  durationChanged: Signal<Function>;
  fromChanged: Signal<Function>;
  toChanged: Signal<Function>;
  easingChanged: Signal<Function>;
  propertiesChanged: Signal<Function>;
} & QQuickAbstractAnimation;

export type QQuickPropertyChanges = {
  target: QtQml.QObject | null;
  restoreEntryValues: boolean | undefined;
  explicit: boolean | undefined;
} & QQuickStateOperation;

export type QQuickRectangle = {
  color: any;
  gradient: QQuickGradient | null;
  readonly border: QQuickPen;
  radius: number | undefined;
} & QQuickItem;

export type QQuickRepeater = {
  model: any;
  delegate: QtQml.QQmlComponent | null;
  readonly count: number;

  itemAt(index: number | undefined): any;

  itemAdded: Signal<Function>;
  itemRemoved: Signal<Function>;
} & QQuickItem;

export type QQuickRotation = {
  origin: any;
  angle: number | undefined;
  axis: any;
} & QQuickTransform;

export enum QQuickRotationAnimation_RotationDirection {
  Numerical = 0,
  Shortest = 1,
  Clockwise = 2,
  Counterclockwise = 3,
}

export type QQuickRotationAnimation = {
  from: number | undefined;
  to: number | undefined;
  direction: QQuickRotationAnimation_RotationDirection | string;
} & QQuickPropertyAnimation;

export enum QQuickRotationAnimator_RotationDirection {
  Numerical = 0,
  Shortest = 1,
  Clockwise = 2,
  Counterclockwise = 3,
}

export type QQuickRotationAnimator = {
  direction: QQuickRotationAnimator_RotationDirection | string;

  directionChanged: Signal<Function>;
} & QQuickAnimator;

export type QQuickRow = {
  layoutDirection: any;
  readonly effectiveLayoutDirection: any;
} & QQuickBasePositioner;

export type QQuickScale = {
  origin: any;
  xScale: number | undefined;
  yScale: number | undefined;
  zScale: number | undefined;

  scaleChanged: Signal<Function>;
} & QQuickTransform;

export type QQuickScaleAnimator = {} & QQuickAnimator;

export type QQuickScaleGrid = {
  left: number | undefined;
  top: number | undefined;
  right: number | undefined;
  bottom: number | undefined;

  borderChanged: Signal<Function>;
} & QtQml.QObject;

export type QQuickScriptAction = {
  script: any;
  scriptName: string | undefined;
} & QQuickAbstractAnimation;

export type QQuickSequentialAnimation = {} & QQuickAnimationGroup;

export enum QQuickShaderEffect_CullMode {
  NoCulling = 0,
  BackFaceCulling = 1,
  FrontFaceCulling = 2,
}
export enum QQuickShaderEffect_Status {
  Compiled = 0,
  Uncompiled = 1,
  Error = 2,
}

export type QQuickShaderEffect = {
  fragmentShader: any;
  vertexShader: any;
  blending: boolean | undefined;
  mesh: any;
  cullMode: QQuickShaderEffect_CullMode | string;
  readonly log: string;
  readonly status: QQuickShaderEffect_Status | string;
  supportsAtlasTextures: boolean | undefined;
} & QQuickItem;

export type QQuickShaderEffectMesh = {
  geometryChanged: Signal<Function>;
} & QtQml.QObject;

export enum QQuickShaderEffectSource_WrapMode {
  ClampToEdge = 0,
  RepeatHorizontally = 1,
  RepeatVertically = 2,
  Repeat = 3,
}
export enum QQuickShaderEffectSource_Format {
  Alpha = 6406,
  RGB = 6407,
  RGBA = 6408,
}
export enum QQuickShaderEffectSource_TextureMirroring {
  NoMirroring = 0,
  MirrorHorizontally = 1,
  MirrorVertically = 2,
}

export type QQuickShaderEffectSource = {
  wrapMode: QQuickShaderEffectSource_WrapMode | string;
  sourceItem: QQuickItem | null;
  sourceRect: any;
  textureSize: any;
  format: QQuickShaderEffectSource_Format | string;
  live: boolean | undefined;
  hideSource: boolean | undefined;
  mipmap: boolean | undefined;
  recursive: boolean | undefined;
  textureMirroring: QQuickShaderEffectSource_TextureMirroring | string;
  samples: number | undefined;

  scheduleUpdate(): void;

  scheduledUpdateCompleted: Signal<Function>;
} & QQuickItem;

export type QQuickShortcut = {
  sequence: any;
  sequences: any;
  readonly nativeText: string;
  readonly portableText: string;
  enabled: boolean | undefined;
  autoRepeat: boolean | undefined;
  context: any;

  sequencesChanged: Signal<Function>;
  activated: Signal<Function>;
  activatedAmbiguously: Signal<Function>;
} & QtQml.QObject;

export enum QQuickSmoothedAnimation_ReversingMode {
  Eased = 0,
  Immediate = 1,
  Sync = 2,
}

export type QQuickSmoothedAnimation = {
  velocity: number | undefined;
  reversingMode: QQuickSmoothedAnimation_ReversingMode | string;
  maximumEasingTime: number | undefined;
} & QQuickNumberAnimation;

export type QQuickSpringAnimation = {
  velocity: number | undefined;
  spring: number | undefined;
  damping: number | undefined;
  epsilon: number | undefined;
  modulus: number | undefined;
  mass: number | undefined;

  syncChanged: Signal<Function>;
} & QQuickNumberAnimation;

export type QQuickSprite = {
  source: string | undefined;
  reverse: boolean | undefined;
  frameSync: boolean | undefined;
  frames: number | undefined;
  frameCount: number | undefined;
  frameHeight: number | undefined;
  frameWidth: number | undefined;
  frameX: number | undefined;
  frameY: number | undefined;
  frameRate: number | undefined;
  frameRateVariation: number | undefined;
  frameDuration: number | undefined;
  frameDurationVariation: number | undefined;

  setSource(arg: string | undefined): void;
  setFrameHeight(arg: number | undefined): void;
  setFrameWidth(arg: number | undefined): void;
  setReverse(arg: boolean | undefined): void;
  setFrames(arg: number | undefined): void;
  setFrameCount(arg: number | undefined): void;
  setFrameX(arg: number | undefined): void;
  setFrameY(arg: number | undefined): void;
  setFrameRate(arg: number | undefined): void;
  setFrameRateVariation(arg: number | undefined): void;
  setFrameDuration(arg: number | undefined): void;
  setFrameDurationVariation(arg: number | undefined): void;
  setFrameSync(arg: boolean | undefined): void;

  sourceChanged: Signal<Function>;
  frameHeightChanged: Signal<Function>;
  frameWidthChanged: Signal<Function>;
  reverseChanged: Signal<Function>;
  frameCountChanged: Signal<Function>;
  frameXChanged: Signal<Function>;
  frameYChanged: Signal<Function>;
  frameRateChanged: Signal<Function>;
  frameRateVariationChanged: Signal<Function>;
  frameDurationChanged: Signal<Function>;
  frameDurationVariationChanged: Signal<Function>;
  frameSyncChanged: Signal<Function>;
} & QQuickStochasticState;

export type QQuickSpriteSequence = {
  running: boolean | undefined;
  interpolate: boolean | undefined;
  goalSprite: string | undefined;
  readonly currentSprite: string;
  readonly sprites: QQuickSprite;

  jumpTo(sprite: string | undefined): void;
  setGoalSprite(sprite: string | undefined): void;
  setRunning(arg: boolean | undefined): void;
  setInterpolate(arg: boolean | undefined): void;

  runningChanged: Signal<Function>;
  interpolateChanged: Signal<Function>;
  goalSpriteChanged: Signal<Function>;
  currentSpriteChanged: Signal<Function>;
} & QQuickItem;

export type QQuickState = {
  name: string | undefined;
  when: any;
  extend: string | undefined;
  readonly changes: QQuickStateOperation;

  completed: Signal<Function>;
} & QtQml.QObject;

export type QQuickStateChangeScript = {
  script: any;
  name: string | undefined;
} & QQuickStateOperation;

export type QQuickStateGroup = {
  state: string | undefined;
  readonly states: QQuickState;
  readonly transitions: QQuickTransition;

  stateChanged: Signal<Function>;
} & QtQml.QObject;

export type QQuickStateOperation = {} & QtQml.QObject;

export type QQuickStochasticState = {
  duration: number | undefined;
  durationVariation: number | undefined;
  randomStart: boolean | undefined;
  to: any;
  name: string | undefined;

  setDuration(arg: number | undefined): void;
  setName(arg: string | undefined): void;
  setTo(arg: any): void;
  setDurationVariation(arg: number | undefined): void;
  setRandomStart(arg: boolean | undefined): void;

  durationChanged: Signal<Function>;
  nameChanged: Signal<Function>;
  toChanged: Signal<Function>;
  durationVariationChanged: Signal<Function>;
  entered: Signal<Function>;
  randomStartChanged: Signal<Function>;
} & QtQml.QObject;

export enum QQuickSystemPalette_ColorGroup {
  Active = 0,
  Inactive = 2,
  Disabled = 1,
}

export type QQuickSystemPalette = {
  colorGroup: any;
  readonly window: any;
  readonly windowText: any;
  readonly base: any;
  readonly text: any;
  readonly alternateBase: any;
  readonly button: any;
  readonly buttonText: any;
  readonly light: any;
  readonly midlight: any;
  readonly dark: any;
  readonly mid: any;
  readonly shadow: any;
  readonly highlight: any;
  readonly highlightedText: any;

  paletteChanged: Signal<Function>;
} & QtQml.QObject;

export enum QQuickText_HAlignment {
  AlignLeft = 1,
  AlignRight = 2,
  AlignHCenter = 4,
  AlignJustify = 8,
}
export enum QQuickText_VAlignment {
  AlignTop = 32,
  AlignBottom = 64,
  AlignVCenter = 128,
}
export enum QQuickText_TextStyle {
  Normal = 0,
  Outline = 1,
  Raised = 2,
  Sunken = 3,
}
export enum QQuickText_TextFormat {
  PlainText = 0,
  RichText = 1,
  AutoText = 2,
  StyledText = 4,
}
export enum QQuickText_TextElideMode {
  ElideLeft = 0,
  ElideRight = 1,
  ElideMiddle = 2,
  ElideNone = 3,
}
export enum QQuickText_WrapMode {
  NoWrap = 0,
  WordWrap = 1,
  WrapAnywhere = 3,
  WrapAtWordBoundaryOrAnywhere = 4,
  Wrap = 4,
}
export enum QQuickText_RenderType {
  QtRendering = 0,
  NativeRendering = 1,
}
export enum QQuickText_LineHeightMode {
  ProportionalHeight = 0,
  FixedHeight = 1,
}
export enum QQuickText_FontSizeMode {
  FixedSize = 0,
  HorizontalFit = 1,
  VerticalFit = 2,
  Fit = 3,
}

export type QQuickText = {
  text: string | undefined;
  font: any;
  color: any;
  linkColor: any;
  style: QQuickText_TextStyle | string;
  styleColor: any;
  horizontalAlignment: QQuickText_HAlignment | string;
  readonly effectiveHorizontalAlignment: QQuickText_HAlignment | string;
  verticalAlignment: QQuickText_VAlignment | string;
  wrapMode: QQuickText_WrapMode | string;
  readonly lineCount: number;
  readonly truncated: boolean;
  maximumLineCount: number | undefined;
  textFormat: QQuickText_TextFormat | string;
  elide: QQuickText_TextElideMode | string;
  readonly contentWidth: number;
  readonly contentHeight: number;
  readonly paintedWidth: number;
  readonly paintedHeight: number;
  lineHeight: number | undefined;
  lineHeightMode: QQuickText_LineHeightMode | string;
  baseUrl: string | undefined;
  minimumPixelSize: number | undefined;
  minimumPointSize: number | undefined;
  fontSizeMode: QQuickText_FontSizeMode | string;
  renderType: QQuickText_RenderType | string;
  readonly hoveredLink: string;
  padding: number | undefined;
  topPadding: number | undefined;
  leftPadding: number | undefined;
  rightPadding: number | undefined;
  bottomPadding: number | undefined;
  readonly fontInfo: any;
  readonly advance: any;

  doLayout(): void;
  forceLayout(): void;
  linkAt(x: number | undefined, y: number | undefined): string | undefined;

  textChanged: Signal<Function>;
  linkActivated: Signal<Function>;
  linkHovered: Signal<Function>;
  fontChanged: Signal<Function>;
  styleChanged: Signal<Function>;
  horizontalAlignmentChanged: Signal<Function>;
  verticalAlignmentChanged: Signal<Function>;
  textFormatChanged: Signal<Function>;
  elideModeChanged: Signal<Function>;
  contentSizeChanged: Signal<Function>;
  lineHeightChanged: Signal<Function>;
  lineHeightModeChanged: Signal<Function>;
  lineLaidOut: Signal<Function>;
  paddingChanged: Signal<Function>;
  topPaddingChanged: Signal<Function>;
  leftPaddingChanged: Signal<Function>;
  rightPaddingChanged: Signal<Function>;
  bottomPaddingChanged: Signal<Function>;
  fontInfoChanged: Signal<Function>;
} & QQuickImplicitSizeItem;

export type QQuickTextDocument = {} & QtQml.QObject;

export enum QQuickTextEdit_HAlignment {
  AlignLeft = 1,
  AlignRight = 2,
  AlignHCenter = 4,
  AlignJustify = 8,
}
export enum QQuickTextEdit_VAlignment {
  AlignTop = 32,
  AlignBottom = 64,
  AlignVCenter = 128,
}
export enum QQuickTextEdit_TextFormat {
  PlainText = 0,
  RichText = 1,
  AutoText = 2,
}
export enum QQuickTextEdit_WrapMode {
  NoWrap = 0,
  WordWrap = 1,
  WrapAnywhere = 3,
  WrapAtWordBoundaryOrAnywhere = 4,
  Wrap = 4,
}
export enum QQuickTextEdit_SelectionMode {
  SelectCharacters = 0,
  SelectWords = 1,
}
export enum QQuickTextEdit_RenderType {
  QtRendering = 0,
  NativeRendering = 1,
}

export type QQuickTextEdit = {
  text: string | undefined;
  color: any;
  selectionColor: any;
  selectedTextColor: any;
  font: any;
  horizontalAlignment: QQuickTextEdit_HAlignment | string;
  readonly effectiveHorizontalAlignment: QQuickTextEdit_HAlignment | string;
  verticalAlignment: QQuickTextEdit_VAlignment | string;
  wrapMode: QQuickTextEdit_WrapMode | string;
  readonly lineCount: number;
  readonly length: number;
  readonly contentWidth: number;
  readonly contentHeight: number;
  readonly paintedWidth: number;
  readonly paintedHeight: number;
  textFormat: QQuickTextEdit_TextFormat | string;
  readOnly: boolean | undefined;
  cursorVisible: boolean | undefined;
  cursorPosition: number | undefined;
  readonly cursorRectangle: any;
  cursorDelegate: QtQml.QQmlComponent | null;
  overwriteMode: boolean | undefined;
  readonly selectionStart: number;
  readonly selectionEnd: number;
  readonly selectedText: string;
  activeFocusOnPress: boolean | undefined;
  persistentSelection: boolean | undefined;
  textMargin: number | undefined;
  inputMethodHints: any;
  selectByKeyboard: boolean | undefined;
  selectByMouse: boolean | undefined;
  mouseSelectionMode: QQuickTextEdit_SelectionMode | string;
  readonly canPaste: boolean;
  readonly canUndo: boolean;
  readonly canRedo: boolean;
  readonly inputMethodComposing: boolean;
  baseUrl: string | undefined;
  renderType: QQuickTextEdit_RenderType | string;
  readonly textDocument: QQuickTextDocument;
  readonly hoveredLink: string;
  padding: number | undefined;
  topPadding: number | undefined;
  leftPadding: number | undefined;
  rightPadding: number | undefined;
  bottomPadding: number | undefined;
  readonly preeditText: string;
  tabStopDistance: number | undefined;

  selectAll(): void;
  selectWord(): void;
  select(start: number | undefined, end: number | undefined): void;
  deselect(): void;
  isRightToLeft(
    start: number | undefined,
    end: number | undefined
  ): boolean | undefined;
  cut(): void;
  copy(): void;
  paste(): void;
  undo(): void;
  redo(): void;
  insert(position: number | undefined, text: string | undefined): void;
  remove(start: number | undefined, end: number | undefined): void;
  append(text: string | undefined): void;
  clear(): void;
  inputMethodQuery(query: any, argument: any): any;
  positionToRectangle(param0: number | undefined): any;
  positionAt(x: number | undefined, y: number | undefined): number | undefined;
  moveCursorSelection(pos: number | undefined): void;
  moveCursorSelection(
    pos: number | undefined,
    mode: QQuickTextEdit_SelectionMode | string
  ): void;
  getText(
    start: number | undefined,
    end: number | undefined
  ): string | undefined;
  getFormattedText(
    start: number | undefined,
    end: number | undefined
  ): string | undefined;
  linkAt(x: number | undefined, y: number | undefined): string | undefined;

  preeditTextChanged: Signal<Function>;
  contentSizeChanged: Signal<Function>;
  colorChanged: Signal<Function>;
  selectionColorChanged: Signal<Function>;
  selectedTextColorChanged: Signal<Function>;
  fontChanged: Signal<Function>;
  horizontalAlignmentChanged: Signal<Function>;
  verticalAlignmentChanged: Signal<Function>;
  textFormatChanged: Signal<Function>;
  readOnlyChanged: Signal<Function>;
  cursorVisibleChanged: Signal<Function>;
  overwriteModeChanged: Signal<Function>;
  activeFocusOnPressChanged: Signal<Function>;
  persistentSelectionChanged: Signal<Function>;
  textMarginChanged: Signal<Function>;
  selectByKeyboardChanged: Signal<Function>;
  selectByMouseChanged: Signal<Function>;
  mouseSelectionModeChanged: Signal<Function>;
  linkActivated: Signal<Function>;
  linkHovered: Signal<Function>;
  editingFinished: Signal<Function>;
  paddingChanged: Signal<Function>;
  topPaddingChanged: Signal<Function>;
  leftPaddingChanged: Signal<Function>;
  rightPaddingChanged: Signal<Function>;
  bottomPaddingChanged: Signal<Function>;
  tabStopDistanceChanged: Signal<Function>;
} & QQuickImplicitSizeItem;

export enum QQuickTextInput_EchoMode {
  Normal = 0,
  NoEcho = 1,
  Password = 2,
  PasswordEchoOnEdit = 3,
}
export enum QQuickTextInput_HAlignment {
  AlignLeft = 1,
  AlignRight = 2,
  AlignHCenter = 4,
}
export enum QQuickTextInput_VAlignment {
  AlignTop = 32,
  AlignBottom = 64,
  AlignVCenter = 128,
}
export enum QQuickTextInput_WrapMode {
  NoWrap = 0,
  WordWrap = 1,
  WrapAnywhere = 3,
  WrapAtWordBoundaryOrAnywhere = 4,
  Wrap = 4,
}
export enum QQuickTextInput_SelectionMode {
  SelectCharacters = 0,
  SelectWords = 1,
}
export enum QQuickTextInput_CursorPosition {
  CursorBetweenCharacters = 0,
  CursorOnCharacter = 1,
}
export enum QQuickTextInput_RenderType {
  QtRendering = 0,
  NativeRendering = 1,
}

export type QQuickTextInput = {
  text: string | undefined;
  readonly length: number;
  color: any;
  selectionColor: any;
  selectedTextColor: any;
  font: any;
  horizontalAlignment: QQuickTextInput_HAlignment | string;
  readonly effectiveHorizontalAlignment: QQuickTextInput_HAlignment | string;
  verticalAlignment: QQuickTextInput_VAlignment | string;
  wrapMode: QQuickTextInput_WrapMode | string;
  readOnly: boolean | undefined;
  cursorVisible: boolean | undefined;
  cursorPosition: number | undefined;
  readonly cursorRectangle: any;
  cursorDelegate: QtQml.QQmlComponent | null;
  overwriteMode: boolean | undefined;
  readonly selectionStart: number;
  readonly selectionEnd: number;
  readonly selectedText: string;
  maximumLength: number | undefined;
  validator: QValidator | null;
  inputMask: string | undefined;
  inputMethodHints: any;
  readonly acceptableInput: boolean;
  echoMode: QQuickTextInput_EchoMode | string;
  activeFocusOnPress: boolean | undefined;
  passwordCharacter: string | undefined;
  passwordMaskDelay: number | undefined;
  readonly displayText: string;
  readonly preeditText: string;
  autoScroll: boolean | undefined;
  selectByMouse: boolean | undefined;
  mouseSelectionMode: QQuickTextInput_SelectionMode | string;
  persistentSelection: boolean | undefined;
  readonly canPaste: boolean;
  readonly canUndo: boolean;
  readonly canRedo: boolean;
  readonly inputMethodComposing: boolean;
  readonly contentWidth: number;
  readonly contentHeight: number;
  renderType: QQuickTextInput_RenderType | string;
  padding: number | undefined;
  topPadding: number | undefined;
  leftPadding: number | undefined;
  rightPadding: number | undefined;
  bottomPadding: number | undefined;

  selectAll(): void;
  selectWord(): void;
  select(start: number | undefined, end: number | undefined): void;
  deselect(): void;
  isRightToLeft(
    start: number | undefined,
    end: number | undefined
  ): boolean | undefined;
  cut(): void;
  copy(): void;
  paste(): void;
  undo(): void;
  redo(): void;
  insert(position: number | undefined, text: string | undefined): void;
  remove(start: number | undefined, end: number | undefined): void;
  ensureVisible(position: number | undefined): void;
  clear(): void;
  positionAt(args: any): void;
  positionToRectangle(pos: number | undefined): any;
  moveCursorSelection(pos: number | undefined): void;
  moveCursorSelection(
    pos: number | undefined,
    mode: QQuickTextInput_SelectionMode | string
  ): void;
  inputMethodQuery(query: any, argument: any): any;
  getText(
    start: number | undefined,
    end: number | undefined
  ): string | undefined;

  accepted: Signal<Function>;
  editingFinished: Signal<Function>;
  textEdited: Signal<Function>;
  fontChanged: Signal<Function>;
  horizontalAlignmentChanged: Signal<Function>;
  verticalAlignmentChanged: Signal<Function>;
  readOnlyChanged: Signal<Function>;
  cursorVisibleChanged: Signal<Function>;
  overwriteModeChanged: Signal<Function>;
  maximumLengthChanged: Signal<Function>;
  inputMaskChanged: Signal<Function>;
  echoModeChanged: Signal<Function>;
  passwordMaskDelayChanged: Signal<Function>;
  preeditTextChanged: Signal<Function>;
  activeFocusOnPressChanged: Signal<Function>;
  autoScrollChanged: Signal<Function>;
  selectByMouseChanged: Signal<Function>;
  mouseSelectionModeChanged: Signal<Function>;
  contentSizeChanged: Signal<Function>;
  paddingChanged: Signal<Function>;
  topPaddingChanged: Signal<Function>;
  leftPaddingChanged: Signal<Function>;
  rightPaddingChanged: Signal<Function>;
  bottomPaddingChanged: Signal<Function>;
} & QQuickImplicitSizeItem;

export type QQuickTextLine = {
  readonly number: number;
  width: number | undefined;
  height: number | undefined;
  x: number | undefined;
  y: number | undefined;
} & QtQml.QObject;

export type QQuickTextMetrics = {
  font: any;
  text: string | undefined;
  readonly advanceWidth: number;
  readonly boundingRect: any;
  readonly width: number;
  readonly height: number;
  readonly tightBoundingRect: any;
  readonly elidedText: string;
  elide: any;
  elideWidth: number | undefined;

  metricsChanged: Signal<Function>;
} & QtQml.QObject;

export type QQuickTouchPoint = {
  readonly pointId: number;
  readonly uniqueId: QPointingDeviceUniqueId;
  readonly pressed: boolean;
  readonly x: number;
  readonly y: number;
  readonly ellipseDiameters: any;
  readonly pressure: number;
  readonly rotation: number;
  readonly velocity: any;
  readonly area: any;
  readonly startX: number;
  readonly startY: number;
  readonly previousX: number;
  readonly previousY: number;
  readonly sceneX: number;
  readonly sceneY: number;

  uniqueIdChanged: Signal<Function>;
  ellipseDiametersChanged: Signal<Function>;
  rotationChanged: Signal<Function>;
} & QtQml.QObject;

export type QQuickTransform = {} & QtQml.QObject;

export type QQuickTransition = {
  from: string | undefined;
  to: string | undefined;
  reversible: boolean | undefined;
  readonly running: boolean;
  readonly animations: QQuickAbstractAnimation;
  enabled: boolean | undefined;
} & QtQml.QObject;

export type QQuickTranslate = {
  x: number | undefined;
  y: number | undefined;
} & QQuickTransform;

export type QQuickUniformAnimator = {
  uniform: string | undefined;

  uniformChanged: Signal<Function>;
} & QQuickAnimator;

export type QQuickVector3dAnimation = {
  from: any;
  to: any;
} & QQuickPropertyAnimation;

export enum QQuickViewSection_SectionCriteria {
  FullString = 0,
  FirstCharacter = 1,
}
export enum QQuickViewSection_LabelPositioning {
  InlineLabels = 1,
  CurrentLabelAtStart = 2,
  NextLabelAtEnd = 4,
}

export type QQuickViewSection = {
  property: string | undefined;
  criteria: QQuickViewSection_SectionCriteria | string;
  delegate: QtQml.QQmlComponent | null;
  labelPositioning: number | undefined;

  sectionsChanged: Signal<Function>;
} & QtQml.QObject;

export type QQuickViewTransitionAttached = {
  readonly index: number;
  readonly item: QQuickItem;
  readonly destination: any;
  readonly targetIndexes: any;
  readonly targetItems: QtQml.QObject;
} & QtQml.QObject;

export type QQuickWheelEvent = {
  readonly x: number;
  readonly y: number;
  readonly angleDelta: any;
  readonly pixelDelta: any;
  readonly buttons: number;
  readonly modifiers: number;
  readonly inverted: boolean;
  accepted: boolean | undefined;
} & QtQml.QObject;

export type QQuickWorkerScript = {
  source: string | undefined;

  sendMessage(param0: any): void;

  message: Signal<Function>;
} & QtQml.QObject;

export type QQuickXAnimator = {} & QQuickAnimator;

export type QQuickYAnimator = {} & QQuickAnimator;

export type QRegExpValidator = {
  regExp: any;

  regExpChanged: Signal<Function>;
} & QValidator;

export type QValidator = {
  changed: Signal<Function>;
} & QtQml.QObject;

// end
