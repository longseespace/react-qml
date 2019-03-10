import ReactReconciler from 'react-reconciler';
import React from 'react';

import RQHostConfig from './RQHostConfig';

import createQmlComponent from './createQmlComponent';
import createRawQmlComponent from './createRawQmlComponent';
import RQElementContainer from './RQElementContainer';

const ReactReconcilerInst = ReactReconciler(RQHostConfig);
let root: ReactReconciler.OpaqueRoot;

const noop = () => {};

export type RenderCallback = () => void | null | undefined;

const render = (
  element: React.ReactElement<any>,
  renderDom: Qml.QmlObject,
  callback?: RenderCallback
) => {
  // element: This is the react element for App component
  // renderDom: This is the host root element to which the rendered app will be attached.
  // callback: if specified will be called after render is done.

  // TODO: defaultProp must be data?
  const rootElementContainer = new RQElementContainer(renderDom, {
    defaultProp: 'data',
  });

  const isConcurrent = false; // disables concurrent rendering
  const hydrate = false; // not supported

  if (!root) {
    // Creates root fiber node.
    root = ReactReconcilerInst.createContainer(
      rootElementContainer,
      isConcurrent,
      hydrate
    );
  }

  ReactReconcilerInst.injectIntoDevTools({
    bundleType: 1, // 0 for PROD, 1 for DEV
    version: '0.1.0', // version for your renderer
    rendererPackageName: 'react-qml-renderer', // package name
  });

  ReactReconcilerInst.updateContainer(element, root, null, callback || noop); // Start reconcilation and render the result

  return ReactReconcilerInst.getPublicRootInstance(root);
};

export { render, createQmlComponent, createRawQmlComponent };

export default {
  render,
  createQmlComponent,
  createRawQmlComponent,
};
