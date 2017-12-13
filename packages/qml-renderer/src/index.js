import Reconciler from 'react-reconciler';
import * as QMLComponent from './QMLComponent';

const Registry = {};

export const registerNativeComponentClass = (name, qmlContent) => {
  if (Registry[name]) {
    // noop
    throw new Error(`Conflicted name. ${name} is already registered`);
    return;
  }

  Registry[name] = qmlContent;
};

function createElement(type, props, rootContainerElement) {
  console.log('createElement');
  console.log('  type', type);
  console.log('  props', JSON.stringify(props));

  if (Registry[type]) {
    return Qt.createQmlObject(Registry[type], rootContainerElement, type);
  }

  return null;
}

export const QMLRenderer = Reconciler({
  appendInitialChild(parentInstance, child) {
    console.log('appendInitialChild');
    if (parentInstance.data) {
      console.log('  appendInitialChild has children');
      parentInstance.data.push(child);
    } else {
      console.log('  appendInitialChild has no children');
      parentInstance.document = child;
    }
  },

  createInstance(type, props, parent) {
    console.log('createInstance');
    return createElement(type, props, parent);
  },

  createTextInstance(text, rootContainerInstance) {
    console.log('createTextInstance');
    return getOwnerDocument(rootContainerInstance).createTextNode(text);
  },

  finalizeInitialChildren(domElement, type, props, rootContainerInstance) {
    console.log('finalizeInitialChildren');
    QMLComponent.setInitialProps(domElement, props, rootContainerInstance);
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
      typeof props.children === 'string' ||
      typeof props.children === 'number' ||
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
      parentInstance.data.push(child);
    },

    appendChildToContainer(parentInstance, child) {
      console.log('appendChildToContainer');
      console.log('  parent', parentInstance);
      console.log('  child', child);
      parentInstance.data.push(child);
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
