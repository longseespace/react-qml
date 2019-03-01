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

// TODO: revise this later
export function isQuickItem(obj: any) {
  const isQtObject = Qt.isQtObject(obj);
  const hasChildAtMethod = typeof obj.childAt === 'function';
  const hasParentProp = obj.hasOwnProperty('parent');
  const hasDataProp = obj.hasOwnProperty('data');
  return isQtObject && hasChildAtMethod && hasParentProp && hasDataProp;
}

export function moveChild(parentData: any, fromIndex: number, toIndex: number) {
  if (fromIndex < 0 || fromIndex >= parentData.length) {
    throw new Error('Out of range: fromIndex');
  }
  if (toIndex < 0 || toIndex >= parentData.length) {
    throw new Error('Out of range: toIndex');
  }

  const child = parentData[fromIndex];
  if (fromIndex < toIndex) {
    let index = fromIndex;
    while (index < toIndex) {
      parentData[index] = parentData[index + 1];
      index++;
    }
    parentData[toIndex] = child;
  } else {
    let index = fromIndex;
    while (index > toIndex) {
      parentData[index] = parentData[index - 1];
      index--;
    }
    parentData[toIndex] = child;
  }
  parentData[toIndex].z = 10;
}

export function findChildIndex(parentData: any, child: Qml.QmlElement) {
  for (let index = 0; index < parentData.length; index++) {
    const element = parentData[index];
    if (element === child) {
      return index;
    }
  }

  return -1;
}
