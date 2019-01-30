import { RegistryComponentMetadata } from './registry';

// Interface to Qt global object
export interface QmlQt {
  isQtObject(obj: any): boolean;
  createComponent: (source: string) => QmlComponent;
  createQmlObject: (
    qml: string,
    parent: QmlElement | null,
    filepath?: string
  ) => QmlElement;
  application: any;
}

// Interface to native QmlObject
// ie: object created by Qt.createQmlObject() or component.createObject()
export interface QmlObject {
  destroy: (delay?: number) => void;
}

type SignalHandler = () => any;

// Interface to Qml Signal
export interface QmlSignal {
  connect: (handler: SignalHandler) => void;
  disconnect: (handler: SignalHandler) => void;
}

// Interface to native QmlComponent
// ie: object created by Qt.createComponent()
export interface QmlComponent {
  createObject(rootContainerInstance: QmlObject, props: object): QmlObject;
  status: any;
  statusChanged: QmlSignal;
  errorString: () => string;
}

// Basic (key => value) object
export type BasicProps = { [key: string]: any };

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
export type QmlElement = QmlObject & BasicProps;

export type QmlElementMeasureCallback = (
  x: number,
  y: number,
  width: number,
  height: number,
  pageX: number,
  pageY: number
) => void;

export interface QmlElementContainer {
  element: QmlElement;
  metadata: RegistryComponentMetadata;
  measure?: (callback: QmlElementMeasureCallback) => void;
  setNativeProps?: (arg: any) => void;
}
