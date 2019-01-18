import { createRawQmlComponent } from '../../renderer';

const generateQml = (type: string) => `import QtQuick 2.10\n${type} {}`;

const COMPONENTS = ['Rectangle', 'Item', 'Text', 'Column', 'Row', 'Image'];

const QtQuick: { [key: string]: any } = {};

for (const ComponentType of COMPONENTS) {
  QtQuick[ComponentType] = createRawQmlComponent(
    generateQml(ComponentType),
    ComponentType.toLowerCase()
  );
}

export * from './Layouts';
export * from './Controls';
export * from './Window';
export default QtQuick;
