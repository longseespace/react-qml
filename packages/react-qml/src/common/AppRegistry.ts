export type RegistryComponentMetadata = { defaultProp: string } & {
  [key: string]: any;
};

export type RegistryComponent = {
  component: Qml.QmlComponent;
  metadata: RegistryComponentMetadata;
};

export type ComponentRegistry = {
  [name: string]: RegistryComponent;
};

export type RawComponent = {
  rawContent: string;
  metadata: RegistryComponentMetadata;
};

export type RawRegistry = {
  [name: string]: RawComponent;
};

interface Registry {
  registerComponent(
    name: string,
    component: Qml.QmlComponent,
    metadata: RegistryComponentMetadata
  ): void;

  getComponent(name: string): RegistryComponent | undefined;

  registerRawComponent(
    name: string,
    rawContent: string,
    metadata: RegistryComponentMetadata
  ): void;

  getRawComponent(name: string): RawComponent | undefined;
}

class RegistryImpl implements Registry {
  private componentRegistry: ComponentRegistry = {};
  private rawRegistry: RawRegistry = {};

  registerComponent(
    name: string,
    component: Qml.QmlComponent,
    metadata: RegistryComponentMetadata = { defaultProp: 'data' }
  ): void {
    // allow re-register component for hot-reloading
    this.componentRegistry[name] = { component, metadata };
  }

  getComponent(name: string): RegistryComponent | undefined {
    if (!this.componentRegistry[name]) {
      return undefined;
    }

    return this.componentRegistry[name];
  }

  registerRawComponent(
    name: string,
    rawContent: string,
    metadata: RegistryComponentMetadata = { defaultProp: 'data' }
  ): void {
    if (this.rawRegistry[name]) {
      throw new Error(`Component is registered: ${name}`);
    }
    this.rawRegistry[name] = { rawContent, metadata };
  }

  getRawComponent(name: string): RawComponent | undefined {
    if (!this.rawRegistry[name]) {
      return undefined;
    }

    return this.rawRegistry[name];
  }
}

export const AppRegistry = new RegistryImpl();

export default AppRegistry;
