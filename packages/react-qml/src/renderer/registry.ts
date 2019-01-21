import { QmlComponent } from './qml';

export type QmlComponentMetadata = { defaultProp: string } & {
  [key: string]: any;
};

export type RegistryComponent = {
  component: QmlComponent;
  metadata: QmlComponentMetadata;
};

export type ComponentRegistry = {
  [name: string]: RegistryComponent;
};

export type RawComponent = {
  rawContent: string;
  metadata: QmlComponentMetadata;
};

export type RawRegistry = {
  [name: string]: RawComponent;
};

export class Registry {
  private componentRegistry: ComponentRegistry = {};
  private rawRegistry: RawRegistry = {};

  registerComponent(
    name: string,
    component: QmlComponent,
    metadata: QmlComponentMetadata = { defaultProp: 'data' }
  ): void {
    // allow overwriting registered component
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
    metadata: QmlComponentMetadata = { defaultProp: 'data' }
  ) {
    // allow overwriting registered component
    this.rawRegistry[name] = { rawContent, metadata };
  }

  getRawComponent(name: string): RawComponent | undefined {
    if (!this.rawRegistry[name]) {
      return undefined;
    }

    return this.rawRegistry[name];
  }
}

const registry = new Registry();

export default registry;
