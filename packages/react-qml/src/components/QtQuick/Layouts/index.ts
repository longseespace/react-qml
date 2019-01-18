import { createRawQmlComponent } from '../../../renderer';

const generateQml = (type: string) => `import QtQuick.Layouts 1.3\n${type} { }`;

const COMPONENTS = ['RowLayout', 'ColumnLayout', 'GridLayout', 'StackLayout'];

const QtQuickLayout: { [key: string]: any } = {};

for (const ComponentType of COMPONENTS) {
  QtQuickLayout[ComponentType] = createRawQmlComponent(
    generateQml(ComponentType),
    ComponentType.toLowerCase()
  );
}

export default QtQuickLayout;
