import ReactReconciler from 'react-reconciler';
import hostConfig from './hostConfig';

import registry from './registry';
import Anchor from './anchor';
import createQmlComponent from './createQmlComponent';
import createRawQmlComponent from './createRawQmlComponent';
import { QmlObject, QmlQt } from './qmlTypes';

// export types
export * from './qmlTypes';
export * from './anchor';

const ReactReconcilerInst = ReactReconciler(hostConfig);
let rootContainer: ReactReconciler.OpaqueRoot;

export declare const Qt: QmlQt;

const render = (
  element: React.Component,
  renderDom: QmlObject | null | undefined,
  callback: () => void | null | undefined
) => {
  // element: This is the react element for App component
  // renderDom: This is the host root element to which the rendered app will be attached.
  // callback: if specified will be called after render is done.

  const rootElement = renderDom || Qt.application;

  const isConcurrent = false; // disables concurrent rendering
  const hydrate = false; // not supported
  if (!rootContainer) {
    // Creates root fiber node.
    rootContainer = ReactReconcilerInst.createContainer(
      rootElement,
      isConcurrent,
      hydrate
    );
  }

  // Since there is no parent (this is the root fiber). We set parentComponent to null.
  const parentComponent = null;

  ReactReconcilerInst.injectIntoDevTools({
    bundleType: 1, // 0 for PROD, 1 for DEV
    version: '0.1.0', // version for your renderer
    rendererPackageName: 'qml-renderer', // package name
  });

  return ReactReconcilerInst.updateContainer(
    element,
    rootContainer,
    parentComponent,
    callback
  ); // Start reconcilation and render the result
};

export { registry, render, Anchor, createQmlComponent, createRawQmlComponent };

export default {
  registry,
  render,
  Anchor,
  createQmlComponent,
  createRawQmlComponent,
};
