import { createRawQmlComponent } from '../../../renderer';

const generateQml = (type: string) => `import QtQuick.Controls 2.3\n${type} {}`;

const COMPONENTS = [
  'ScrollView',
  'Button',
  'Label',
  'Pane',
  'ProgressBar',
  'Drawer',
];

const QtQuickControls: { [key: string]: any } = {};

for (const ComponentType of COMPONENTS) {
  QtQuickControls[ComponentType] = createRawQmlComponent(
    generateQml(ComponentType),
    ComponentType.toLowerCase()
  );
}

export default QtQuickControls;
