
import { registerNativeComponentClass } from 'qml-render';
import { Component } from 'react';

const qmlContent = "import QtQuick.Controls 2.3\nTabButton {}";

registerNativeComponentClass('QtQuick.Controls.TabButton', qmlContent);

export default class TabButton extends React.Component {
  setRef = qmlObject => (this.qmlObject = qmlObject);
  render() {
    var nextProps = {};

    for (var key in this.props) {
      nextProps[key] = this.props[key];
    }

    nextProps.ref = this.setRef;

    return React.createElement('QtQuick.Controls.TabButton', nextProps);
  }
}

