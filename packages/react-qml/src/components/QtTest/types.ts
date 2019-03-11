// script: generateTypes, version: 0.3
// dependencies
import * as QtQml from '../QtQml/types';
import * as QtQuick from '../QtQuick/types';
import * as QtQuickWindow from '../QtQuickWindow/types';

type Signal<T> = {
  connect: (handler: T) => void;
  disconnect: (handler: T) => void;
};

export type QQuickTouchEventSequence = {
  press(
    touchId: number | undefined,
    item: QtQml.QObject | null,
    x: number | undefined,
    y: number | undefined
  ): any;
  move(
    touchId: number | undefined,
    item: QtQml.QObject | null,
    x: number | undefined,
    y: number | undefined
  ): any;
  release(
    touchId: number | undefined,
    item: QtQml.QObject | null,
    x: number | undefined,
    y: number | undefined
  ): any;
  stationary(touchId: number | undefined): any;
  commit(): any;
} & QtQml.QObject;

export type QuickTestEvent = {
  readonly defaultMouseDelay: number;

  keyPress(
    key: number | undefined,
    modifiers: number | undefined,
    delay: number | undefined
  ): boolean | undefined;
  keyRelease(
    key: number | undefined,
    modifiers: number | undefined,
    delay: number | undefined
  ): boolean | undefined;
  keyClick(
    key: number | undefined,
    modifiers: number | undefined,
    delay: number | undefined
  ): boolean | undefined;
  keyPressChar(
    character: string | undefined,
    modifiers: number | undefined,
    delay: number | undefined
  ): boolean | undefined;
  keyReleaseChar(
    character: string | undefined,
    modifiers: number | undefined,
    delay: number | undefined
  ): boolean | undefined;
  keyClickChar(
    character: string | undefined,
    modifiers: number | undefined,
    delay: number | undefined
  ): boolean | undefined;
  keySequence(keySequence: any): boolean | undefined;
  mousePress(
    item: QtQml.QObject | null,
    x: number | undefined,
    y: number | undefined,
    button: number | undefined,
    modifiers: number | undefined,
    delay: number | undefined
  ): boolean | undefined;
  mouseRelease(
    item: QtQml.QObject | null,
    x: number | undefined,
    y: number | undefined,
    button: number | undefined,
    modifiers: number | undefined,
    delay: number | undefined
  ): boolean | undefined;
  mouseClick(
    item: QtQml.QObject | null,
    x: number | undefined,
    y: number | undefined,
    button: number | undefined,
    modifiers: number | undefined,
    delay: number | undefined
  ): boolean | undefined;
  mouseDoubleClick(
    item: QtQml.QObject | null,
    x: number | undefined,
    y: number | undefined,
    button: number | undefined,
    modifiers: number | undefined,
    delay: number | undefined
  ): boolean | undefined;
  mouseDoubleClickSequence(
    item: QtQml.QObject | null,
    x: number | undefined,
    y: number | undefined,
    button: number | undefined,
    modifiers: number | undefined,
    delay: number | undefined
  ): boolean | undefined;
  mouseMove(
    item: QtQml.QObject | null,
    x: number | undefined,
    y: number | undefined,
    delay: number | undefined,
    buttons: number | undefined
  ): boolean | undefined;
  mouseWheel(
    item: QtQml.QObject | null,
    x: number | undefined,
    y: number | undefined,
    buttons: number | undefined,
    modifiers: number | undefined,
    xDelta: number | undefined,
    yDelta: number | undefined,
    delay: number | undefined
  ): boolean | undefined;
  touchEvent(item: QtQml.QObject | null): any;
  touchEvent(): any;
} & QtQml.QObject;

export enum QuickTestResult_RunMode {
  RepeatUntilValidMeasurement = 0,
  RunOnce = 1,
}

export type QuickTestResult = {
  testCaseName: string | undefined;
  functionName: string | undefined;
  dataTag: string | undefined;
  readonly failed: boolean;
  skipped: boolean | undefined;
  readonly passCount: number;
  readonly failCount: number;
  readonly skipCount: number;
  readonly functionsToRun: any;

  reset(): void;
  startLogging(): void;
  stopLogging(): void;
  initTestTable(): void;
  clearTestTable(): void;
  finishTestData(): void;
  finishTestDataCleanup(): void;
  finishTestFunction(): void;
  stringify(args: any): void;
  fail(
    message: string | undefined,
    location: string | undefined,
    line: number | undefined
  ): void;
  verify(
    success: boolean | undefined,
    message: string | undefined,
    location: string | undefined,
    line: number | undefined
  ): boolean | undefined;
  compare(
    success: boolean | undefined,
    message: string | undefined,
    val1: any,
    val2: any,
    location: string | undefined,
    line: number | undefined
  ): boolean | undefined;
  fuzzyCompare(
    actual: any,
    expected: any,
    delta: number | undefined
  ): boolean | undefined;
  skip(
    message: string | undefined,
    location: string | undefined,
    line: number | undefined
  ): void;
  expectFail(
    tag: string | undefined,
    comment: string | undefined,
    location: string | undefined,
    line: number | undefined
  ): boolean | undefined;
  expectFailContinue(
    tag: string | undefined,
    comment: string | undefined,
    location: string | undefined,
    line: number | undefined
  ): boolean | undefined;
  warn(
    message: string | undefined,
    location: string | undefined,
    line: number | undefined
  ): void;
  ignoreWarning(message: string | undefined): void;
  wait(ms: number | undefined): void;
  sleep(ms: number | undefined): void;
  waitForRendering(
    item: QtQuick.QQuickItem | null,
    timeout: number | undefined
  ): boolean | undefined;
  waitForRendering(item: QtQuick.QQuickItem | null): boolean | undefined;
  startMeasurement(): void;
  beginDataRun(): void;
  endDataRun(): void;
  measurementAccepted(): boolean | undefined;
  needsMoreMeasurements(): boolean | undefined;
  startBenchmark(
    runMode: QuickTestResult_RunMode | string,
    tag: string | undefined
  ): void;
  isBenchmarkDone(): boolean | undefined;
  nextBenchmark(): void;
  stopBenchmark(): void;
  grabImage(item: QtQuick.QQuickItem | null): any;
  findChild(parent: QtQml.QObject | null, objectName: string | undefined): any;

  programNameChanged: Signal<Function>;
} & QtQml.QObject;

export type QuickTestUtil = {
  readonly printAvailableFunctions: boolean;
  readonly dragThreshold: number;

  typeName(v: any): any;
  compare(act: any, exp: any): boolean | undefined;
  callerFile(frameIndex: number | undefined): any;
  callerFile(): any;
  callerLine(frameIndex: number | undefined): number | undefined;
  callerLine(): number | undefined;
} & QtQml.QObject;

// end
