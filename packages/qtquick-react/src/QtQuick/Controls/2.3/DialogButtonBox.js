
import { registerNativeComponentClass } from 'qml-renderer';
import { createElement, Component } from 'react';

const qmlContent = "import QtQuick.Controls 2.3\nDialogButtonBox {}";

registerNativeComponentClass('QtQuick.Controls.DialogButtonBox', qmlContent);

export default class DialogButtonBox extends Component {
  setRef = qmlObject => (this.qmlObject = qmlObject);
  render() {
    var nextProps = {};

    for (var key in this.props) {
      nextProps[key] = this.props[key];
    }

    nextProps.ref = this.setRef;

    return createElement('QtQuick.Controls.DialogButtonBox', nextProps);
  }
}

