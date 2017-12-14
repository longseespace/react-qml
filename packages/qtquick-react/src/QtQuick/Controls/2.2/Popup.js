
  import { registerNativeComponentClass } from 'qml-renderer';
  import { createElement, Component } from 'react';

  const qmlContent = `
import QtQuick.Controls 2.2
Popup {
  property alias data: childItem.data;
  contentItem: Item {
    id: childItem;
  }
}`;

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
