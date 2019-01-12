import { QmlComponent } from './qml';

export interface ComponentMetadata {
  defaultProp: string;
}

export interface RegistryComponent {
  component: QmlComponent;
  metadata: ComponentMetadata;
}

export interface ComponentRegistry {
  [name: string]: RegistryComponent;
}

export interface RawComponent {
  rawContent: string;
  metadata: ComponentMetadata;
}

export interface RawRegistry {
  [name: string]: RawComponent;
}

export class Registry {
  private componentRegistry: ComponentRegistry = {};
  private rawRegistry: RawRegistry = {};

  registerComponent(
    name: string,
    component: QmlComponent,
    metadata: ComponentMetadata = { defaultProp: 'data' }
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
    metadata: ComponentMetadata = { defaultProp: 'data' }
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
