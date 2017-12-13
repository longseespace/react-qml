
import { registerNativeComponentClass } from 'qml-render';
import { Component } from 'react';

const qmlContent = "import QtQuick.Controls 2.3\nMenuBarItem {}";

registerNativeComponentClass('QtQuick.Controls.MenuBarItem', qmlContent);

export default class MenuBarItem extends React.Component {
  setRef = qmlObject => (this.qmlObject = qmlObject);
  render() {
    var nextProps = {};

    for (var key in this.props) {
      nextProps[key] = this.props[key];
    }

    nextProps.ref = this.setRef;

    return React.createElement('QtQuick.Controls.MenuBarItem', nextProps);
  }
}

