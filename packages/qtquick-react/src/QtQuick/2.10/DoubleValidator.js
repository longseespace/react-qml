
  import { registerNativeComponentClass } from 'qml-renderer';
  import { createElement, Component } from 'react';

  const qmlContent = "import QtQuick 2.10\nDoubleValidator {}";
  const NATIVE_COMPONENT_REGISTRY_NAME = 'QtQuick.DoubleValidator_2.10'

  registerNativeComponentClass(NATIVE_COMPONENT_REGISTRY_NAME, qmlContent);

  export default class DoubleValidator extends Component {
    setRef = qmlObject => (this.qmlObject = qmlObject);
    render() {
      var nextProps = {};

      for (var key in this.props) {
        nextProps[key] = this.props[key];
      }

      nextProps.ref = this.setRef;

      return createElement(NATIVE_COMPONENT_REGISTRY_NAME, nextProps);
    }
  }

  