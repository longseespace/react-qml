import ReactReconciler from 'react-reconciler';
import hostConfig from './hostConfig';
import { QmlObject } from './Qml';

import registry from './registry';

const ReactReconcilerInst = ReactReconciler(hostConfig);
let rootContainer: ReactReconciler.OpaqueRoot;

const render = (
  element: React.Component,
  renderDom: QmlObject,
  callback: () => void | null | undefined
) => {
  // element: This is the react element for App component
  // renderDom: This is the host root element to which the rendered app will be attached.
  // callback: if specified will be called after render is done.

  const isConcurrent = false; // disables concurrent rendering
  const hydrate = false; // not supported
  if (!rootContainer) {
    // Creates root fiber node.
    rootContainer = ReactReconcilerInst.createContainer(
      renderDom,
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

export { registry, render };

export default { registry, render };
