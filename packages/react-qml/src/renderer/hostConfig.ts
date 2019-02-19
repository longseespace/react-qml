import { HostConfig, OpaqueHandle, Deadline } from 'react-reconciler';

import invariant from 'invariant';

import {
  diffProps,
  updateProps,
  appendChild,
  removeChild,
  removeAllChildren,
  createElementContainer,
  appendChildToContainer,
  removeChildFromContainer,
  hostElement,
  insertBefore,
  insertInContainerBefore,
} from './qml';
import { QmlElementContainer } from './QmlElementContainer';

type Type = string;
type HostContext = QmlElementContainer;
type Instance = QmlElementContainer;
type TextInstance = Instance;
type Container = Qml.QmlElement;
type HydratableInstance = Instance;
type PublicInstance = Qml.QmlElement;
type Props = Qml.QmlProps;
interface UpdatePayload {}
interface ChildSet {}
type TimeoutHandle = NodeJS.Timeout;
type NoTimeout = number;

type QmlHostConfig = HostConfig<
  Type,
  Props,
  Container,
  Instance,
  TextInstance,
  HydratableInstance,
  PublicInstance,
  HostContext,
  UpdatePayload,
  ChildSet,
  TimeoutHandle,
  NoTimeout
>;

const rootContext: HostContext = {
  element: hostElement,
  metadata: { defaultProp: 'data' },
};
const childContext: HostContext = rootContext;

const hostConfig: QmlHostConfig = {
  now: Date.now,
  isPrimaryRenderer: true,
  noTimeout: -1,
  supportsPersistence: false,
  supportsHydration: false,
  shouldDeprioritizeSubtree(type: Type, props: Props): boolean {
    return false;
  },
  scheduleDeferredCallback(
    callback: (deadline: Deadline) => void,
    options?: { timeout: number }
  ): any {},
  cancelDeferredCallback(callbackID: any): void {},
  setTimeout(
    handler: (...args: any[]) => void,
    timeout: number
  ): TimeoutHandle | NoTimeout {
    if (global && global.setTimeout) {
      return global.setTimeout(handler, timeout);
    }
    return -1;
  },
  clearTimeout(handle: TimeoutHandle | NoTimeout): void {
    if (typeof handle !== 'number' && global && global.clearTimeout) {
      global.clearTimeout(handle);
    }
  },
  // general
  getPublicInstance(instance: Instance | TextInstance): PublicInstance {
    // return qml element
    return instance.element;
  },
  getRootHostContext(rootContainerInstance: Container): HostContext {
    const rootElement = rootContext.element;
    console.log('getRootHostContext', rootContext.element);
    removeAllChildren(rootElement, rootContext.metadata.defaultProp);
    return rootContext;
  },
  getChildHostContext(
    parentHostContext: HostContext,
    type: Type,
    rootContainerInstance: Container
  ): HostContext {
    console.log(
      'getChildHostContext',
      parentHostContext.element,
      type,
      rootContainerInstance
    );
    return childContext;
  },
  shouldSetTextContent(type: Type, props: Props): boolean {
    console.log('shouldSetTextContent', type, props);
    return false;
  },
  createTextInstance(
    text: string,
    rootContainerInstance: Container,
    hostContext: HostContext,
    internalInstanceHandle: OpaqueHandle
  ): TextInstance {
    console.log(
      'createTextInstance',
      text,
      rootContainerInstance,
      hostContext.element,
      internalInstanceHandle
    );
    invariant(false, 'Creating text instance not supported');
    const nullElement = { parent: null, destroy: () => {} };
    return { element: nullElement, metadata: { defaultProp: 'data' } };
  },
  createInstance(
    type: Type,
    props: Props,
    rootContainerInstance: Container,
    hostContext: HostContext,
    internalInstanceHandle: OpaqueHandle
  ): Instance {
    console.log(
      'createInstance',
      type,
      props,
      rootContainerInstance,
      hostContext.element,
      internalInstanceHandle
    );
    return createElementContainer(
      type,
      props,
      rootContainerInstance,
      hostContext
    );
  },
  appendInitialChild(parent: Instance, child: Instance | TextInstance): void {
    console.log('appendInitialChild', parent.element, child.element);
    appendChild(parent, child);
  },
  finalizeInitialChildren(
    parentInstance: Instance,
    type: Type,
    props: Props,
    rootContainerInstance: Container,
    hostContext: HostContext
  ): boolean {
    console.log(
      'finalizeInitialChildren',
      parentInstance.element,
      type,
      props,
      rootContainerInstance,
      hostContext.element
    );
    return false;
  },
  prepareForCommit(rootContainerInstance) {
    console.log('prepareForCommit', rootContainerInstance);
  },
  resetAfterCommit(rootContainerInstance) {
    console.log('resetAfterCommit', rootContainerInstance);
  },
  // -------------------
  //     Mutation
  // -------------------
  supportsMutation: true,
  appendChild(parent: Instance, child: Instance | TextInstance) {
    console.log('appendChild', parent.element, child.element);
    appendChild(parent, child);
  },
  appendChildToContainer(
    container: Container,
    child: Instance | TextInstance
  ): void {
    console.log('appendChildToContainer', container, child.element);
    appendChildToContainer(container, child);
  },
  commitTextUpdate(
    textInstance: TextInstance,
    oldText: string,
    newText: string
  ): void {
    invariant(false, 'Text instance not supported');
  },
  resetTextContent(instance: Instance): void {
    invariant(false, 'Text instance not supported');
  },
  commitMount(instance, type, newProps, fiberNode) {
    console.log('commitMount', instance, type, newProps, fiberNode);
  },
  prepareUpdate(
    instance,
    type,
    oldProps,
    newProps,
    rootContainerInstance,
    hostContext
  ) {
    console.log('prepareUpdate');
    return {};
  },
  commitUpdate(
    instance,
    updatePayloadTODO,
    type,
    oldProps,
    newProps,
    internalInstanceHandle
  ) {
    console.log('commitUpdate');
    const updatePayload = diffProps(instance.element, oldProps, newProps);
    if (updatePayload != null) {
      // update props
      updateProps(instance.element, updatePayload);
    }
  },
  removeChild(parent: Instance, child: Instance | TextInstance): void {
    console.log('removeChild', parent.element, child.element);
    removeChild(parent, child);
  },
  removeChildFromContainer(
    container: Container,
    child: Instance | TextInstance
  ): void {
    console.log('removeChildFromContainer', container, child.element);
    removeChildFromContainer(container, child);
  },
  insertBefore(
    parentInstance: Instance,
    child: Instance | TextInstance,
    beforeChild: Instance | TextInstance
  ): void {
    insertBefore(parentInstance, child, beforeChild);
  },
  insertInContainerBefore(
    container: Container,
    child: Instance | TextInstance,
    beforeChild: Instance | TextInstance
  ): void {
    insertInContainerBefore(container, child, beforeChild);
  },
};

export default hostConfig;
