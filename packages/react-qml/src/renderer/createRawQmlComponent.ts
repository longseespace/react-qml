import AppRegistry from '../common/AppRegistry';

const createRawQmlComponent = (
  rawContent: string,
  name: string,
  metadata = { defaultProp: 'data' }
) => {
  AppRegistry.registerRawComponent(name, rawContent, metadata);
  return name;
};

export default createRawQmlComponent;
