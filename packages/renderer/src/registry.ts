import { QmlComponent } from './qml';

export interface ComponentMetadata {
  defaultProp: string;
}

export interface RegistryComponent {
  component: QmlComponent;
  metadata: ComponentMetadata;
}

export interface InternalRegistry {
  [name: string]: RegistryComponent;
}

export class Registry {
  private internalRegistry: InternalRegistry = {};

  registerComponent(
    name: string,
    component: QmlComponent,
    metadata: ComponentMetadata = { defaultProp: 'data' }
  ): void {
    // allow overwriting registered component
    this.internalRegistry[name] = { component, metadata };
  }

  getComponent(name: string): RegistryComponent | undefined {
    if (!this.internalRegistry[name]) {
      return undefined;
    }

    return this.internalRegistry[name];
  }
}

const registry = new Registry();

export default registry;
