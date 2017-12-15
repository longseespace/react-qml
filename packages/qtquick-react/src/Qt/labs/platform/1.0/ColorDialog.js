/* this file is automatically generated */
import { registerNativeComponentClass } from 'qml-react';
import { createElement, Component } from 'react';

const qmlContent = "\n\nimport Qt.labs.platform 1.0\nColorDialog {\n  \n}\n";
const NATIVE_COMPONENT_REGISTRY_NAME = 'Qt.labs.platform.ColorDialog_1.0'

registerNativeComponentClass(
  NATIVE_COMPONENT_REGISTRY_NAME,
  qmlContent,
  undefined
);

export default class ColorDialog extends Component {
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
