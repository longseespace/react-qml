
  import { registerNativeComponentClass } from 'qml-renderer';
  import { createElement, Component } from 'react';

  const qmlContent = "\nimport QtQuick.Controls 2.2\nPopup {\n  propery alias data: childItem.data;\n  Item {\n    id: childItem\n  }\n}";

  const NATIVE_COMPONENT_REGISTRY_NAME = 'QtQuick.Controls.Popup_2.2'

  registerNativeComponentClass(NATIVE_COMPONENT_REGISTRY_NAME, qmlContent);

  export default class Popup extends Component {
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
