import { createRawQmlComponent } from '../../renderer';
import types from './qmltypes.json';

const generateQml = (type: string) => `import Qt.labs.settings 1.0; ${type} {}`;

const Module: { [key: string]: any } = {};

for (let index = 0; index < types.length; index++) {
  const definition = types[index];
  const { name, module } = definition;
  const tagName = `${module}.${name}`;
  Module[name] = createRawQmlComponent(generateQml(name), tagName, {
    defaultProp: 'data',
  });
}

export const { Settings } = Module;

export default Module;
