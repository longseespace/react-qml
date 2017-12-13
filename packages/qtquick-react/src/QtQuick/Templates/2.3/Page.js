
  import { registerNativeComponentClass } from 'qml-renderer';
  import { createElement, Component } from 'react';

  const qmlContent = "import QtQuick.Templates 2.3\nPage {}";
  const NATIVE_COMPONENT_REGISTRY_NAME = 'QtQuick.Templates.Page_2.3'

  registerNativeComponentClass(NATIVE_COMPONENT_REGISTRY_NAME, qmlContent);

  export default class Page extends Component {
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

  