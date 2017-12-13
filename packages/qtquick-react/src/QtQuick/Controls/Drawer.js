
import { registerNativeComponentClass } from 'qml-renderer';
import { Component } from 'react';

const qmlContent = "import QtQuick.Controls 2.3\nDrawer {}";

registerNativeComponentClass('QtQuick.Controls.Drawer', qmlContent);

export default class Drawer extends React.Component {
  setRef = qmlObject => (this.qmlObject = qmlObject);
  render() {
    var nextProps = {};

    for (var key in this.props) {
      nextProps[key] = this.props[key];
    }

    nextProps.ref = this.setRef;

    return React.createElement('QtQuick.Controls.Drawer', nextProps);
  }
}

