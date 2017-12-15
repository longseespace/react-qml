/* this file is automatically generated */
import { registerNativeComponentClass } from 'qml-react';
import { createElement, Component } from 'react';

const qmlContent = "\n\nimport QtQuick.Templates 2.3\nCheckBox {\n  \n}\n";
const NATIVE_COMPONENT_REGISTRY_NAME = 'QtQuick.Templates.CheckBox_2.3'

registerNativeComponentClass(
  NATIVE_COMPONENT_REGISTRY_NAME,
  qmlContent,
  undefined
);

export default class CheckBox extends Component {
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
