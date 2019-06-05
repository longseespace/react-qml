// script: generateTypes, version: 0.3
// dependencies
import * as QtQml from '../QtQml/types';
import * as QtQuick from '../QtQuick/types';

type Signal<T> = {
  connect: (handler: T) => void;
  disconnect: (handler: T) => void;
};

export type QQuickAgeAffector = {
  lifeLeft: number | undefined;
  advancePosition: boolean | undefined;

  setLifeLeft(arg: number | undefined): void;
  setAdvancePosition(arg: boolean | undefined): void;

  lifeLeftChanged: Signal<Function>;
  advancePositionChanged: Signal<Function>;
} & QQuickParticleAffector;

export type QQuickAngleDirection = {
  angle: number | undefined;
  magnitude: number | undefined;
  angleVariation: number | undefined;
  magnitudeVariation: number | undefined;

  setAngle(arg: number | undefined): void;
  setMagnitude(arg: number | undefined): void;
  setAngleVariation(arg: number | undefined): void;
  setMagnitudeVariation(arg: number | undefined): void;

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
  strength: number | undefined;
  pointX: number | undefined;
  pointY: number | undefined;
  affectedParameter: QQuickAttractorAffector_AffectableParameters | string;
  proportionalToDistance: QQuickAttractorAffector_Proportion | string;

  setStrength(arg: number | undefined): void;
  setPointX(arg: number | undefined): void;
  setPointY(arg: number | undefined): void;
  setAffectedParameter(
    arg: QQuickAttractorAffector_AffectableParameters | string
  ): void;
  setProportionalToDistance(
    arg: QQuickAttractorAffector_Proportion | string
  ): void;

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
  relative: boolean | undefined;
  position: QQuickDirection | null;
  velocity: QQuickDirection | null;
  acceleration: QQuickDirection | null;

  setPosition(arg: QQuickDirection | null): void;
  setVelocity(arg: QQuickDirection | null): void;
  setAcceleration(arg: QQuickDirection | null): void;
  setRelative(arg: boolean | undefined): void;

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
  fill: boolean | undefined;

  setFill(arg: boolean | undefined): void;

  fillChanged: Signal<Function>;
} & QQuickParticleExtruder;

export type QQuickFrictionAffector = {
  factor: number | undefined;
  threshold: number | undefined;

  setFactor(arg: number | undefined): void;
  setThreshold(arg: number | undefined): void;

  factorChanged: Signal<Function>;
  thresholdChanged: Signal<Function>;
} & QQuickParticleAffector;

export type QQuickGravityAffector = {
  magnitude: number | undefined;
  acceleration: number | undefined;
  angle: number | undefined;

  setMagnitude(arg: number | undefined): void;
  setAcceleration(arg: number | undefined): void;
  setAngle(arg: number | undefined): void;

  magnitudeChanged: Signal<Function>;
  angleChanged: Signal<Function>;
} & QQuickParticleAffector;

export type QQuickGroupGoalAffector = {
  goalState: string | undefined;
  jump: boolean | undefined;

  setGoalState(arg: string | undefined): void;
  setJump(arg: boolean | undefined): void;

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
  source: string | undefined;
  readonly sprites: QtQuick.QQuickSprite;
  readonly status: QQuickImageParticle_Status | string;
  colorTable: string | undefined;
  sizeTable: string | undefined;
  opacityTable: string | undefined;
  color: any;
  colorVariation: number | undefined;
  redVariation: number | undefined;
  greenVariation: number | undefined;
  blueVariation: number | undefined;
  alpha: number | undefined;
  alphaVariation: number | undefined;
  rotation: number | undefined;
  rotationVariation: number | undefined;
  rotationVelocity: number | undefined;
  rotationVelocityVariation: number | undefined;
  autoRotation: boolean | undefined;
  xVector: QQuickDirection | null;
  yVector: QQuickDirection | null;
  spritesInterpolate: boolean | undefined;
  entryEffect: QQuickImageParticle_EntryEffect | string;

  reloadColor(c: any, d: any): void;
  setAlphaVariation(arg: number | undefined): void;
  setAlpha(arg: number | undefined): void;
  setRedVariation(arg: number | undefined): void;
  setGreenVariation(arg: number | undefined): void;
  setBlueVariation(arg: number | undefined): void;
  setRotation(arg: number | undefined): void;
  setRotationVariation(arg: number | undefined): void;
  setRotationVelocity(arg: number | undefined): void;
  setRotationVelocityVariation(arg: number | undefined): void;
  setAutoRotation(arg: boolean | undefined): void;
  setXVector(arg: QQuickDirection | null): void;
  setYVector(arg: QQuickDirection | null): void;
  setSpritesInterpolate(arg: boolean | undefined): void;
  setBypassOptimizations(arg: boolean | undefined): void;
  setEntryEffect(arg: QQuickImageParticle_EntryEffect | string): void;

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
  fade: boolean | undefined;
  delegate: QtQml.QQmlComponent | null;

  freeze(item: QtQuick.QQuickItem | null): void;
  unfreeze(item: QtQuick.QQuickItem | null): void;
  take(item: QtQuick.QQuickItem | null, prioritize: boolean | undefined): void;
  take(item: QtQuick.QQuickItem | null): void;
  give(item: QtQuick.QQuickItem | null): void;
  setFade(arg: boolean | undefined): void;
  setDelegate(arg: QtQml.QQmlComponent | null): void;

  delegateChanged: Signal<Function>;
} & QQuickParticlePainter;

export type QQuickItemParticleAttached = {
  readonly particle: QQuickItemParticle;

  detached: Signal<Function>;
  attached: Signal<Function>;
} & QtQml.QObject;

export type QQuickLineExtruder = {
  mirrored: boolean | undefined;

  setMirrored(arg: boolean | undefined): void;

  mirroredChanged: Signal<Function>;
} & QQuickParticleExtruder;

export type QQuickMaskExtruder = {
  source: string | undefined;

  setSource(arg: string | undefined): void;

  sourceChanged: Signal<Function>;
} & QQuickParticleExtruder;

export type QQuickParticleAffector = {
  system: QQuickParticleSystem | null;
  groups: any;
  whenCollidingWith: any;
  enabled: boolean | undefined;
  once: boolean | undefined;
  shape: QQuickParticleExtruder | null;

  setSystem(arg: QQuickParticleSystem | null): void;
  setGroups(arg: any): void;
  setEnabled(arg: boolean | undefined): void;
  setOnceOff(arg: boolean | undefined): void;
  setShape(arg: QQuickParticleExtruder | null): void;
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
  system: QQuickParticleSystem | null;
  group: string | undefined;
  shape: QQuickParticleExtruder | null;
  enabled: boolean | undefined;
  startTime: number | undefined;
  emitRate: number | undefined;
  lifeSpan: number | undefined;
  lifeSpanVariation: number | undefined;
  maximumEmitted: number | undefined;
  size: number | undefined;
  endSize: number | undefined;
  sizeVariation: number | undefined;
  velocity: QQuickDirection | null;
  acceleration: QQuickDirection | null;
  velocityFromMovement: number | undefined;

  pulse(milliseconds: number | undefined): void;
  burst(num: number | undefined): void;
  burst(
    num: number | undefined,
    x: number | undefined,
    y: number | undefined
  ): void;
  setEnabled(arg: boolean | undefined): void;
  setParticlesPerSecond(arg: number | undefined): void;
  setParticleDuration(arg: number | undefined): void;
  setSystem(arg: QQuickParticleSystem | null): void;
  setGroup(arg: string | undefined): void;
  setParticleDurationVariation(arg: number | undefined): void;
  setExtruder(arg: QQuickParticleExtruder | null): void;
  setParticleSize(arg: number | undefined): void;
  setParticleEndSize(arg: number | undefined): void;
  setParticleSizeVariation(arg: number | undefined): void;
  setVelocity(arg: QQuickDirection | null): void;
  setAcceleration(arg: QQuickDirection | null): void;
  setMaxParticleCount(arg: number | undefined): void;
  setStartTime(arg: number | undefined): void;
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
  system: QQuickParticleSystem | null;
  readonly particleChildren: QtQml.QObject;

  setMaximumAlive(arg: number | undefined): void;
  setSystem(arg: QQuickParticleSystem | null): void;
  delayRedirect(obj: QtQml.QObject | null): void;

  maximumAliveChanged: Signal<Function>;
  systemChanged: Signal<Function>;
} & QtQuick.QQuickStochasticState;

export type QQuickParticlePainter = {
  system: QQuickParticleSystem | null;
  groups: any;

  setSystem(arg: QQuickParticleSystem | null): void;
  setGroups(arg: any): void;
  calcSystemOffset(resetPending: boolean | undefined): void;
  calcSystemOffset(): void;

  countChanged: Signal<Function>;
  systemChanged: Signal<Function>;
  groupsChanged: Signal<Function>;
} & QtQuick.QQuickItem;

export type QQuickParticleSystem = {
  running: boolean | undefined;
  paused: boolean | undefined;
  readonly empty: boolean;

  start(): void;
  stop(): void;
  restart(): void;
  pause(): void;
  resume(): void;
  reset(): void;
  setRunning(arg: boolean | undefined): void;
  setPaused(arg: boolean | undefined): void;
  duration(): number | undefined;

  systemInitialized: Signal<Function>;
  runningChanged: Signal<Function>;
  pausedChanged: Signal<Function>;
  emptyChanged: Signal<Function>;
} & QtQuick.QQuickItem;

export type QQuickPointDirection = {
  x: number | undefined;
  y: number | undefined;
  xVariation: number | undefined;
  yVariation: number | undefined;

  setX(arg: number | undefined): void;
  setY(arg: number | undefined): void;
  setXVariation(arg: number | undefined): void;
  setYVariation(arg: number | undefined): void;

  xChanged: Signal<Function>;
  yChanged: Signal<Function>;
  xVariationChanged: Signal<Function>;
  yVariationChanged: Signal<Function>;
} & QQuickDirection;

export type QQuickRectangleExtruder = {
  fill: boolean | undefined;

  setFill(arg: boolean | undefined): void;

  fillChanged: Signal<Function>;
} & QQuickParticleExtruder;

export type QQuickSpriteGoalAffector = {
  goalState: string | undefined;
  jump: boolean | undefined;
  systemStates: boolean | undefined;

  setGoalState(arg: string | undefined): void;
  setJump(arg: boolean | undefined): void;
  setSystemStates(arg: boolean | undefined): void;

  goalStateChanged: Signal<Function>;
  jumpChanged: Signal<Function>;
  systemStatesChanged: Signal<Function>;
} & QQuickParticleAffector;

export type QQuickTargetDirection = {
  targetX: number | undefined;
  targetY: number | undefined;
  targetItem: QtQuick.QQuickItem | null;
  targetVariation: number | undefined;
  proportionalMagnitude: boolean | undefined;
  magnitude: number | undefined;
  magnitudeVariation: number | undefined;

  setTargetX(arg: number | undefined): void;
  setTargetY(arg: number | undefined): void;
  setTargetVariation(arg: number | undefined): void;
  setMagnitude(arg: number | undefined): void;
  setProportionalMagnitude(arg: boolean | undefined): void;
  setMagnitudeVariation(arg: number | undefined): void;
  setTargetItem(arg: QtQuick.QQuickItem | null): void;

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
  follow: string | undefined;
  emitRatePerParticle: number | undefined;
  emitShape: QQuickParticleExtruder | null;
  emitHeight: number | undefined;
  emitWidth: number | undefined;

  setParticlesPerParticlePerSecond(arg: number | undefined): void;
  setEmitterXVariation(arg: number | undefined): void;
  setEmitterYVariation(arg: number | undefined): void;
  setFollow(arg: string | undefined): void;
  setEmissionShape(arg: QQuickParticleExtruder | null): void;

  emitFollowParticles: Signal<Function>;
  particlesPerParticlePerSecondChanged: Signal<Function>;
  emitterXVariationChanged: Signal<Function>;
  emitterYVariationChanged: Signal<Function>;
  followChanged: Signal<Function>;
  emissionShapeChanged: Signal<Function>;
} & QQuickParticleEmitter;

export type QQuickTurbulenceAffector = {
  strength: number | undefined;
  noiseSource: string | undefined;

  setStrength(arg: number | undefined): void;
  setNoiseSource(arg: string | undefined): void;

  strengthChanged: Signal<Function>;
  noiseSourceChanged: Signal<Function>;
} & QQuickParticleAffector;

export enum QQuickWanderAffector_AffectableParameters {
  Position = 0,
  Velocity = 1,
  Acceleration = 2,
}

export type QQuickWanderAffector = {
  pace: number | undefined;
  xVariance: number | undefined;
  yVariance: number | undefined;
  affectedParameter: QQuickWanderAffector_AffectableParameters | string;

  setXVariance(arg: number | undefined): void;
  setYVariance(arg: number | undefined): void;
  setPace(arg: number | undefined): void;
  setAffectedParameter(
    arg: QQuickWanderAffector_AffectableParameters | string
  ): void;

  xVarianceChanged: Signal<Function>;
  yVarianceChanged: Signal<Function>;
  paceChanged: Signal<Function>;
  affectedParameterChanged: Signal<Function>;
} & QQuickParticleAffector;

// end
