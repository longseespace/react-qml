import { registerQtComponentClass } from 'react-qml-renderer';
import React from 'react';

const createQMLComponent = (source, name, defaultProp = 'data') => {
  const component = Qt.createComponent(source);
  registerQtComponentClass(name, component, defaultProp);

  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        status: component.status,
      };

      this.setRef = qmlObject => (this.qmlObject = qmlObject);
      this.updateStatus = () => {
        this.setState({
          status: component.status,
        });
      };
    }

    componentDidMount() {
      component.statusChanged.connect(this.updateStatus);
    }

    render() {
      const { status } = this.state;
      if (status === 1) {
        return React.createElement(name, {
          ...this.props,
          ref: this.setRef,
        });
      }
      return null;
    }
  };
};

export default createQMLComponent;
