
  import { registerNativeComponentClass } from 'qml-renderer';
  import { createElement, Component } from 'react';

  const qmlContent = "import QtQuick.Layouts 1.0\nColumnLayout {}";
  const NATIVE_COMPONENT_REGISTRY_NAME = 'QtQuick.Layouts.ColumnLayout_1.0'

  registerNativeComponentClass(NATIVE_COMPONENT_REGISTRY_NAME, qmlContent);

  export default class ColumnLayout extends Component {
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

  