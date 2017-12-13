
import { registerNativeComponentClass } from 'qml-renderer';
import { Component } from 'react';

const qmlContent = "import QtQuick.Controls 2.3\nRadioButton {}";

registerNativeComponentClass('QtQuick.Controls.RadioButton', qmlContent);

export default class RadioButton extends React.Component {
  setRef = qmlObject => (this.qmlObject = qmlObject);
  render() {
    var nextProps = {};

    for (var key in this.props) {
      nextProps[key] = this.props[key];
    }

    nextProps.ref = this.setRef;

    return React.createElement('QtQuick.Controls.RadioButton', nextProps);
  }
}

