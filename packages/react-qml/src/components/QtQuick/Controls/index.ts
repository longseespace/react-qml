import { createRawQmlComponent } from '../../../renderer';

const generateQml = (type: string) => `import QtQuick.Controls 2.3; ${type} {}`;

const COMPONENTS = [
  { name: 'ScrollView', defaultProp: 'contentData' },
  { name: 'Button', defaultProp: 'data' },
  { name: 'Label', defaultProp: 'data' },
  { name: 'Pane', defaultProp: 'contentData' },
  { name: 'ProgressBar', defaultProp: 'data' },
  { name: 'Drawer', defaultProp: 'contentData' },
  { name: 'ToolBar', defaultProp: 'contentData' },
  { name: 'ToolButton', defaultProp: 'data' },
  {
    name: 'ApplicationWindow',
    defaultProp: 'contentData',
  },
  { name: 'Action', defaultProp: 'data' },
  { name: 'Menu', defaultProp: 'contentData' },
  { name: 'MenuBar', defaultProp: 'contentData' },
  { name: 'MenuBarItem', defaultProp: 'data' },
  { name: 'MenuItem', defaultProp: 'data' },
  { name: 'MenuSeparator', defaultProp: 'data' },
];

const QtQuickControls: { [key: string]: any } = {};

for (const component of COMPONENTS) {
  const { name, defaultProp } = component;
  QtQuickControls[name] = createRawQmlComponent(
    generateQml(name),
    `QtQuick.Controls2.${name}`,
    { defaultProp }
  );
}

export const {
  ScrollView,
  Button,
  Label,
  Pane,
  ProgressBar,
  Drawer,
  ToolBar,
  ToolButton,
  ApplicationWindow,
  Action,
  Menu,
  MenuBar,
  MenuBarItem,
  MenuItem,
  MenuSeparator,
} = QtQuickControls;

export default QtQuickControls;
