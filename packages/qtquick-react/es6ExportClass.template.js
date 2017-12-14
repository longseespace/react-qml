module.exports = (componentName, moduleName, version) => {
  let actualComponentName = componentName;
  let options = {}

  if (typeof componentName !== 'string') {
    actualComponentName = componentName[0];
    options = componentName[1];
  }

  const qmlContent = `
import ${moduleName} ${version}
${componentName} {
  ${options.customQml || ''}
}
`;
  const NATIVE_COMPONENT_REGISTRY_NAME = `${moduleName}.${componentName}_${
    version
  }`;

  return `
  import { registerNativeComponentClass } from 'qml-renderer';
  import { createElement, Component } from 'react';

  const qmlContent = ${JSON.stringify(qmlContent)};
  const NATIVE_COMPONENT_REGISTRY_NAME = '${NATIVE_COMPONENT_REGISTRY_NAME}'

  registerNativeComponentClass(NATIVE_COMPONENT_REGISTRY_NAME, qmlContent);

  export default class ${componentName} extends Component {
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

  `;
};
