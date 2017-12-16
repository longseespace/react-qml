import Reconciler from 'react-reconciler';

import { Registry, registerNativeComponentClass } from './Registry';
import { diffProps, setInitialProps, updateProps } from './QMLComponent';
import {
  isAttribute,
  isElement,
  makeAttributeNode,
  makeElementNode,
} from './object-factory';

// FIXME: remove this
export { registerNativeComponentClass }

const setChildren = (obj, key, children) => {
  obj[key].length = 0;
  children.forEach(child => {
    console.debug(obj, 'push', key, child.value);
    obj[key].push(child.value);
  });
};


export const QMLRenderer = Reconciler({
  createInstance(type, props, rootInstance) {
    console.debug('createInstance ------------', type);

    if (type === 'attribute') {
      const { name } = props;
      return makeAttributeNode(name);
    }

    if (Registry[type]) {
      const { qmlContent, defaultProp } = Registry[type];
      return makeElementNode(type, defaultProp, qmlContent, rootInstance);
    }

    throw new Error(`unknown type ${type}`);
  },

  appendInitialChild(parent, child) {
    // creating an attribute node
    if (isAttribute(parent)) {
      parent.value = child;
      return;
    }

    // assigning an attribute node
    if (isAttribute(child)) {
      setChildren(parent.value, child.name, child.value);
    }

    // assign a child element to its parent
    // at this point we're only assign a child node to a parent node
    // notice that node.value is the actual QML Object
    parent.children.push(child);
  },

  finalizeInitialChildren(element, type, props, rootContainerInstance) {
    // attribute node doesn't need finalization
    if (isAttribute(element)) {
      return;
    }

    setInitialProps(element.value, props);

    // child-less elements don't need finalization as well
    if (!element.children || element.children.length === 0) {
      return;
    }

    console.debug('finalizeInitialChildren ---', element.name);
    console.debug('  children: ', element.children.length);
    element.children.forEach(child => {
      console.debug('  -', child.name);
    });

    setChildren(element.value, element.defaultProp, element.children);
  },

  createTextInstance(text, rootContainerInstance) {
    console.log('createTextInstance');
    // TODO
    return getOwnerDocument(rootContainerInstance).createTextNode(text);
  },


  getPublicInstance(inst) {
    // console.debug('getPublicInstance');
    if (!isElement(inst) && !isAttribute(inst)) {
      console.log(require('util').inspect(inst, { depth: 0, colors: true }));
      throw new Error('invalid instance');
    }
    return inst.value;
  },

  prepareForCommit() {
    // console.log('prepareForCommit');
    // noop
  },

  prepareUpdate(domElement, type, oldProps, newProps) {
    console.log('prepareUpdate');
    return diffProps(domElement.value, oldProps, newProps);
  },

  resetAfterCommit() {
    // console.log('resetAfterCommit');
    // noop
  },

  resetTextContent(domElement) {
    console.log('resetTextContent');
    domElement.textContent = '';
  },

  getRootHostContext(instance) {
    // console.log('getRootHostContext');
    return {};
  },

  getChildHostContext(instance) {
    // console.log('getChildHostContext');
    return {};
  },

  shouldSetTextContent(type, props) {
    // console.log('shouldSetTextContent');
    // return (
    //   type === 'textarea' ||
    //   typeof props.data === 'string' ||
    //   typeof props.data === 'number' ||
    //   (typeof props.dangerouslySetInnerHTML === 'object' &&
    //     props.dangerouslySetInnerHTML !== null &&
    //     typeof props.dangerouslySetInnerHTML.__html === 'string')
    // );
    return false;
  },

  now: () => {},

  useSyncScheduling: true,

  mutation: {
    appendChild(parent, child) {
      console.debug('appendChild');
      console.debug('  parent', parent);
      console.debug('  child', child);
      setChildren(parent.value, parent.defaultProp, child.value);
    },

    appendChildToContainer(containerQmlElement, topLevelChild) {
      console.debug('appendChildToContainer');
      containerQmlElement.data.push(topLevelChild.value);
    },

    removeChild(parent, child) {
      console.debug('removeChild');
      for (var i = parent.data.length; i > 0; i--) {
        if (child == parent.data[i]) {
          parent.data[i].destroy();
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
      updateProps(instance, preparedUpdateQueue);
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

export function render(reactElements, qmlContainer) {
  const container = QMLRenderer.createContainer(qmlContainer);
  const root = new Root(container, QMLRenderer);

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
