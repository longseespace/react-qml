import registry from './registry';
import React from 'react';

type Props = { forwardedRef: React.RefObject<any> };

const createRawQmlComponent = (
  rawContent: string,
  name: string,
  metadata = { defaultProp: 'data' }
) => {
  registry.registerRawComponent(name, rawContent, metadata);

  class RQRawComponent extends React.Component<Props> {
    render() {
      const { forwardedRef, ...rest } = this.props as Props;
      return React.createElement(name, {
        ref: forwardedRef,
        ...rest,
      });
    }
  }

  const RefForwardingFactory = (props: Props, ref: any) =>
    React.createElement(RQRawComponent, { ...props, forwardedRef: ref });

  return React.forwardRef(RefForwardingFactory);
};

export default createRawQmlComponent;
