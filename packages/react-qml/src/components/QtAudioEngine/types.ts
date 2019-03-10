// script: generateTypes, version: 0.3
// dependencies
import * as QtQml from '../QtQml/types';
import * as QtQuick from '../QtQuick/types';

type Signal<T> = {
  connect: (handler: T) => void;
  disconnect: (handler: T) => void;
};

export type QDeclarativeAttenuationModel = {
  name: string;
} & QtQml.QObject;

export type QDeclarativeAttenuationModelInverse = {
  start: number;
  end: number;
  rolloff: number;
} & QDeclarativeAttenuationModel;

export type QDeclarativeAttenuationModelLinear = {
  start: number;
  end: number;
} & QDeclarativeAttenuationModel;

export type QDeclarativeAudioCategory = {
  volume: number;
  name: string;

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
  dopplerFactor: number;
  speedOfSound: number;

  addAudioSample(param0: QDeclarativeAudioSample): void;
  addSound(param0: QDeclarativeSound): void;
  addAudioCategory(param0: QDeclarativeAudioCategory): void;
  addAttenuationModel(param0: QDeclarativeAttenuationModel): void;

  ready: Signal<Function>;
  liveInstanceCountChanged: Signal<Function>;
  isLoadingChanged: Signal<Function>;
  finishedLoading: Signal<Function>;
} & QtQml.QObject;

export type QDeclarativeAudioListener = {
  engine: QDeclarativeAudioEngine;
  position: any;
  direction: any;
  velocity: any;
  up: any;
  gain: number;
} & QtQml.QObject;

export type QDeclarativeAudioSample = {
  name: string;
  source: string;
  preloaded: boolean;
  streaming: boolean;
  readonly loaded: boolean;

  load(): void;
} & QtQml.QObject;

export type QDeclarativePlayVariation = {
  sample: string;
  looping: boolean;
  maxGain: number;
  minGain: number;
  maxPitch: number;
  minPitch: number;
} & QtQml.QObject;

export enum QDeclarativeSound_PlayType {
  Random = 0,
  Sequential = 1,
}

export type QDeclarativeSound = {
  name: string;
  playType: QDeclarativeSound_PlayType;
  category: string;
  readonly cone: QDeclarativeSoundCone;
  attenuationModel: string;
  readonly playVariationlist: QDeclarativePlayVariation;

  play(): void;
  play(gain: number): void;
  play(gain: number, pitch: number): void;
  play(position: any): void;
  play(position: any, velocity: any): void;
  play(position: any, velocity: any, direction: any): void;
  play(position: any, gain: number): void;
  play(position: any, velocity: any, gain: number): void;
  play(position: any, velocity: any, direction: any, gain: number): void;
  play(position: any, gain: number, pitch: number): void;
  play(position: any, velocity: any, gain: number, pitch: number): void;
  play(
    position: any,
    velocity: any,
    direction: any,
    gain: number,
    pitch: number
  ): void;
  newInstance(): any;
  addPlayVariation(param0: QDeclarativePlayVariation): void;
} & QtQml.QObject;

export type QDeclarativeSoundCone = {
  innerAngle: number;
  outerAngle: number;
  outerGain: number;
} & QtQml.QObject;

export enum QDeclarativeSoundInstance_State {
  StoppedState = 0,
  PlayingState = 1,
  PausedState = 2,
}

export type QDeclarativeSoundInstance = {
  engine: QDeclarativeAudioEngine;
  sound: string;
  readonly state: QDeclarativeSoundInstance_State;
  position: any;
  direction: any;
  velocity: any;
  gain: number;
  pitch: number;

  play(): void;
  stop(): void;
  pause(): void;
  updatePosition(deltaTime: number): void;
} & QtQml.QObject;

export type QQmlPropertyMap = {
  keys(): any;

  valueChanged: Signal<Function>;
} & QtQml.QObject;

// end
