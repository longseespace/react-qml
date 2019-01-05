import { HostConfig, OpaqueHandle, Deadline } from 'react-reconciler';

import invariant from 'invariant';
import registry from './registry';
import { QmlObject } from './Qml';

type Type = string;
interface HostContext {}
interface Props {}
type Instance = QmlObject;
type TextInstance = Instance;
type Container = QmlObject;
type HydratableInstance = Instance;
type PublicInstance = Instance;
interface UpdatePayload {}
interface ChildSet {}
interface TimeoutHandle {}
interface NoTimeout {}

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

const rootContext: HostContext = {};
const childContext: HostContext = {};

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
    return {};
  },
  clearTimeout(handle: TimeoutHandle | NoTimeout): void {},
  // general
  getPublicInstance(instance: Instance | TextInstance): PublicInstance {
    return instance;
  },
  getRootHostContext(rootContainerInstance: Container): HostContext {
    console.log('getRootHostContext', rootContainerInstance);
    return rootContext;
  },
  getChildHostContext(
    parentHostContext: HostContext,
    type: Type,
    rootContainerInstance: Container
  ): HostContext {
    console.log(
      'getChildHostContext',
      parentHostContext,
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
      hostContext,
      internalInstanceHandle
    );
    invariant(false, 'Creating text instance not supported');
    return { parent: null, destroy: () => {} };
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
      hostContext,
      internalInstanceHandle
    );
    const componentDefinition = registry.getComponent(type);
    if (componentDefinition) {
      console.log('Create new element');
      const { component } = componentDefinition;
      return component.createObject(rootContainerInstance, props);
    }

    throw new Error(`Unknown type ${type}`);
  },
  appendInitialChild(parent: Instance, child: Instance | TextInstance): void {
    console.log('appendInitialChild', parent, child);
    child.parent = parent;
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
      parentInstance,
      type,
      props,
      rootContainerInstance,
      hostContext
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
    console.log('appendChild', parent, child);
    child.parent = parent;
  },
  appendChildToContainer(
    container: Container,
    child: Instance | TextInstance
  ): void {
    console.log('appendChildToContainer', container, child);
    child.parent = container;
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
    // const updatePayload = diff(oldProps, newProps);
    // if (updatePayload != null) {
    //   // update props
    // }
  },
  removeChild(parent: Instance, child: Instance | TextInstance): void {
    console.log('removeChild', parent, child);
    child.parent = null;
    child.destroy();
  },
  removeChildFromContainer(
    container: Container,
    child: Instance | TextInstance
  ): void {
    console.log('removeChildFromContainer', container, child);
    child.parent = null;
    child.destroy();
  },
};

export default hostConfig;
