import Reconciler from 'react-reconciler';
import findIndex from 'lodash/findIndex';
import without from 'lodash/without';
import toArray from 'lodash/toArray';
import { Registry, registerNativeComponentClass } from './Registry';
import { diffProps, setInitialProps, updateProps } from './QMLComponent';
import {
  isAttribute,
  isElement,
  makeAttributeNode,
  makeElementNode,
  setChildren,
  release,
} from './object-factory';

// FIXME: remove this
export { registerNativeComponentClass };

export const QMLRenderer = Reconciler({
  createInstance(type, props, rootInstance) {
    console.log('createInstance ------------', type);

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
    console.log('appendInitialChild');
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
    console.log('finalizeInitialChildren ---', element.name);
    // attribute node doesn't need finalization
    if (isAttribute(element)) {
      return;
    }

    setInitialProps(element.value, props);

    // child-less elements don't need finalization as well
    if (!element.children || element.children.length === 0) {
      return;
    }

    console.log('  children: ', element.children.length);
    element.children.forEach(child => {
      console.log('  -', child.name);
    });

    setChildren(element.value, element.defaultProp, element.children);
  },

  createTextInstance(text, rootContainerInstance) {
    console.log('createTextInstance');
    // TODO
    return getOwnerDocument(rootContainerInstance).createTextNode(text);
  },

  getPublicInstance(inst) {
    console.log('getPublicInstance', inst.name);
    if (!isElement(inst) && !isAttribute(inst)) {
      console.log(require('util').inspect(inst, { depth: 0, colors: true }));
      throw new Error('invalid instance');
    }
    return inst.value;
  },

  prepareForCommit() {
    console.log('prepareForCommit');
    // noop
  },

  prepareUpdate(domElement, type, oldProps, newProps) {
    console.log('prepareUpdate');
    return diffProps(domElement.value, oldProps, newProps);
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
    console.log('shouldSetTextContent ---', type);
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
      console.log('appendChild');
      console.log('  parent', parent);
      console.log('  child', child);
      // setChildren(parent.value, parent.defaultProp, [child.value]);
      parent.value[parent.defaultProp].push(child.value);
    },

    appendChildToContainer(containerQmlElement, topLevelChild) {
      console.log('appendChildToContainer');
      containerQmlElement.data.push(topLevelChild.value);
    },

    removeChild(parent, child) {
      console.log('removeChild ---', parent.value, child.value);

      const propKey = isElement(child) ? parent.defaultProp : child.name;

      console.log('  propKey', propKey);

      // assuming propKey is always an array prop
      const list = parent.value[propKey];

      const index = findIndex(list, elm => elm === child.value);
      const removingElm = list[index];
      parent.value[propKey] = without(list, removingElm);

      // TODO: move this back to pool
      release(removingElm);
    },

    removeChildFromContainer(containerQmlElement, child) {
      console.log(
        'removeChildFromContainer ---',
        containerQmlElement,
        child.value
      );
      for (var i = containerQmlElement.data.length; i > 0; i--) {
        if (child == containerQmlElement.data[i]) {
          containerQmlElement.data[i].destroy();
          break;
        }
      }
    },

    insertBefore(parent, child, beforeChild) {
      console.log('insertBefore');
      const propKey = isElement(child) ? parent.defaultProp : child.name;

      console.log('  propKey', propKey);

      // assuming propKey is always an array prop
      const list = toArray(parent.value[propKey]);
      const beforeChildIndex = findIndex(
        list,
        elem => elem === beforeChild.value
      );
      list.splice(beforeChild - 1, 0, child.value);

      parent.value[propKey] = list;

      console.log('  length aftermath', list.length);
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
