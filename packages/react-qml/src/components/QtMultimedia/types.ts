// script: generateTypes, version: 0.3
// dependencies
import * as QtQml from '../QtQml/types';
import * as QtQuick from '../QtQuick/types';

type Signal<T> = {
  connect: (handler: T) => void;
  disconnect: (handler: T) => void;
};

export type QAbstractVideoFilter = {
  active: boolean;
} & QtQml.QObject;

export enum QCamera_Status {
  UnavailableStatus = 0,
  UnloadedStatus = 1,
  LoadingStatus = 2,
  UnloadingStatus = 3,
  LoadedStatus = 4,
  StandbyStatus = 5,
  StartingStatus = 6,
  StoppingStatus = 7,
  ActiveStatus = 8,
}
export enum QCamera_State {
  UnloadedState = 0,
  LoadedState = 1,
  ActiveState = 2,
}
export enum QCamera_CaptureMode {
  CaptureViewfinder = 0,
  CaptureStillImage = 1,
  CaptureVideo = 2,
}
export enum QCamera_Error {
  NoError = 0,
  CameraError = 1,
  InvalidRequestError = 2,
  ServiceMissingError = 3,
  NotSupportedFeatureError = 4,
}
export enum QCamera_LockStatus {
  Unlocked = 0,
  Searching = 1,
  Locked = 2,
}
export enum QCamera_LockChangeReason {
  UserRequest = 0,
  LockAcquired = 1,
  LockFailed = 2,
  LockLost = 3,
  LockTemporaryLost = 4,
}
export enum QCamera_LockType {
  NoLock = 0,
  LockExposure = 1,
  LockWhiteBalance = 2,
  LockFocus = 4,
}
export enum QCamera_Position {
  UnspecifiedPosition = 0,
  BackFace = 1,
  FrontFace = 2,
}

export type QCamera = {
  readonly state: any;
  readonly status: any;
  captureMode: any;
  readonly lockStatus: any;

  setCaptureMode(mode: any): void;
  load(): void;
  unload(): void;
  start(): void;
  stop(): void;
  searchAndLock(): void;
  unlock(): void;
  searchAndLock(locks: any): void;
  unlock(locks: any): void;

  stateChanged: Signal<Function>;
  captureModeChanged: Signal<Function>;
  statusChanged: Signal<Function>;
  locked: Signal<Function>;
  lockFailed: Signal<Function>;
  lockStatusChanged: Signal<Function>;
  error: Signal<Function>;
} & QMediaObject;

export enum QDeclarativeAudio_Status {
  UnknownStatus = 0,
  NoMedia = 1,
  Loading = 2,
  Loaded = 3,
  Stalled = 4,
  Buffering = 5,
  Buffered = 6,
  EndOfMedia = 7,
  InvalidMedia = 8,
}
export enum QDeclarativeAudio_Error {
  NoError = 0,
  ResourceError = 1,
  FormatError = 2,
  NetworkError = 3,
  AccessDenied = 4,
  ServiceMissing = 5,
}
export enum QDeclarativeAudio_Loop {
  Infinite = -1,
}
export enum QDeclarativeAudio_PlaybackState {
  PlayingState = 1,
  PausedState = 2,
  StoppedState = 0,
}
export enum QDeclarativeAudio_Availability {
  Available = 0,
  Busy = 2,
  Unavailable = 1,
  ResourceMissing = 3,
}
export enum QDeclarativeAudio_AudioRole {
  UnknownRole = 0,
  AccessibilityRole = 7,
  AlarmRole = 4,
  GameRole = 9,
  MusicRole = 1,
  NotificationRole = 5,
  RingtoneRole = 6,
  SonificationRole = 8,
  VideoRole = 2,
  VoiceCommunicationRole = 3,
}

export type QDeclarativeAudio = {
  source: string;
  playlist: QDeclarativePlaylist;
  loops: number;
  readonly playbackState: QDeclarativeAudio_PlaybackState;
  autoPlay: boolean;
  autoLoad: boolean;
  readonly status: QDeclarativeAudio_Status;
  readonly duration: number;
  readonly position: number;
  volume: number;
  muted: boolean;
  readonly hasAudio: boolean;
  readonly hasVideo: boolean;
  readonly bufferProgress: number;
  readonly seekable: boolean;
  playbackRate: number;
  readonly error: QDeclarativeAudio_Error;
  readonly errorString: string;
  readonly metaData: QDeclarativeMediaMetaData;
  readonly mediaObject: QtQml.QObject;
  readonly availability: QDeclarativeAudio_Availability;
  audioRole: QDeclarativeAudio_AudioRole;
  notifyInterval: number;

  play(): void;
  pause(): void;
  stop(): void;
  seek(position: number): void;
  supportedAudioRoles(): any;

  playlistChanged: Signal<Function>;
  loopCountChanged: Signal<Function>;
  paused: Signal<Function>;
  stopped: Signal<Function>;
  playing: Signal<Function>;
  audioRoleChanged: Signal<Function>;
  availabilityChanged: Signal<Function>;
  notifyIntervalChanged: Signal<Function>;
} & QtQml.QObject;

export enum QDeclarativeCamera_Position {
  UnspecifiedPosition = 0,
  BackFace = 1,
  FrontFace = 2,
}
export enum QDeclarativeCamera_CaptureMode {
  CaptureViewfinder = 0,
  CaptureStillImage = 1,
  CaptureVideo = 2,
}
export enum QDeclarativeCamera_State {
  ActiveState = 2,
  LoadedState = 1,
  UnloadedState = 0,
}
export enum QDeclarativeCamera_Status {
  UnavailableStatus = 0,
  UnloadedStatus = 1,
  LoadingStatus = 2,
  UnloadingStatus = 3,
  LoadedStatus = 4,
  StandbyStatus = 5,
  StartingStatus = 6,
  StoppingStatus = 7,
  ActiveStatus = 8,
}
export enum QDeclarativeCamera_LockStatus {
  Unlocked = 0,
  Searching = 1,
  Locked = 2,
}
export enum QDeclarativeCamera_Error {
  NoError = 0,
  CameraError = 1,
  InvalidRequestError = 2,
  ServiceMissingError = 3,
  NotSupportedFeatureError = 4,
}
export enum QDeclarativeCamera_FlashMode {
  FlashAuto = 1,
  FlashOff = 2,
  FlashOn = 4,
  FlashRedEyeReduction = 8,
  FlashFill = 16,
  FlashTorch = 32,
  FlashVideoLight = 64,
  FlashSlowSyncFrontCurtain = 128,
  FlashSlowSyncRearCurtain = 256,
  FlashManual = 512,
}
export enum QDeclarativeCamera_ExposureMode {
  ExposureAuto = 0,
  ExposureManual = 1,
  ExposurePortrait = 2,
  ExposureNight = 3,
  ExposureBacklight = 4,
  ExposureSpotlight = 5,
  ExposureSports = 6,
  ExposureSnow = 7,
  ExposureBeach = 8,
  ExposureLargeAperture = 9,
  ExposureSmallAperture = 10,
  ExposureAction = 11,
  ExposureLandscape = 12,
  ExposureNightPortrait = 13,
  ExposureTheatre = 14,
  ExposureSunset = 15,
  ExposureSteadyPhoto = 16,
  ExposureFireworks = 17,
  ExposureParty = 18,
  ExposureCandlelight = 19,
  ExposureBarcode = 20,
  ExposureModeVendor = 1000,
}
export enum QDeclarativeCamera_MeteringMode {
  MeteringMatrix = 1,
  MeteringAverage = 2,
  MeteringSpot = 3,
}
export enum QDeclarativeCamera_FocusMode {
  FocusManual = 1,
  FocusHyperfocal = 2,
  FocusInfinity = 4,
  FocusAuto = 8,
  FocusContinuous = 16,
  FocusMacro = 32,
}
export enum QDeclarativeCamera_FocusPointMode {
  FocusPointAuto = 0,
  FocusPointCenter = 1,
  FocusPointFaceDetection = 2,
  FocusPointCustom = 3,
}
export enum QDeclarativeCamera_FocusAreaStatus {
  FocusAreaUnused = 1,
  FocusAreaSelected = 2,
  FocusAreaFocused = 3,
}
export enum QDeclarativeCamera_Availability {
  Available = 0,
  Busy = 2,
  Unavailable = 1,
  ResourceMissing = 3,
}

export type QDeclarativeCamera = {
  deviceId: string;
  position: QDeclarativeCamera_Position;
  readonly displayName: string;
  readonly orientation: number;
  captureMode: QDeclarativeCamera_CaptureMode;
  cameraState: QDeclarativeCamera_State;
  readonly cameraStatus: QDeclarativeCamera_Status;
  readonly lockStatus: QDeclarativeCamera_LockStatus;
  readonly errorCode: QDeclarativeCamera_Error;
  readonly errorString: string;
  readonly availability: QDeclarativeCamera_Availability;
  opticalZoom: number;
  readonly maximumOpticalZoom: number;
  digitalZoom: number;
  readonly maximumDigitalZoom: number;
  readonly mediaObject: QtQml.QObject;
  readonly imageCapture: QDeclarativeCameraCapture;
  readonly videoRecorder: QDeclarativeCameraRecorder;
  readonly exposure: QDeclarativeCameraExposure;
  readonly flash: QDeclarativeCameraFlash;
  readonly focus: QDeclarativeCameraFocus;
  readonly imageProcessing: QDeclarativeCameraImageProcessing;
  readonly metaData: QDeclarativeMediaMetaData;
  readonly viewfinder: QDeclarativeCameraViewfinder;

  setCaptureMode(mode: QDeclarativeCamera_CaptureMode): void;
  start(): void;
  stop(): void;
  setCameraState(state: QDeclarativeCamera_State): void;
  searchAndLock(): void;
  unlock(): void;
  setOpticalZoom(param0: number): void;
  setDigitalZoom(param0: number): void;
  supportedViewfinderResolutions(
    minimumFrameRate: number,
    maximumFrameRate: number
  ): any;
  supportedViewfinderResolutions(minimumFrameRate: number): any;
  supportedViewfinderResolutions(): any;
  supportedViewfinderFrameRateRanges(resolution: any): any;
  supportedViewfinderFrameRateRanges(): any;

  errorChanged: Signal<Function>;
  error: Signal<Function>;
  deviceIdChanged: Signal<Function>;
  positionChanged: Signal<Function>;
  displayNameChanged: Signal<Function>;
  orientationChanged: Signal<Function>;
  cameraStateChanged: Signal<Function>;
  opticalZoomChanged: Signal<Function>;
  digitalZoomChanged: Signal<Function>;
  maximumOpticalZoomChanged: Signal<Function>;
  maximumDigitalZoomChanged: Signal<Function>;
  availabilityChanged: Signal<Function>;
} & QtQml.QObject;

export type QDeclarativeCameraCapture = {
  readonly ready: boolean;
  readonly capturedImagePath: string;
  resolution: any;
  readonly errorString: string;
  readonly supportedResolutions: any;

  capture(): number;
  captureToLocation(location: string): number;
  cancelCapture(): void;
  setResolution(resolution: any): void;
  setMetadata(key: string, value: any): void;

  readyForCaptureChanged: Signal<Function>;
  imageExposed: Signal<Function>;
  imageCaptured: Signal<Function>;
  imageMetadataAvailable: Signal<Function>;
  imageSaved: Signal<Function>;
  captureFailed: Signal<Function>;
  resolutionChanged: Signal<Function>;
} & QtQml.QObject;

export enum QDeclarativeCameraExposure_ExposureMode {
  ExposureAuto = 0,
  ExposureManual = 1,
  ExposurePortrait = 2,
  ExposureNight = 3,
  ExposureBacklight = 4,
  ExposureSpotlight = 5,
  ExposureSports = 6,
  ExposureSnow = 7,
  ExposureBeach = 8,
  ExposureLargeAperture = 9,
  ExposureSmallAperture = 10,
  ExposureAction = 11,
  ExposureLandscape = 12,
  ExposureNightPortrait = 13,
  ExposureTheatre = 14,
  ExposureSunset = 15,
  ExposureSteadyPhoto = 16,
  ExposureFireworks = 17,
  ExposureParty = 18,
  ExposureCandlelight = 19,
  ExposureBarcode = 20,
  ExposureModeVendor = 1000,
}
export enum QDeclarativeCameraExposure_MeteringMode {
  MeteringMatrix = 1,
  MeteringAverage = 2,
  MeteringSpot = 3,
}

export type QDeclarativeCameraExposure = {
  exposureCompensation: number;
  readonly iso: number;
  readonly shutterSpeed: number;
  readonly aperture: number;
  manualShutterSpeed: number;
  manualAperture: number;
  manualIso: number;
  exposureMode: QDeclarativeCameraExposure_ExposureMode;
  spotMeteringPoint: any;
  meteringMode: QDeclarativeCameraExposure_MeteringMode;

  setExposureMode(param0: QDeclarativeCameraExposure_ExposureMode): void;
  setExposureCompensation(ev: number): void;
  setManualAperture(param0: number): void;
  setManualShutterSpeed(param0: number): void;
  setManualIsoSensitivity(iso: number): void;
  setAutoAperture(): void;
  setAutoShutterSpeed(): void;
  setAutoIsoSensitivity(): void;

  isoSensitivityChanged: Signal<Function>;
  apertureChanged: Signal<Function>;
  shutterSpeedChanged: Signal<Function>;
  manualIsoSensitivityChanged: Signal<Function>;
  manualApertureChanged: Signal<Function>;
  manualShutterSpeedChanged: Signal<Function>;
  exposureCompensationChanged: Signal<Function>;
  exposureModeChanged: Signal<Function>;
  meteringModeChanged: Signal<Function>;
  spotMeteringPointChanged: Signal<Function>;
} & QtQml.QObject;

export enum QDeclarativeCameraFlash_FlashMode {
  FlashAuto = 1,
  FlashOff = 2,
  FlashOn = 4,
  FlashRedEyeReduction = 8,
  FlashFill = 16,
  FlashTorch = 32,
  FlashVideoLight = 64,
  FlashSlowSyncFrontCurtain = 128,
  FlashSlowSyncRearCurtain = 256,
  FlashManual = 512,
}

export type QDeclarativeCameraFlash = {
  readonly ready: boolean;
  mode: QDeclarativeCameraFlash_FlashMode;
  readonly supportedModes: any;

  setFlashMode(param0: QDeclarativeCameraFlash_FlashMode): void;

  flashReady: Signal<Function>;
  flashModeChanged: Signal<Function>;
} & QtQml.QObject;

export enum QDeclarativeCameraFocus_FocusMode {
  FocusManual = 1,
  FocusHyperfocal = 2,
  FocusInfinity = 4,
  FocusAuto = 8,
  FocusContinuous = 16,
  FocusMacro = 32,
}
export enum QDeclarativeCameraFocus_FocusPointMode {
  FocusPointAuto = 0,
  FocusPointCenter = 1,
  FocusPointFaceDetection = 2,
  FocusPointCustom = 3,
}

export type QDeclarativeCameraFocus = {
  focusMode: QDeclarativeCameraFocus_FocusMode;
  focusPointMode: QDeclarativeCameraFocus_FocusPointMode;
  customFocusPoint: any;
  readonly focusZones: QtQml.QObject;

  setFocusMode(param0: QDeclarativeCameraFocus_FocusMode): void;
  setFocusPointMode(mode: QDeclarativeCameraFocus_FocusPointMode): void;
  setCustomFocusPoint(point: any): void;
  isFocusModeSupported(mode: QDeclarativeCameraFocus_FocusMode): boolean;
  isFocusPointModeSupported(
    mode: QDeclarativeCameraFocus_FocusPointMode
  ): boolean;

  focusModeChanged: Signal<Function>;
  focusPointModeChanged: Signal<Function>;
  customFocusPointChanged: Signal<Function>;
} & QtQml.QObject;

export enum QDeclarativeCameraImageProcessing_WhiteBalanceMode {
  WhiteBalanceAuto = 0,
  WhiteBalanceManual = 1,
  WhiteBalanceSunlight = 2,
  WhiteBalanceCloudy = 3,
  WhiteBalanceShade = 4,
  WhiteBalanceTungsten = 5,
  WhiteBalanceFluorescent = 6,
  WhiteBalanceFlash = 7,
  WhiteBalanceSunset = 8,
  WhiteBalanceVendor = 1000,
}
export enum QDeclarativeCameraImageProcessing_ColorFilter {
  ColorFilterNone = 0,
  ColorFilterGrayscale = 1,
  ColorFilterNegative = 2,
  ColorFilterSolarize = 3,
  ColorFilterSepia = 4,
  ColorFilterPosterize = 5,
  ColorFilterWhiteboard = 6,
  ColorFilterBlackboard = 7,
  ColorFilterAqua = 8,
  ColorFilterVendor = 1000,
}

export type QDeclarativeCameraImageProcessing = {
  whiteBalanceMode: QDeclarativeCameraImageProcessing_WhiteBalanceMode;
  manualWhiteBalance: number;
  brightness: number;
  contrast: number;
  saturation: number;
  sharpeningLevel: number;
  denoisingLevel: number;
  colorFilter: QDeclarativeCameraImageProcessing_ColorFilter;

  setWhiteBalanceMode(mode: any): void;
  setManualWhiteBalance(colorTemp: number): void;
  setBrightness(value: number): void;
  setContrast(value: number): void;
  setSaturation(value: number): void;
  setSharpeningLevel(value: number): void;
  setDenoisingLevel(value: number): void;
  setColorFilter(
    colorFilter: QDeclarativeCameraImageProcessing_ColorFilter
  ): void;

  whiteBalanceModeChanged: Signal<Function>;
  manualWhiteBalanceChanged: Signal<Function>;
  brightnessChanged: Signal<Function>;
  contrastChanged: Signal<Function>;
  saturationChanged: Signal<Function>;
  sharpeningLevelChanged: Signal<Function>;
  denoisingLevelChanged: Signal<Function>;
} & QtQml.QObject;

export enum QDeclarativeCameraRecorder_RecorderState {
  StoppedState = 0,
  RecordingState = 1,
}
export enum QDeclarativeCameraRecorder_RecorderStatus {
  UnavailableStatus = 0,
  UnloadedStatus = 1,
  LoadingStatus = 2,
  LoadedStatus = 3,
  StartingStatus = 4,
  RecordingStatus = 5,
  PausedStatus = 6,
  FinalizingStatus = 7,
}
export enum QDeclarativeCameraRecorder_EncodingMode {
  ConstantQualityEncoding = 0,
  ConstantBitRateEncoding = 1,
  AverageBitRateEncoding = 2,
}
export enum QDeclarativeCameraRecorder_Error {
  NoError = 0,
  ResourceError = 1,
  FormatError = 2,
  OutOfSpaceError = 3,
}

export type QDeclarativeCameraRecorder = {
  recorderState: QDeclarativeCameraRecorder_RecorderState;
  readonly recorderStatus: QDeclarativeCameraRecorder_RecorderStatus;
  videoCodec: string;
  resolution: any;
  frameRate: number;
  videoBitRate: number;
  videoEncodingMode: QDeclarativeCameraRecorder_EncodingMode;
  audioCodec: string;
  audioBitRate: number;
  audioChannels: number;
  audioSampleRate: number;
  audioEncodingMode: QDeclarativeCameraRecorder_EncodingMode;
  mediaContainer: string;
  readonly duration: any;
  outputLocation: string;
  readonly actualLocation: string;
  muted: boolean;
  readonly errorString: string;
  readonly errorCode: QDeclarativeCameraRecorder_Error;

  setOutputLocation(location: string): void;
  record(): void;
  stop(): void;
  setRecorderState(state: any): void;
  setMuted(muted: boolean): void;
  setMetadata(key: string, value: any): void;
  setCaptureResolution(resolution: any): void;
  setAudioCodec(codec: string): void;
  setVideoCodec(codec: string): void;
  setMediaContainer(container: string): void;
  setFrameRate(frameRate: number): void;
  setVideoBitRate(rate: number): void;
  setAudioBitRate(rate: number): void;
  setAudioChannels(channels: number): void;
  setAudioSampleRate(rate: number): void;
  setVideoEncodingMode(
    encodingMode: QDeclarativeCameraRecorder_EncodingMode
  ): void;
  setAudioEncodingMode(
    encodingMode: QDeclarativeCameraRecorder_EncodingMode
  ): void;

  recorderStateChanged: Signal<Function>;
  durationChanged: Signal<Function>;
  mutedChanged: Signal<Function>;
  outputLocationChanged: Signal<Function>;
  actualLocationChanged: Signal<Function>;
  error: Signal<Function>;
  metaDataChanged: Signal<Function>;
  captureResolutionChanged: Signal<Function>;
  audioCodecChanged: Signal<Function>;
  videoCodecChanged: Signal<Function>;
  mediaContainerChanged: Signal<Function>;
  frameRateChanged: Signal<Function>;
  videoBitRateChanged: Signal<Function>;
  audioBitRateChanged: Signal<Function>;
  audioChannelsChanged: Signal<Function>;
  audioSampleRateChanged: Signal<Function>;
  audioEncodingModeChanged: Signal<Function>;
  videoEncodingModeChanged: Signal<Function>;
} & QtQml.QObject;

export type QDeclarativeCameraViewfinder = {
  resolution: any;
  minimumFrameRate: number;
  maximumFrameRate: number;
} & QtQml.QObject;

export type QDeclarativeMediaMetaData = {
  title: any;
  subTitle: any;
  author: any;
  comment: any;
  description: any;
  category: any;
  genre: any;
  year: any;
  date: any;
  userRating: any;
  keywords: any;
  language: any;
  publisher: any;
  copyright: any;
  parentalRating: any;
  ratingOrganization: any;
  size: any;
  mediaType: any;
  duration: any;
  audioBitRate: any;
  audioCodec: any;
  averageLevel: any;
  channelCount: any;
  peakValue: any;
  sampleRate: any;
  albumTitle: any;
  albumArtist: any;
  contributingArtist: any;
  composer: any;
  conductor: any;
  lyrics: any;
  mood: any;
  trackNumber: any;
  trackCount: any;
  coverArtUrlSmall: any;
  coverArtUrlLarge: any;
  resolution: any;
  pixelAspectRatio: any;
  videoFrameRate: any;
  videoBitRate: any;
  videoCodec: any;
  posterUrl: any;
  chapterNumber: any;
  director: any;
  leadPerformer: any;
  writer: any;
  cameraManufacturer: any;
  cameraModel: any;
  event: any;
  subject: any;
  orientation: any;
  exposureTime: any;
  fNumber: any;
  exposureProgram: any;
  isoSpeedRatings: any;
  exposureBiasValue: any;
  dateTimeOriginal: any;
  dateTimeDigitized: any;
  subjectDistance: any;
  meteringMode: any;
  lightSource: any;
  flash: any;
  focalLength: any;
  exposureMode: any;
  whiteBalance: any;
  digitalZoomRatio: any;
  focalLengthIn35mmFilm: any;
  sceneCaptureType: any;
  gainControl: any;
  contrast: any;
  saturation: any;
  sharpness: any;
  deviceSettingDescription: any;
  gpsLatitude: any;
  gpsLongitude: any;
  gpsAltitude: any;
  gpsTimeStamp: any;
  gpsSatellites: any;
  gpsStatus: any;
  gpsDOP: any;
  gpsSpeed: any;
  gpsTrack: any;
  gpsTrackRef: any;
  gpsImgDirection: any;
  gpsImgDirectionRef: any;
  gpsMapDatum: any;
  gpsProcessingMethod: any;
  gpsAreaInformation: any;

  metaDataChanged: Signal<Function>;
} & QtQml.QObject;

export enum QDeclarativeMultimediaGlobal_VolumeScale {
  LinearVolumeScale = 0,
  CubicVolumeScale = 1,
  LogarithmicVolumeScale = 2,
  DecibelVolumeScale = 3,
}

export type QDeclarativeMultimediaGlobal = {
  readonly defaultCamera: any;
  readonly availableCameras: any;

  convertVolume(
    volume: number,
    from: QDeclarativeMultimediaGlobal_VolumeScale,
    to: QDeclarativeMultimediaGlobal_VolumeScale
  ): number;
} & QtQml.QObject;

export enum QDeclarativePlaylist_PlaybackMode {
  CurrentItemOnce = 0,
  CurrentItemInLoop = 1,
  Sequential = 2,
  Loop = 3,
  Random = 4,
}
export enum QDeclarativePlaylist_Error {
  NoError = 0,
  FormatError = 1,
  FormatNotSupportedError = 2,
  NetworkError = 3,
  AccessDeniedError = 4,
}

export type QDeclarativePlaylist = {
  playbackMode: QDeclarativePlaylist_PlaybackMode;
  readonly currentItemSource: string;
  currentIndex: number;
  readonly itemCount: number;
  readonly readOnly: boolean;
  readonly error: QDeclarativePlaylist_Error;
  readonly errorString: string;
  readonly items: QDeclarativePlaylistItem;

  itemSource(index: number): string;
  nextIndex(steps: number): number;
  nextIndex(): number;
  previousIndex(steps: number): number;
  previousIndex(): number;
  next(): void;
  previous(): void;
  shuffle(): void;
  load(location: string, format: string): void;
  load(location: string): void;
  save(location: string, format: string): boolean;
  save(location: string): boolean;
  addItem(source: string): boolean;
  addItems(sources: any): boolean;
  insertItem(index: number, source: string): boolean;
  insertItems(index: number, sources: any): boolean;
  moveItem(from: number, to: number): boolean;
  removeItem(index: number): boolean;
  removeItems(start: number, end: number): boolean;
  clear(): boolean;

  itemAboutToBeInserted: Signal<Function>;
  itemInserted: Signal<Function>;
  itemAboutToBeRemoved: Signal<Function>;
  itemRemoved: Signal<Function>;
  itemChanged: Signal<Function>;
  loaded: Signal<Function>;
  loadFailed: Signal<Function>;
} & QtQuick.QAbstractListModel;

export type QDeclarativePlaylistItem = {
  source: string;
} & QtQml.QObject;

export enum QDeclarativeRadio_State {
  ActiveState = 0,
  StoppedState = 1,
}
export enum QDeclarativeRadio_Band {
  AM = 0,
  FM = 1,
  SW = 2,
  LW = 3,
  FM2 = 4,
}
export enum QDeclarativeRadio_Error {
  NoError = 0,
  ResourceError = 1,
  OpenError = 2,
  OutOfRangeError = 3,
}
export enum QDeclarativeRadio_StereoMode {
  ForceStereo = 0,
  ForceMono = 1,
  Auto = 2,
}
export enum QDeclarativeRadio_SearchMode {
  SearchFast = 0,
  SearchGetStationId = 1,
}
export enum QDeclarativeRadio_Availability {
  Available = 0,
  Busy = 2,
  Unavailable = 1,
  ResourceMissing = 3,
}

export type QDeclarativeRadio = {
  readonly state: QDeclarativeRadio_State;
  band: QDeclarativeRadio_Band;
  frequency: number;
  readonly stereo: boolean;
  stereoMode: QDeclarativeRadio_StereoMode;
  readonly signalStrength: number;
  volume: number;
  muted: boolean;
  readonly searching: boolean;
  readonly frequencyStep: number;
  readonly minimumFrequency: number;
  readonly maximumFrequency: number;
  readonly antennaConnected: boolean;
  readonly availability: QDeclarativeRadio_Availability;
  readonly radioData: QDeclarativeRadioData;

  setBand(band: any): void;
  setFrequency(frequency: number): void;
  setStereoMode(stereoMode: any): void;
  setVolume(volume: number): void;
  setMuted(muted: boolean): void;
  cancelScan(): void;
  scanDown(): void;
  scanUp(): void;
  tuneUp(): void;
  tuneDown(): void;
  searchAllStations(searchMode: any): void;
  searchAllStations(): void;
  start(): void;
  stop(): void;
  isAvailable(): boolean;

  stateChanged: Signal<Function>;
  bandChanged: Signal<Function>;
  frequencyChanged: Signal<Function>;
  stereoStatusChanged: Signal<Function>;
  searchingChanged: Signal<Function>;
  signalStrengthChanged: Signal<Function>;
  volumeChanged: Signal<Function>;
  mutedChanged: Signal<Function>;
  stationFound: Signal<Function>;
  antennaConnectedChanged: Signal<Function>;
  availabilityChanged: Signal<Function>;
  errorChanged: Signal<Function>;
  error: Signal<Function>;
} & QtQml.QObject;

export enum QDeclarativeRadioData_Error {
  NoError = 0,
  ResourceError = 1,
  OpenError = 2,
  OutOfRangeError = 3,
}
export enum QDeclarativeRadioData_ProgramType {
  Undefined = 0,
  News = 1,
  CurrentAffairs = 2,
  Information = 3,
  Sport = 4,
  Education = 5,
  Drama = 6,
  Culture = 7,
  Science = 8,
  Varied = 9,
  PopMusic = 10,
  RockMusic = 11,
  EasyListening = 12,
  LightClassical = 13,
  SeriousClassical = 14,
  OtherMusic = 15,
  Weather = 16,
  Finance = 17,
  ChildrensProgrammes = 18,
  SocialAffairs = 19,
  Religion = 20,
  PhoneIn = 21,
  Travel = 22,
  Leisure = 23,
  JazzMusic = 24,
  CountryMusic = 25,
  NationalMusic = 26,
  OldiesMusic = 27,
  FolkMusic = 28,
  Documentary = 29,
  AlarmTest = 30,
  Alarm = 31,
  Talk = 32,
  ClassicRock = 33,
  AdultHits = 34,
  SoftRock = 35,
  Top40 = 36,
  Soft = 37,
  Nostalgia = 38,
  Classical = 39,
  RhythmAndBlues = 40,
  SoftRhythmAndBlues = 41,
  Language = 42,
  ReligiousMusic = 43,
  ReligiousTalk = 44,
  Personality = 45,
  Public = 46,
  College = 47,
}
export enum QDeclarativeRadioData_Availability {
  Available = 0,
  Busy = 2,
  Unavailable = 1,
  ResourceMissing = 3,
}

export type QDeclarativeRadioData = {
  readonly stationId: string;
  readonly programType: any;
  readonly programTypeName: string;
  readonly stationName: string;
  readonly radioText: string;
  alternativeFrequenciesEnabled: boolean;
  readonly availability: QDeclarativeRadioData_Availability;

  setAlternativeFrequenciesEnabled(enabled: boolean): void;
  isAvailable(): boolean;

  stationIdChanged: Signal<Function>;
  programTypeChanged: Signal<Function>;
  programTypeNameChanged: Signal<Function>;
  stationNameChanged: Signal<Function>;
  radioTextChanged: Signal<Function>;
  alternativeFrequenciesEnabledChanged: Signal<Function>;
  availabilityChanged: Signal<Function>;
  errorChanged: Signal<Function>;
  error: Signal<Function>;
} & QtQml.QObject;

export type QDeclarativeTorch = {
  enabled: boolean;
  power: number;
} & QtQml.QObject;

export enum QDeclarativeVideoOutput_FillMode {
  Stretch = 0,
  PreserveAspectFit = 1,
  PreserveAspectCrop = 2,
}

export type QDeclarativeVideoOutput = {
  source: QtQml.QObject;
  fillMode: QDeclarativeVideoOutput_FillMode;
  orientation: number;
  autoOrientation: boolean;
  readonly sourceRect: any;
  readonly contentRect: any;
  readonly filters: QAbstractVideoFilter;

  mapPointToItem(point: any): any;
  mapRectToItem(rectangle: any): any;
  mapNormalizedPointToItem(point: any): any;
  mapNormalizedRectToItem(rectangle: any): any;
  mapPointToSource(point: any): any;
  mapRectToSource(rectangle: any): any;
  mapPointToSourceNormalized(point: any): any;
  mapRectToSourceNormalized(rectangle: any): any;

  fillModeChanged: Signal<Function>;
} & QtQuick.QQuickItem;

export type QMediaObject = {
  notifyInterval: number;

  notifyIntervalChanged: Signal<Function>;
  metaDataAvailableChanged: Signal<Function>;
  metaDataChanged: Signal<Function>;
  availabilityChanged: Signal<Function>;
} & QtQml.QObject;

export enum QSoundEffect_Loop {
  Infinite = -2,
}
export enum QSoundEffect_Status {
  Null = 0,
  Loading = 1,
  Ready = 2,
  Error = 3,
}

export type QSoundEffect = {
  source: string;
  loops: number;
  readonly loopsRemaining: number;
  volume: number;
  muted: boolean;
  readonly playing: boolean;
  readonly status: QSoundEffect_Status;
  category: string;

  play(): void;
  stop(): void;

  loopCountChanged: Signal<Function>;
  loadedChanged: Signal<Function>;
} & QtQml.QObject;

// end
