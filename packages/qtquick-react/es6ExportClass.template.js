module.exports = (componentName, qmlContent) => `
import { registerNativeComponentClass } from 'qml-renderer';
import { createElement, Component } from 'react';

const qmlContent = ${JSON.stringify(qmlContent)};

registerNativeComponentClass('QtQuick.Controls.${componentName}', qmlContent);

export default class ${componentName} extends Component {
  setRef = qmlObject => (this.qmlObject = qmlObject);
  render() {
    var nextProps = {};

    for (var key in this.props) {
      nextProps[key] = this.props[key];
    }

    nextProps.ref = this.setRef;

    return createElement('QtQuick.Controls.${componentName}', nextProps);
  }
}

`;
