/* this file is automatically generated */
import { registerNativeComponentClass } from 'qml-react';
import { createElement, Component } from 'react';

const qmlContent = "\n\nimport QtQuick 2.8\nTouchPoint {\n  \n}\n";
const NATIVE_COMPONENT_REGISTRY_NAME = 'QtQuick.TouchPoint_2.8'

registerNativeComponentClass(
  NATIVE_COMPONENT_REGISTRY_NAME,
  qmlContent,
  undefined
);

export default class TouchPoint extends Component {
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
