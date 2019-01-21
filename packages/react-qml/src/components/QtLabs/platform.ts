import { createRawQmlComponent } from '../../renderer';

const generateQml = (type: string) => `import Qt.labs.platform 1.0; ${type} {}`;

const COMPONENTS = [
  'Menu',
  'MenuItem',
  'MenuItemGroup',
  'MenuSeparator',
  'MenuBar',
];

const QtLabsPlatform: { [key: string]: any } = {};

for (const ComponentType of COMPONENTS) {
  QtLabsPlatform[ComponentType] = createRawQmlComponent(
    generateQml(ComponentType),
    `QtLabs.Platform.${ComponentType}`
  );
}

export const {
  Menu,
  MenuItem,
  MenuItemGroup,
  MenuSeparator,
  MenuBar,
} = QtLabsPlatform;

export default QtLabsPlatform;
