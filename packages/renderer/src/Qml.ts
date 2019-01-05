export interface QmlObject {
  parent: QmlObject | null;
  destroy: () => void;
}

export interface QmlComponent {
  createObject(rootContainerInstance: QmlObject, props: object): QmlObject;
}
