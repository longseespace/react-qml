
import { registerNativeComponentClass } from 'qml-renderer';
import { createElement, Component } from 'react';

const qmlContent = "import QtQuick.Controls 2.1\nApplicationWindow {}";

registerNativeComponentClass('QtQuick.Controls.ApplicationWindow', qmlContent);

export default class ApplicationWindow extends Component {
  setRef = qmlObject => (this.qmlObject = qmlObject);
  render() {
    var nextProps = {};

    for (var key in this.props) {
      nextProps[key] = this.props[key];
    }

    nextProps.ref = this.setRef;

    return createElement('QtQuick.Controls.ApplicationWindow', nextProps);
  }
}

