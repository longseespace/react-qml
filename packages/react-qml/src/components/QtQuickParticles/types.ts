// script: generateTypes, version: 0.3
// dependencies
import * as QtQml from '../QtQml/types';
import * as QtQuick from '../QtQuick/types';

type Signal<T> = {
  connect: (handler: T) => void;
  disconnect: (handler: T) => void;
};

export type QQuickAgeAffector = {
  lifeLeft: number;
  advancePosition: boolean;

  setLifeLeft(arg: number): void;
  setAdvancePosition(arg: boolean): void;

  lifeLeftChanged: Signal<Function>;
  advancePositionChanged: Signal<Function>;
} & QQuickParticleAffector;

export type QQuickAngleDirection = {
  angle: number;
  magnitude: number;
  angleVariation: number;
  magnitudeVariation: number;

  setAngle(arg: number): void;
  setMagnitude(arg: number): void;
  setAngleVariation(arg: number): void;
  setMagnitudeVariation(arg: number): void;

  angleChanged: Signal<Function>;
  magnitudeChanged: Signal<Function>;
  angleVariationChanged: Signal<Function>;
  magnitudeVariationChanged: Signal<Function>;
} & QQuickDirection;

export enum QQuickAttractorAffector_Proportion {
  Constant = 0,
  Linear = 1,
  Quadratic = 2,
  InverseLinear = 3,
  InverseQuadratic = 4,
}
export enum QQuickAttractorAffector_AffectableParameters {
  Position = 0,
  Velocity = 1,
  Acceleration = 2,
}

export type QQuickAttractorAffector = {
  strength: number;
  pointX: number;
  pointY: number;
  affectedParameter: QQuickAttractorAffector_AffectableParameters;
  proportionalToDistance: QQuickAttractorAffector_Proportion;

  setStrength(arg: number): void;
  setPointX(arg: number): void;
  setPointY(arg: number): void;
  setAffectedParameter(arg: QQuickAttractorAffector_AffectableParameters): void;
  setProportionalToDistance(arg: QQuickAttractorAffector_Proportion): void;

  strengthChanged: Signal<Function>;
  pointXChanged: Signal<Function>;
  pointYChanged: Signal<Function>;
  affectedParameterChanged: Signal<Function>;
  proportionalToDistanceChanged: Signal<Function>;
} & QQuickParticleAffector;

export type QQuickCumulativeDirection = {
  readonly directions: QQuickDirection;
} & QQuickDirection;

export type QQuickCustomAffector = {
  relative: boolean;
  position: QQuickDirection;
  velocity: QQuickDirection;
  acceleration: QQuickDirection;

  setPosition(arg: QQuickDirection): void;
  setVelocity(arg: QQuickDirection): void;
  setAcceleration(arg: QQuickDirection): void;
  setRelative(arg: boolean): void;

  affectParticles: Signal<Function>;
  positionChanged: Signal<Function>;
  velocityChanged: Signal<Function>;
  accelerationChanged: Signal<Function>;
  relativeChanged: Signal<Function>;
} & QQuickParticleAffector;

export type QQuickCustomParticle = {
  fragmentShader: any;
  vertexShader: any;
} & QQuickParticlePainter;

export type QQuickDirection = {} & QtQml.QObject;

export type QQuickEllipseExtruder = {
  fill: boolean;

  setFill(arg: boolean): void;

  fillChanged: Signal<Function>;
} & QQuickParticleExtruder;

export type QQuickFrictionAffector = {
  factor: number;
  threshold: number;

  setFactor(arg: number): void;
  setThreshold(arg: number): void;

  factorChanged: Signal<Function>;
  thresholdChanged: Signal<Function>;
} & QQuickParticleAffector;

export type QQuickGravityAffector = {
  magnitude: number;
  acceleration: number;
  angle: number;

  setMagnitude(arg: number): void;
  setAcceleration(arg: number): void;
  setAngle(arg: number): void;

  magnitudeChanged: Signal<Function>;
  angleChanged: Signal<Function>;
} & QQuickParticleAffector;

export type QQuickGroupGoalAffector = {
  goalState: string;
  jump: boolean;

  setGoalState(arg: string): void;
  setJump(arg: boolean): void;

  goalStateChanged: Signal<Function>;
  jumpChanged: Signal<Function>;
} & QQuickParticleAffector;

export enum QQuickImageParticle_Status {
  Null = 0,
  Ready = 1,
  Loading = 2,
  Error = 3,
}
export enum QQuickImageParticle_EntryEffect {
  None = 0,
  Fade = 1,
  Scale = 2,
}

export type QQuickImageParticle = {
  source: string;
  readonly sprites: QtQuick.QQuickSprite;
  readonly status: QQuickImageParticle_Status;
  colorTable: string;
  sizeTable: string;
  opacityTable: string;
  color: any;
  colorVariation: number;
  redVariation: number;
  greenVariation: number;
  blueVariation: number;
  alpha: number;
  alphaVariation: number;
  rotation: number;
  rotationVariation: number;
  rotationVelocity: number;
  rotationVelocityVariation: number;
  autoRotation: boolean;
  xVector: QQuickDirection;
  yVector: QQuickDirection;
  spritesInterpolate: boolean;
  entryEffect: QQuickImageParticle_EntryEffect;

  reloadColor(c: any, d: any): void;
  setAlphaVariation(arg: number): void;
  setAlpha(arg: number): void;
  setRedVariation(arg: number): void;
  setGreenVariation(arg: number): void;
  setBlueVariation(arg: number): void;
  setRotation(arg: number): void;
  setRotationVariation(arg: number): void;
  setRotationVelocity(arg: number): void;
  setRotationVelocityVariation(arg: number): void;
  setAutoRotation(arg: boolean): void;
  setXVector(arg: QQuickDirection): void;
  setYVector(arg: QQuickDirection): void;
  setSpritesInterpolate(arg: boolean): void;
  setBypassOptimizations(arg: boolean): void;
  setEntryEffect(arg: QQuickImageParticle_EntryEffect): void;

  imageChanged: Signal<Function>;
  colortableChanged: Signal<Function>;
  sizetableChanged: Signal<Function>;
  opacitytableChanged: Signal<Function>;
  alphaVariationChanged: Signal<Function>;
  alphaChanged: Signal<Function>;
  redVariationChanged: Signal<Function>;
  greenVariationChanged: Signal<Function>;
  blueVariationChanged: Signal<Function>;
  rotationChanged: Signal<Function>;
  rotationVariationChanged: Signal<Function>;
  rotationVelocityChanged: Signal<Function>;
  rotationVelocityVariationChanged: Signal<Function>;
  autoRotationChanged: Signal<Function>;
  xVectorChanged: Signal<Function>;
  yVectorChanged: Signal<Function>;
  spritesInterpolateChanged: Signal<Function>;
  bypassOptimizationsChanged: Signal<Function>;
  entryEffectChanged: Signal<Function>;
  statusChanged: Signal<Function>;
} & QQuickParticlePainter;

export type QQuickItemParticle = {
  fade: boolean;
  delegate: QtQml.QQmlComponent;

  freeze(item: QtQuick.QQuickItem): void;
  unfreeze(item: QtQuick.QQuickItem): void;
  take(item: QtQuick.QQuickItem, prioritize: boolean): void;
  take(item: QtQuick.QQuickItem): void;
  give(item: QtQuick.QQuickItem): void;
  setFade(arg: boolean): void;
  setDelegate(arg: QtQml.QQmlComponent): void;

  delegateChanged: Signal<Function>;
} & QQuickParticlePainter;

export type QQuickItemParticleAttached = {
  readonly particle: QQuickItemParticle;

  detached: Signal<Function>;
  attached: Signal<Function>;
} & QtQml.QObject;

export type QQuickLineExtruder = {
  mirrored: boolean;

  setMirrored(arg: boolean): void;

  mirroredChanged: Signal<Function>;
} & QQuickParticleExtruder;

export type QQuickMaskExtruder = {
  source: string;

  setSource(arg: string): void;

  sourceChanged: Signal<Function>;
} & QQuickParticleExtruder;

export type QQuickParticleAffector = {
  system: QQuickParticleSystem;
  groups: any;
  whenCollidingWith: any;
  enabled: boolean;
  once: boolean;
  shape: QQuickParticleExtruder;

  setSystem(arg: QQuickParticleSystem): void;
  setGroups(arg: any): void;
  setEnabled(arg: boolean): void;
  setOnceOff(arg: boolean): void;
  setShape(arg: QQuickParticleExtruder): void;
  setWhenCollidingWith(arg: any): void;
  updateOffsets(): void;

  systemChanged: Signal<Function>;
  groupsChanged: Signal<Function>;
  enabledChanged: Signal<Function>;
  onceChanged: Signal<Function>;
  shapeChanged: Signal<Function>;
  affected: Signal<Function>;
  whenCollidingWithChanged: Signal<Function>;
} & QtQuick.QQuickItem;

export enum QQuickParticleEmitter_Lifetime {
  InfiniteLife = 600000,
}

export type QQuickParticleEmitter = {
  system: QQuickParticleSystem;
  group: string;
  shape: QQuickParticleExtruder;
  enabled: boolean;
  startTime: number;
  emitRate: number;
  lifeSpan: number;
  lifeSpanVariation: number;
  maximumEmitted: number;
  size: number;
  endSize: number;
  sizeVariation: number;
  velocity: QQuickDirection;
  acceleration: QQuickDirection;
  velocityFromMovement: number;

  pulse(milliseconds: number): void;
  burst(num: number): void;
  burst(num: number, x: number, y: number): void;
  setEnabled(arg: boolean): void;
  setParticlesPerSecond(arg: number): void;
  setParticleDuration(arg: number): void;
  setSystem(arg: QQuickParticleSystem): void;
  setGroup(arg: string): void;
  setParticleDurationVariation(arg: number): void;
  setExtruder(arg: QQuickParticleExtruder): void;
  setParticleSize(arg: number): void;
  setParticleEndSize(arg: number): void;
  setParticleSizeVariation(arg: number): void;
  setVelocity(arg: QQuickDirection): void;
  setAcceleration(arg: QQuickDirection): void;
  setMaxParticleCount(arg: number): void;
  setStartTime(arg: number): void;
  reset(): void;

  emitParticles: Signal<Function>;
  particlesPerSecondChanged: Signal<Function>;
  particleDurationChanged: Signal<Function>;
  enabledChanged: Signal<Function>;
  systemChanged: Signal<Function>;
  groupChanged: Signal<Function>;
  particleDurationVariationChanged: Signal<Function>;
  extruderChanged: Signal<Function>;
  particleSizeChanged: Signal<Function>;
  particleEndSizeChanged: Signal<Function>;
  particleSizeVariationChanged: Signal<Function>;
  velocityChanged: Signal<Function>;
  accelerationChanged: Signal<Function>;
  maximumEmittedChanged: Signal<Function>;
  particleCountChanged: Signal<Function>;
  startTimeChanged: Signal<Function>;
} & QtQuick.QQuickItem;

export type QQuickParticleExtruder = {} & QtQml.QObject;

export type QQuickParticleGroup = {
  system: QQuickParticleSystem;
  readonly particleChildren: QtQml.QObject;

  setMaximumAlive(arg: number): void;
  setSystem(arg: QQuickParticleSystem): void;
  delayRedirect(obj: QtQml.QObject): void;

  maximumAliveChanged: Signal<Function>;
  systemChanged: Signal<Function>;
} & QtQuick.QQuickStochasticState;

export type QQuickParticlePainter = {
  system: QQuickParticleSystem;
  groups: any;

  setSystem(arg: QQuickParticleSystem): void;
  setGroups(arg: any): void;
  calcSystemOffset(resetPending: boolean): void;
  calcSystemOffset(): void;

  countChanged: Signal<Function>;
  systemChanged: Signal<Function>;
  groupsChanged: Signal<Function>;
} & QtQuick.QQuickItem;

export type QQuickParticleSystem = {
  running: boolean;
  paused: boolean;
  readonly empty: boolean;

  start(): void;
  stop(): void;
  restart(): void;
  pause(): void;
  resume(): void;
  reset(): void;
  setRunning(arg: boolean): void;
  setPaused(arg: boolean): void;
  duration(): number;

  systemInitialized: Signal<Function>;
  runningChanged: Signal<Function>;
  pausedChanged: Signal<Function>;
  emptyChanged: Signal<Function>;
} & QtQuick.QQuickItem;

export type QQuickPointDirection = {
  x: number;
  y: number;
  xVariation: number;
  yVariation: number;

  setX(arg: number): void;
  setY(arg: number): void;
  setXVariation(arg: number): void;
  setYVariation(arg: number): void;

  xChanged: Signal<Function>;
  yChanged: Signal<Function>;
  xVariationChanged: Signal<Function>;
  yVariationChanged: Signal<Function>;
} & QQuickDirection;

export type QQuickRectangleExtruder = {
  fill: boolean;

  setFill(arg: boolean): void;

  fillChanged: Signal<Function>;
} & QQuickParticleExtruder;

export type QQuickSpriteGoalAffector = {
  goalState: string;
  jump: boolean;
  systemStates: boolean;

  setGoalState(arg: string): void;
  setJump(arg: boolean): void;
  setSystemStates(arg: boolean): void;

  goalStateChanged: Signal<Function>;
  jumpChanged: Signal<Function>;
  systemStatesChanged: Signal<Function>;
} & QQuickParticleAffector;

export type QQuickTargetDirection = {
  targetX: number;
  targetY: number;
  targetItem: QtQuick.QQuickItem;
  targetVariation: number;
  proportionalMagnitude: boolean;
  magnitude: number;
  magnitudeVariation: number;

  setTargetX(arg: number): void;
  setTargetY(arg: number): void;
  setTargetVariation(arg: number): void;
  setMagnitude(arg: number): void;
  setProportionalMagnitude(arg: boolean): void;
  setMagnitudeVariation(arg: number): void;
  setTargetItem(arg: QtQuick.QQuickItem): void;

  targetXChanged: Signal<Function>;
  targetYChanged: Signal<Function>;
  targetVariationChanged: Signal<Function>;
  magnitudeChanged: Signal<Function>;
  proprotionalMagnitudeChanged: Signal<Function>;
  magnitudeVariationChanged: Signal<Function>;
  targetItemChanged: Signal<Function>;
} & QQuickDirection;

export enum QQuickTrailEmitter_EmitSize {
  ParticleSize = -2,
}

export type QQuickTrailEmitter = {
  follow: string;
  emitRatePerParticle: number;
  emitShape: QQuickParticleExtruder;
  emitHeight: number;
  emitWidth: number;

  setParticlesPerParticlePerSecond(arg: number): void;
  setEmitterXVariation(arg: number): void;
  setEmitterYVariation(arg: number): void;
  setFollow(arg: string): void;
  setEmissionShape(arg: QQuickParticleExtruder): void;

  emitFollowParticles: Signal<Function>;
  particlesPerParticlePerSecondChanged: Signal<Function>;
  emitterXVariationChanged: Signal<Function>;
  emitterYVariationChanged: Signal<Function>;
  followChanged: Signal<Function>;
  emissionShapeChanged: Signal<Function>;
} & QQuickParticleEmitter;

export type QQuickTurbulenceAffector = {
  strength: number;
  noiseSource: string;

  setStrength(arg: number): void;
  setNoiseSource(arg: string): void;

  strengthChanged: Signal<Function>;
  noiseSourceChanged: Signal<Function>;
} & QQuickParticleAffector;

export enum QQuickWanderAffector_AffectableParameters {
  Position = 0,
  Velocity = 1,
  Acceleration = 2,
}

export type QQuickWanderAffector = {
  pace: number;
  xVariance: number;
  yVariance: number;
  affectedParameter: QQuickWanderAffector_AffectableParameters;

  setXVariance(arg: number): void;
  setYVariance(arg: number): void;
  setPace(arg: number): void;
  setAffectedParameter(arg: QQuickWanderAffector_AffectableParameters): void;

  xVarianceChanged: Signal<Function>;
  yVarianceChanged: Signal<Function>;
  paceChanged: Signal<Function>;
  affectedParameterChanged: Signal<Function>;
} & QQuickParticleAffector;

// end
