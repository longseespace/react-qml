import registry from './registry';

const createRawQmlComponent = (
  rawContent: string,
  name: string,
  metadata = { defaultProp: 'data' }
) => {
  registry.registerRawComponent(name, rawContent, metadata);
  return name;
};

export default createRawQmlComponent;
