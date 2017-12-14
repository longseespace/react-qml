import Reconciler from 'react-reconciler';
import * as QMLComponent from './QMLComponent';
export { registerNativeComponentClass } from './Registry';
import { Registry } from './Registry';

function createElement(type, props, rootContainerElement) {
  console.log('createElement');
  console.log('  type', type);
  // console.log('  props', JSON.stringify(props));

  if (Registry[type]) {
    // return Registry[type];
    const { qmlContent, defautlProp } = Registry[type];
    console.log('  createQmlObject', type);
    const obj = Qt.createQmlObject(qmlContent, rootContainerElement, type);

    return obj;
    // return {
    //   qmlObject: obj
    // }
  }

  console.error('------ unknown type', type);

  return null;
}

const children = new WeakMap();

export const QMLRenderer = Reconciler({
  appendInitialChild(parentInstance, child) {
    console.log('appendInitialChild', parentInstance, child);

    // parentInstance._children = [child];
    const childrenArray = children.get(parentInstance) || [];
    childrenArray.push(child);
    children.set(parentInstance, childrenArray);
  },

  createInstance(type, props, rootInstance) {
    console.log('createInstance', type);
    return createElement(type, props, rootInstance);
  },

  createTextInstance(text, rootContainerInstance) {
    console.log('createTextInstance');
    return getOwnerDocument(rootContainerInstance).createTextNode(text);
  },

  finalizeInitialChildren(parent, type, props, rootContainerInstance) {
    console.log('finalizeInitialChildren', parent);

    const reactChild = children.get(parent);
    const { defaultProp } = Registry[type];
    console.log('  defaultProp', defaultProp);

    if (reactChild) {
      console.log('  children length', reactChild.length);
      // console.log('  reactChild.parent', reactChild.parent);
      if (parent[defaultProp].push) {
        console.log('  parent accepts a list');
        parent[defaultProp].length = 0;
        reactChild.forEach(child => {
          parent[defaultProp].push(child);
        });
      } else {
        console.log('  parent accepts a single child');
        parent[defaultProp] = reactChild[0];
      }
    }

    QMLComponent.setInitialProps(parent, props, rootContainerInstance);
  },

  getPublicInstance(inst) {
    console.log('getPublicInstance');
    return inst;
  },

  prepareForCommit() {
    console.log('prepareForCommit');
    // noop
  },

  prepareUpdate(domElement, type, oldProps, newProps) {
    console.log('prepareUpdate');
    return QMLComponent.diffProps(domElement, oldProps, newProps);
  },

  resetAfterCommit() {
    console.log('resetAfterCommit');
    // noop
  },

  resetTextContent(domElement) {
    console.log('resetTextContent');
    domElement.textContent = '';
  },

  getRootHostContext(instance) {
    console.log('getRootHostContext');
    return {};
  },

  getChildHostContext(instance) {
    console.log('getChildHostContext');
    return {};
  },

  shouldSetTextContent(type, props) {
    console.log('shouldSetTextContent');
    return (
      type === 'textarea' ||
      typeof props.data === 'string' ||
      typeof props.data === 'number' ||
      (typeof props.dangerouslySetInnerHTML === 'object' &&
        props.dangerouslySetInnerHTML !== null &&
        typeof props.dangerouslySetInnerHTML.__html === 'string')
    );
  },

  now: () => {},

  useSyncScheduling: true,

  mutation: {
    appendChild(parentInstance, child) {
      console.log('appendChild');
      console.log('  parent', parentInstance);
      console.log('  child', child);
      (parentInstance.contentItem || parentInstance).data.push(child);
    },

    appendChildToContainer(parentInstance, child) {
      console.log('appendChildToContainer');
      console.log('  parent', parentInstance);
      console.log('  child', child);
      (parentInstance.contentItem || parentInstance).data.push(child);
    },

    removeChild(parentInstance, child) {
      console.log('removeChild');
      for (var i = parentInstance.data.length; i > 0; i--) {
        if (child == parentInstance.data[i]) {
          parentInstance.data[i].destroy();
          break;
        }
      }
    },

    removeChildFromContainer(parentInstance, child) {
      console.log('removeChildFromContainer');
      for (var i = parentInstance.data.length; i > 0; i--) {
        if (child == parentInstance.data[i]) {
          parentInstance.data[i].destroy();
          break;
        }
      }
    },

    insertBefore(parentInstance, child, beforeChild) {
      console.log('insertBefore');
      for (var i = parentInstance.data.length; i > 0; i--) {
        parentInstance.data[i + 1] = parentInstance.data[i];
        if (beforeChild == parentInstance.data[i]) {
          parentInstance.data[i] = child;
          child.parent = parentInstance;
          break;
        }
      }
    },

    commitUpdate(instance, preparedUpdateQueue) {
      console.log('commitUpdate');
      QMLComponent.updateProps(instance, preparedUpdateQueue);
    },

    commitMount(instance, updatePayload, type, oldProps, newProps) {
      console.log('commitMount');
      // noop
    },

    resetTextContent(domElement) {
      console.log('resetTextContent');
      domElement.textContent = '';
    },

    commitTextUpdate(textInstance, oldText, newText) {
      console.log('commitTextUpdate');
      textInstance.nodeValue = newText;
    },
  },
});

let ContainerMap = new WeakMap();
export function render(reactElements, domContainer) {
  const container = QMLRenderer.createContainer(domContainer);
  const root = new Root(container, QMLRenderer);

  ContainerMap.set(domContainer, root);

  root.render(reactElements);
}

class Root {
  constructor(domRoot, renderer) {
    this.renderer = renderer;
    this.internalRoot = domRoot;
  }

  render(children) {
    this.renderer.updateContainer(children, this.internalRoot, null);
  }

  unmount() {
    this.renderer.updateContainer(null, this.internalRoot, null);
  }
}
