import { createRawQmlComponent } from '../../../renderer';

const generateQml = (type: string) => `import QtQuick.Layouts 1.3; ${type} { }`;

const COMPONENTS = ['RowLayout', 'ColumnLayout', 'GridLayout', 'StackLayout'];

const QtQuickLayout: { [key: string]: any } = {};

for (const ComponentType of COMPONENTS) {
  QtQuickLayout[ComponentType] = createRawQmlComponent(
    generateQml(ComponentType),
    `QtQuick.Layouts.${ComponentType}`
  );
}

export const {
  RowLayout,
  ColumnLayout,
  GridLayout,
  StackLayout,
} = QtQuickLayout;

export default QtQuickLayout;
