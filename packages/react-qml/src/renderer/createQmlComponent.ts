import React from 'react';
import AppRegistry from '../common/AppRegistry';

type Props = { forwardedRef: React.RefObject<any> };

type State = {
  status: any;
};

export declare const Component: any;
export declare const Qt: Qml.QmlQt;

const createQmlComponent = (
  source: string,
  name: string,
  metadata = { defaultProp: 'data' }
) => {
  const component = Qt.createComponent(source);
  AppRegistry.registerComponent(name, component, metadata);

  class RQComponent extends React.Component<Props, State> {
    state = { status: component.status };

    updateStatus = () => {
      this.setState({ status: component.status });
    };

    componentDidMount() {
      component.statusChanged.connect(this.updateStatus);
    }

    componentWillUnmount() {
      component.statusChanged.disconnect(this.updateStatus);
    }

    render() {
      const { status } = this.state;
      if (status === Component.Ready) {
        const { forwardedRef, ...rest } = this.props as Props;
        return React.createElement(name, {
          ref: forwardedRef,
          ...rest,
        });
      }
      if (status === Component.Error) {
        throw new Error(component.errorString());
      }
      return null;
    }
  }

  const RefForwardingFactory = (props: Props, ref: any) =>
    React.createElement(RQComponent, { ...props, forwardedRef: ref });

  return React.forwardRef(RefForwardingFactory);
};

export default createQmlComponent;
