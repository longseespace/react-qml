// script: generateModule, version: 0.3
import { createRawQmlComponent } from '../../renderer';
import types from './qmltypes.json';
export * from './types';

type ModuleDenifition = {
  name: string;
  module: string;
  defaultProperty?: string;
}

const generateQml = (type: string) => `import QtQuick.Particles 2.0; ${type} {}`;

const Module: { [key: string]: any } = {};

for (let index = 0; index < types.length; index++) {
  const definition = types[index] as ModuleDenifition;
  const { name, module, defaultProperty = 'data' } = definition;
  const tagName = `${module}.${name}`;
  Module[name] = createRawQmlComponent(generateQml(name), tagName, {
    defaultProp: defaultProperty,
  });
}

export const {
  Age,
  AngleDirection,
  Attractor,
  CumulativeDirection,
  Affector,
  CustomParticle,
  EllipseShape,
  Friction,
  Gravity,
  GroupGoal,
  ImageParticle,
  ItemParticle,
  LineShape,
  MaskShape,
  Emitter,
  ParticleGroup,
  ParticleSystem,
  PointDirection,
  RectangleShape,
  SpriteGoal,
  TargetDirection,
  TrailEmitter,
  Turbulence,
  Wander
} = Module;

export default Module;
