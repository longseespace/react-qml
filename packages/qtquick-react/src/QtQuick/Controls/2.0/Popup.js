/* this file is automatically generated */
import { registerNativeComponentClass } from 'qml-react';
import { createElement, Component } from 'react';

const qmlContent = "\nimport QtQuick.Layouts 1.0\n\nimport QtQuick.Controls 2.0\nPopup {\n  \n    property alias children: content.data;\n\n    contentItem: ColumnLayout {\n      id: content;\n    }\n    \n}\n";
const NATIVE_COMPONENT_REGISTRY_NAME = 'QtQuick.Controls.Popup_2.0'

registerNativeComponentClass(
  NATIVE_COMPONENT_REGISTRY_NAME,
  qmlContent,
  "contentData"
);

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
