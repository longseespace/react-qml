
import { registerNativeComponentClass } from 'react-qml-render';
import { Component } from 'react';

const qmlContent = "import QtQuick.Controls 2.3\nMenuSeparator {}";

registerNativeComponentClass('QtQuick.Controls.MenuSeparator', qmlContent);

export default class MenuSeparator extends React.Component {
  setRef = qmlObject => (this.qmlObject = qmlObject);
  render() {
    var nextProps = {};

    for (var key in this.props) {
      nextProps[key] = this.props[key];
    }

    nextProps.ref = this.setRef;

    return React.createElement('QtQuick.Controls.MenuSeparator', nextProps);
  }
}

