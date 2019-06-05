// script: generateTypes, version: 0.3
// dependencies
import * as QtQml from '../QtQml/types';
import * as QtQuick from '../QtQuick/types';

type Signal<T> = {
  connect: (handler: T) => void;
  disconnect: (handler: T) => void;
};

export type QDeclarativeAttenuationModel = {
  name: string | undefined;
} & QtQml.QObject;

export type QDeclarativeAttenuationModelInverse = {
  start: number | undefined;
  end: number | undefined;
  rolloff: number | undefined;
} & QDeclarativeAttenuationModel;

export type QDeclarativeAttenuationModelLinear = {
  start: number | undefined;
  end: number | undefined;
} & QDeclarativeAttenuationModel;

export type QDeclarativeAudioCategory = {
  volume: number | undefined;
  name: string | undefined;

  stop(): void;
  pause(): void;
  resume(): void;

  volumeChanged: Signal<Function>;
  stopped: Signal<Function>;
  paused: Signal<Function>;
  resumed: Signal<Function>;
} & QtQml.QObject;

export type QDeclarativeAudioEngine = {
  readonly bank: QtQml.QObject;
  readonly categories: QtQml.QObject;
  readonly samples: QtQml.QObject;
  readonly sounds: QtQml.QObject;
  readonly loading: boolean;
  readonly liveInstances: number;
  readonly listener: QDeclarativeAudioListener;
  dopplerFactor: number | undefined;
  speedOfSound: number | undefined;

  addAudioSample(param0: QDeclarativeAudioSample | null): void;
  addSound(param0: QDeclarativeSound | null): void;
  addAudioCategory(param0: QDeclarativeAudioCategory | null): void;
  addAttenuationModel(param0: QDeclarativeAttenuationModel | null): void;

  ready: Signal<Function>;
  liveInstanceCountChanged: Signal<Function>;
  isLoadingChanged: Signal<Function>;
  finishedLoading: Signal<Function>;
} & QtQml.QObject;

export type QDeclarativeAudioListener = {
  engine: QDeclarativeAudioEngine | null;
  position: any;
  direction: any;
  velocity: any;
  up: any;
  gain: number | undefined;
} & QtQml.QObject;

export type QDeclarativeAudioSample = {
  name: string | undefined;
  source: string | undefined;
  preloaded: boolean | undefined;
  streaming: boolean | undefined;
  readonly loaded: boolean;

  load(): void;
} & QtQml.QObject;

export type QDeclarativePlayVariation = {
  sample: string | undefined;
  looping: boolean | undefined;
  maxGain: number | undefined;
  minGain: number | undefined;
  maxPitch: number | undefined;
  minPitch: number | undefined;
} & QtQml.QObject;

export enum QDeclarativeSound_PlayType {
  Random = 0,
  Sequential = 1,
}

export type QDeclarativeSound = {
  name: string | undefined;
  playType: QDeclarativeSound_PlayType | string;
  category: string | undefined;
  readonly cone: QDeclarativeSoundCone;
  attenuationModel: string | undefined;
  readonly playVariationlist: QDeclarativePlayVariation;

  play(): void;
  play(gain: number | undefined): void;
  play(gain: number | undefined, pitch: number | undefined): void;
  play(position: any): void;
  play(position: any, velocity: any): void;
  play(position: any, velocity: any, direction: any): void;
  play(position: any, gain: number | undefined): void;
  play(position: any, velocity: any, gain: number | undefined): void;
  play(
    position: any,
    velocity: any,
    direction: any,
    gain: number | undefined
  ): void;
  play(
    position: any,
    gain: number | undefined,
    pitch: number | undefined
  ): void;
  play(
    position: any,
    velocity: any,
    gain: number | undefined,
    pitch: number | undefined
  ): void;
  play(
    position: any,
    velocity: any,
    direction: any,
    gain: number | undefined,
    pitch: number | undefined
  ): void;
  newInstance(): any;
  addPlayVariation(param0: QDeclarativePlayVariation | null): void;
} & QtQml.QObject;

export type QDeclarativeSoundCone = {
  innerAngle: number | undefined;
  outerAngle: number | undefined;
  outerGain: number | undefined;
} & QtQml.QObject;

export enum QDeclarativeSoundInstance_State {
  StoppedState = 0,
  PlayingState = 1,
  PausedState = 2,
}

export type QDeclarativeSoundInstance = {
  engine: QDeclarativeAudioEngine | null;
  sound: string | undefined;
  readonly state: QDeclarativeSoundInstance_State | string;
  position: any;
  direction: any;
  velocity: any;
  gain: number | undefined;
  pitch: number | undefined;

  play(): void;
  stop(): void;
  pause(): void;
  updatePosition(deltaTime: number | undefined): void;
} & QtQml.QObject;

export type QQmlPropertyMap = {
  keys(): any;

  valueChanged: Signal<Function>;
} & QtQml.QObject;

// end
