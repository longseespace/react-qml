declare namespace Qml {
  // QML global objects
  // @see https://doc.qt.io/qt-5/qtqml-javascript-qmlglobalobject.html

  export type QmlEnum = string | number;

  // Interface to Qt global object
  export interface QmlQt {
    application: {
      readonly state: number; // enum, actually but it's ok for now
      readonly layoutDirection: number; // again, enum
      readonly font: any;
      arguments: string[];
      name: string;
      displayName: string;
      version: string;
      organization: string;
      domain: string;
      readonly supportsMultipleWindows: boolean;
      screens: any;
      aboutToQuit: QmlSignal;
    } & QmlElement;
    inputMethod: any;
    platform: {
      os:
        | 'android'
        | 'ios'
        | 'tvos'
        | 'linux'
        | 'osx'
        | 'qnx'
        | 'unix'
        | 'windows'
        | 'winrt';
      pluginName: string;
    };
    isQtObject(obj: any): boolean;
    createComponent(source: string): QmlComponent;
    createQmlObject(
      qml: string,
      parent: QmlElement | null,
      filepath?: string
    ): QmlElement;
    callLater(func: Function, ...args: any): void;
  }

  // Interface to native QmlObject
  // ie: object created by Qt.createQmlObject() or component.createObject()
  export interface QmlObject {
    destroy: (delay?: number) => void;
  }

  // Interface to Qml Signal
  type SignalHandler = () => any;
  export interface QmlSignal {
    connect: (handler: SignalHandler) => void;
    disconnect: (handler: SignalHandler) => void;
  }

  // Interface to native QmlComponent
  // ie: object created by Qt.createComponent()
  export interface QmlComponent {
    createObject(parent: QmlObject, props?: object): QmlObject;
    status: any;
    statusChanged: QmlSignal;
    errorString(): string;
  }

  // Basic (key => value) object
  export type QmlProps = { [key: string]: any };

  export type QmlFontProps = {
    pointSize?: number;
    pixelSize?: number;
    family?: string;
    weight?: any;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    overline?: boolean;
    strikeout?: boolean;
    capitalization?: any;
    letterSpacing?: number;
    wordSpacing?: number;
    kerning?: boolean;
    preferShaping?: boolean;
    hintingPreference?: any;
  };

  // QQuickItem
  export type QmlQuickItem = {
    parent: QmlElement | null;
    left?: any;
    top?: any;
    right?: any;
    bottom?: any;
    horizontalCenter?: any;
    verticalCenter?: any;
    baseline?: any;
  };

  // QmlElement is basically QmlQuickItem, plus dynamic props
  export type QmlElement = QmlObject & QmlProps;

  // QmlLocalStorage
  export type QmlLocalStorageTransaction = {
    executeSql(statement: string, values?: Array<string>): any;
  };
  export type QmlLocalStorageOpenCallback = (db: QmlLocalStorage) => void;
  export type QmlLocalStorageTransactionCallback = (
    tx: QmlLocalStorageTransaction
  ) => void;

  export type QmlLocalStorage = {
    openDatabaseSync(
      identifier: string,
      version: string,
      description: string,
      estimated_size?: number,
      callback?: QmlLocalStorageOpenCallback
    ): QmlLocalStorage;

    transaction(callback: QmlLocalStorageTransactionCallback): void;
    readTransaction(callback: QmlLocalStorageTransactionCallback): void;
  };

  // end --
}
