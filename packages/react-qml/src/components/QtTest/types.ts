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
  press(touchId: number, item: QtQml.QObject, x: number, y: number): any;
  move(touchId: number, item: QtQml.QObject, x: number, y: number): any;
  release(touchId: number, item: QtQml.QObject, x: number, y: number): any;
  stationary(touchId: number): any;
  commit(): any;
} & QtQml.QObject;

export type QuickTestEvent = {
  readonly defaultMouseDelay: number;

  keyPress(key: number, modifiers: number, delay: number): boolean;
  keyRelease(key: number, modifiers: number, delay: number): boolean;
  keyClick(key: number, modifiers: number, delay: number): boolean;
  keyPressChar(character: string, modifiers: number, delay: number): boolean;
  keyReleaseChar(character: string, modifiers: number, delay: number): boolean;
  keyClickChar(character: string, modifiers: number, delay: number): boolean;
  keySequence(keySequence: any): boolean;
  mousePress(
    item: QtQml.QObject,
    x: number,
    y: number,
    button: number,
    modifiers: number,
    delay: number
  ): boolean;
  mouseRelease(
    item: QtQml.QObject,
    x: number,
    y: number,
    button: number,
    modifiers: number,
    delay: number
  ): boolean;
  mouseClick(
    item: QtQml.QObject,
    x: number,
    y: number,
    button: number,
    modifiers: number,
    delay: number
  ): boolean;
  mouseDoubleClick(
    item: QtQml.QObject,
    x: number,
    y: number,
    button: number,
    modifiers: number,
    delay: number
  ): boolean;
  mouseDoubleClickSequence(
    item: QtQml.QObject,
    x: number,
    y: number,
    button: number,
    modifiers: number,
    delay: number
  ): boolean;
  mouseMove(
    item: QtQml.QObject,
    x: number,
    y: number,
    delay: number,
    buttons: number
  ): boolean;
  mouseWheel(
    item: QtQml.QObject,
    x: number,
    y: number,
    buttons: number,
    modifiers: number,
    xDelta: number,
    yDelta: number,
    delay: number
  ): boolean;
  touchEvent(item: QtQml.QObject): any;
  touchEvent(): any;
} & QtQml.QObject;

export enum QuickTestResult_RunMode {
  RepeatUntilValidMeasurement = 0,
  RunOnce = 1,
}

export type QuickTestResult = {
  testCaseName: string;
  functionName: string;
  dataTag: string;
  readonly failed: boolean;
  skipped: boolean;
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
  fail(message: string, location: string, line: number): void;
  verify(
    success: boolean,
    message: string,
    location: string,
    line: number
  ): boolean;
  compare(
    success: boolean,
    message: string,
    val1: any,
    val2: any,
    location: string,
    line: number
  ): boolean;
  fuzzyCompare(actual: any, expected: any, delta: number): boolean;
  skip(message: string, location: string, line: number): void;
  expectFail(
    tag: string,
    comment: string,
    location: string,
    line: number
  ): boolean;
  expectFailContinue(
    tag: string,
    comment: string,
    location: string,
    line: number
  ): boolean;
  warn(message: string, location: string, line: number): void;
  ignoreWarning(message: string): void;
  wait(ms: number): void;
  sleep(ms: number): void;
  waitForRendering(item: QtQuick.QQuickItem, timeout: number): boolean;
  waitForRendering(item: QtQuick.QQuickItem): boolean;
  startMeasurement(): void;
  beginDataRun(): void;
  endDataRun(): void;
  measurementAccepted(): boolean;
  needsMoreMeasurements(): boolean;
  startBenchmark(runMode: QuickTestResult_RunMode, tag: string): void;
  isBenchmarkDone(): boolean;
  nextBenchmark(): void;
  stopBenchmark(): void;
  grabImage(item: QtQuick.QQuickItem): any;
  findChild(parent: QtQml.QObject, objectName: string): any;

  programNameChanged: Signal<Function>;
} & QtQml.QObject;

export type QuickTestUtil = {
  readonly printAvailableFunctions: boolean;
  readonly dragThreshold: number;

  typeName(v: any): any;
  compare(act: any, exp: any): boolean;
  callerFile(frameIndex: number): any;
  callerFile(): any;
  callerLine(frameIndex: number): number;
  callerLine(): number;
} & QtQml.QObject;

// end
