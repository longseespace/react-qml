import Reconciler from 'react-reconciler';
import findIndex from 'lodash/findIndex';
import toArray from 'lodash/toArray';
import without from 'lodash/without';

import { Registry, registerNativeComponentClass } from './Registry';
import { diffProps, setInitialProps, updateProps } from './QMLComponent';
import {
  getPrevValue,
  isAttribute,
  isElement,
  makeAttributeNode,
  makeElementNode,
  release,
  setAttribute,
} from './object-factory';

// FIXME: remove this
export { registerNativeComponentClass };

export const QMLRenderer = Reconciler({
  createInstance(type, props, rootInstance) {
    console.log('createInstance ------------', type);

    if (type === 'qml') {
      const qmlContent = props.__qmlRawContent;
      const defaultProp = props.defaultProp || 'data';
      return makeElementNode(type, defaultProp, qmlContent, rootInstance);
    }

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
    console.log(`  parent: ${parent.name}#${parent.id}`);
    console.log(`  child: ${child.name}#${child.id}`);
    // creating an attribute node
    if (isAttribute(parent)) {
      parent.value = child;
      return;
    }

    // assigning an attribute node
    if (isAttribute(child)) {
      const prevValue = parent.value[child.name];


      console.log(
        '  assigning attr',
        child.name,
        require('util').inspect(child, { depth: 0, colors: true })
      );
      setAttribute(parent, child.name, child);
    }

    // assign a child element to its parent
    // at this point we're only assign a child node to a parent node
    // notice that node.value is the actual QML Object
    parent.children.push(child);
  },

  finalizeInitialChildren(element, type, props, rootContainerInstance) {
    console.log('finalizeInitialChildren ---', element.name, element.id);
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

    setAttribute(element, element.defaultProp, element.children);
  },

  createTextInstance(text, rootContainerInstance) {
    console.log('createTextInstance');
    // TODO
    return getOwnerDocument(rootContainerInstance).createTextNode(text);
  },

  getPublicInstance(inst) {
    console.log('getPublicInstance', inst.name);
    if (!isElement(inst) && !isAttribute(inst)) {
      console.log('invalid instance', require('util').inspect(inst, { depth: 0, colors: true }));
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
    // console.log('getChildHostContext');
    return {};
  },

  shouldSetTextContent(type, props) {
    // console.log('shouldSetTextContent ---', type);
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
      console.log('  parent', parent.id, parent.name);
      console.log('  child', child.id, child.name);

      const propKey = isElement(child) ? parent.defaultProp : child.name;
      setAttribute(parent, propKey, child)
    },

    appendChildToContainer(containerQmlElement, topLevelChild) {
      console.log('appendChildToContainer');
      containerQmlElement.data.push(topLevelChild.value);
    },

    removeChild(parent, child) {
      console.log('removeChild');
      console.log(`  parent: ${parent.type} ${parent.name}#${parent.id}`);
      console.log(`  child: ${child.type} ${child.name}#${child.id}`);

      const propKey = isElement(child) ? parent.defaultProp : child.name;

      console.log('  propKey', propKey);

      // assuming propKey is always an array prop
      const list = parent.value[propKey];

      if (typeof list.push === 'function') {
        const index = findIndex(list, elm => elm === child.value);
        const removingElm = list[index];
        parent.value[propKey] = without(list, removingElm);

        // TODO: move this back to pool
        release(removingElm);
      } else {
        console.log(
          '  removing attr',
          propKey,
          require('util').inspect(child, { depth: 0 })
        );
        parent.value[propKey] = null;
      }
    },

    removeChildFromContainer(containerQmlElement, child) {
      console.log(
        'removeChildFromContainer ---',
        containerQmlElement,
        child.value
      );
      for (var i = containerQmlElement.data.length; i > 0; i--) {
        if (child.value == containerQmlElement.data[i]) {
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

QMLRenderer.injectIntoDevTools({
  bundleType: 1, // 0 for PROD, 1 for DEV
  version: '0.1.0', // version for your renderer
  rendererPackageName: 'qml-renderer', // package name
  findHostInstanceByFiber: QMLRenderer.findHostInstance, // host instance (root)
})


const containerMap = new WeakMap();

export function getRoot(qmlContainer) {
  const prevRoot = containerMap.get(qmlContainer);

  if (prevRoot) {
    console.log('reuse root');
    return prevRoot
  }

  console.log('create new root');

  const container = QMLRenderer.createContainer(qmlContainer);
  const root = new Root(container, QMLRenderer);
  containerMap.set(qmlContainer, root);
  return root;
}

export function render(elements, container) {
  const root = getRoot(container);
  root.render(elements);
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
