
import { registerNativeComponentClass } from 'react-qml-render';
import { Component } from 'react';

const qmlContent = "import QtQuick.Controls 2.3\nProgressBar {}";

registerNativeComponentClass('QtQuick.Controls.ProgressBar', qmlContent);

export default class ProgressBar extends React.Component {
  setRef = qmlObject => (this.qmlObject = qmlObject);
  render() {
    var nextProps = {};

    for (var key in this.props) {
      nextProps[key] = this.props[key];
    }

    nextProps.ref = this.setRef;

    return React.createElement('QtQuick.Controls.ProgressBar', nextProps);
  }
}

