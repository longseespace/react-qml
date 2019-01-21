import { createRawQmlComponent } from '../../../renderer';

const generateQml = (type: string) => `import QtQuick 2.0;${type} {}`;

const COMPONENTS = [
  'ListModel',
  'ListElement',
  'ObjectModel',
  'ItemSelectionModel',
  'DelegateModelGroup',
  'DelegateModel',
];

const QtQmlModels: { [key: string]: any } = {};

for (const ComponentType of COMPONENTS) {
  QtQmlModels[ComponentType] = createRawQmlComponent(
    generateQml(ComponentType),
    `QtQmlModels.${ComponentType}`
  );
}

export const {
  ListModel,
  ListElement,
  ObjectModel,
  ItemSelectionModel,
  DelegateModelGroup,
  DelegateModel,
} = QtQmlModels;

export default QtQmlModels;
