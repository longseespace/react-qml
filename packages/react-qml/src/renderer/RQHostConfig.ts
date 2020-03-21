import { HostConfig, OpaqueHandle } from 'react-reconciler';
import {
  unstable_scheduleCallback as schedulePassiveEffects,
  unstable_cancelCallback as cancelPassiveEffects,
} from 'scheduler';

import invariant from 'invariant';

import RQElementContainer from './RQElementContainer';
import UIManager from './UIManager';
import { diffProps, updateProps } from './RQAttributePayload';

type Type = string;
type HostContext = RQElementContainer;
type Instance = RQElementContainer;
type TextInstance = Instance;
type Container = RQElementContainer;
type HydratableInstance = Instance;
type PublicInstance = Qml.QmlElement;
type Props = object;
interface UpdatePayload {}
interface ChildSet {}
type TimeoutHandle = NodeJS.Timeout;
type NoTimeout = number;

type RQHostConfig = HostConfig<
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

type RQHostConfigPatched = RQHostConfig & {
  schedulePassiveEffects: typeof schedulePassiveEffects;
  cancelPassiveEffects: typeof cancelPassiveEffects;
};

const nullElement = { parent: null, destroy: () => {} };
const nullElementContainer = new RQElementContainer(nullElement, {
  defaultProp: 'data',
});

const hostConfig: RQHostConfigPatched = {
  now: Date.now,
  isPrimaryRenderer: true,
  noTimeout: -1,
  supportsPersistence: false,
  supportsHydration: false,
  shouldDeprioritizeSubtree(type: Type, props: Props): boolean {
    return false;
  },
  scheduleDeferredCallback(
    callback: () => any,
    options?: { timeout: number }
  ): any {
    console.log('scheduleDeferredCallback');
  },
  cancelDeferredCallback(callbackID: any): void {
    console.log('cancelDeferredCallback');
  },
  schedulePassiveEffects,
  cancelPassiveEffects,
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
    const rootContext = UIManager.getHostContext(rootContainerInstance);
    console.log('getRootHostContext', rootContext.element.toString());
    // UIManager.removeAllChildren(rootContext);
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
    return parentHostContext;
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
    return nullElementContainer;
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
    return UIManager.createElementContainer(
      type,
      props,
      rootContainerInstance,
      hostContext
    );
  },
  appendInitialChild(parent: Instance, child: Instance | TextInstance): void {
    console.log('appendInitialChild', parent.element, child.element);
    parent.appendChild(child);
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
    parent.appendChild(child);
  },
  appendChildToContainer(
    container: Container,
    child: Instance | TextInstance
  ): void {
    console.log('appendChildToContainer', container, child.element);
    container.appendChild(child);
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
    const updatePayload = diffProps(oldProps, newProps);
    if (updatePayload != null) {
      // update props
      updateProps(instance, updatePayload);
    }
  },
  removeChild(parent: Instance, child: Instance | TextInstance): void {
    console.log('removeChild', parent.element, child.element);
    parent.removeChild(child);
  },
  removeChildFromContainer(
    container: Container,
    child: Instance | TextInstance
  ): void {
    console.log('removeChildFromContainer', container, child.element);
    container.removeChild(child);
  },
  insertBefore(
    parentInstance: Instance,
    child: Instance | TextInstance,
    beforeChild: Instance | TextInstance
  ): void {
    UIManager.insertBefore(parentInstance, child, beforeChild);
  },
  insertInContainerBefore(
    container: Container,
    child: Instance | TextInstance,
    beforeChild: Instance | TextInstance
  ): void {
    UIManager.insertBefore(container, child, beforeChild);
  },
  // @ts-ignore
  hideInstance(instance: Instance): void {
    instance.element.visible = false;
  },
  hideTextInstance(instance: Instance): void {},
  unhideInstance(instance: Instance): void {},
  unhideTextInstance(instance: Instance): void {
    instance.element.visible = true;
  },
};

export default hostConfig;
