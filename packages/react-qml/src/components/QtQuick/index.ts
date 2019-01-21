import { createRawQmlComponent } from '../../renderer';

const generateQml = (type: string) => `import QtQuick 2.10; ${type} {}`;

const COMPONENTS = [
  'Rectangle',
  'Item',
  'Text',
  'Column',
  'Row',
  'Image',
  'Flickable',
];

const QtQuick: { [key: string]: any } = {};

for (const ComponentType of COMPONENTS) {
  QtQuick[ComponentType] = createRawQmlComponent(
    generateQml(ComponentType),
    `QtQuick.${ComponentType}`
  );
}

export * from './Layouts';
export * from './Window';
export * from './Controls';

export const { Rectangle, Item, Text, Column, Row, Image, Flickable } = QtQuick;
export default QtQuick;
