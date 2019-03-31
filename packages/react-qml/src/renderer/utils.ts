import { QQmlObjectModel } from '../components/QtQuick';

declare const Qt: Qml.QmlQt;

export function getObjectType(obj: object): string {
  if (!Qt.isQtObject(obj)) {
    return '';
  }
  // debug name is in the form of QObjectType(memory_address);
  // we need to remove the memory address part
  const debugName = obj.toString();
  return debugName.replace(/\(.+\)/, '');
}

export function isAnimation(obj: any) {
  const isQtObject = Qt.isQtObject(obj);
  const objType = getObjectType(obj);
  const isAnimationType =
    objType === 'QQuickColorAnimation' ||
    objType === 'QQuickNumberAnimation' ||
    objType === 'QQuickPropertyAnimation' ||
    objType === 'QQuickVector3dAnimation' ||
    objType === 'QQuickRotationAnimation' ||
    objType === 'QQuickAnchorAnimation' ||
    objType === 'QQuickParentAnimation ' ||
    objType === 'QQuickSmoothedAnimation' ||
    objType === 'QQuickSpringAnimation';
  return isQtObject && isAnimationType;
}

export function isPlatformObject(obj: object) {
  const isQtObject = Qt.isQtObject(obj);
  const objType = getObjectType(obj);
  const isPlatformType = objType.indexOf('QQuickPlatform') === 0;
  return isQtObject && isPlatformType;
}

export function isWindow(obj: object) {
  const isQtObject = Qt.isQtObject(obj);
  const objType = getObjectType(obj);
  console.log('objType', objType);

  const isWindowType =
    objType === 'QQuickWindow' ||
    objType === 'QQuickApplicationWindow' ||
    objType === 'QQuickWindowQmlImpl';
  return isQtObject && isWindowType;
}

// TODO: revise this later
export function isQuickItem(obj: any) {
  const isQtObject = Qt.isQtObject(obj);
  const hasChildAtMethod = typeof obj.childAt === 'function';
  const hasParentProp = obj.hasOwnProperty('parent');
  const hasDataProp = obj.hasOwnProperty('data');
  return isQtObject && hasChildAtMethod && hasParentProp && hasDataProp;
}

export function findChildIndex(parentData: any, child: Qml.QmlElement) {
  if (!parentData) {
    return -1;
  }
  for (let index = 0; index < parentData.length; index++) {
    const element = parentData[index];
    if (element === child) {
      return index;
    }
  }

  return -1;
}

export function findModelChildIndex(
  model: QQmlObjectModel,
  child: Qml.QmlElement
) {
  for (let index = 0; index < model.count; index++) {
    const element = model.get(index);
    if (element === child) {
      return index;
    }
  }

  return -1;
}
