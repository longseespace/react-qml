export * from './Models';

import { createRawQmlComponent } from '../../renderer';

const generateQml = (type: string) => `import QtQml 2.2; ${type} {}`;

const COMPONENTS = ['Instantiator'];

const QtQml: { [key: string]: any } = {};

for (const ComponentType of COMPONENTS) {
  QtQml[ComponentType] = createRawQmlComponent(
    generateQml(ComponentType),
    `QtQml.${ComponentType}`
  );
}

export const { Instantiator } = QtQml;
export default QtQml;
