import registry from './registry';
import React from 'react';
import { QmlQt } from './qml';

type Props = { forwardedRef: React.RefObject<any> };

type State = {
  status: any;
};

export declare const Component: any;
export declare const Qt: QmlQt;

const createQmlComponent = (
  source: string,
  name: string,
  metadata = { defaultProp: 'data' }
) => {
  const component = Qt.createComponent(source);
  registry.registerComponent(name, component, metadata);

  // return component name anyway
  // however, note that the component might not be ready yet
  return name;
};

export default createQmlComponent;
