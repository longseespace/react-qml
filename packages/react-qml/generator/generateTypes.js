const VERSION = '0.3'; // generator version

const fs = require('fs');
const path = require('path');
const flatMap = require('lodash/flatMap');
const uniqBy = require('lodash/uniqBy');

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('ERROR: no definition file specified');
  console.log();
  console.log('Usage: generateTypes file.json [module_name]');
  console.log();
  process.exit(1);
}

const moduleName = args.length === 2 ? args[1] : 'Module';
const isQtQml = moduleName === 'QtQml';

const filePath = args[0];

const parsedResult = require('./' + filePath);
const dependencies = parsedResult.Module.dependencies.map(val =>
  val.split(' ')[0].replace('.', '')
);
if (!isQtQml) {
  // all modules automatically depend on QtQml
  dependencies.unshift('QtQml');
}

// get all deps module names
const depModules = {};
dependencies.map(dep => {
  try {
    const definitions = require(`./jsontypes/${dep}.json`);
    const components = (definitions.Module.components || []).filter(
      c => !c.isComposite
    );
    depModules[dep] = components.map(c => c.name);
  } catch (e) {
    depModules[dep] = [];
  }
});

const outputDir = path.resolve(__dirname, 'output', moduleName);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, 0744);
}

const components = (parsedResult.Module.components || []).filter(
  c => !c.isComposite
);

function generateTypes() {
  const foundDeps = dependencies.filter(dep => depModules[dep].length > 0);
  const tsDepContent = foundDeps
    .map(
      moduleName => `import * as ${moduleName} from '../${moduleName}/types';`
    )
    .join('\n');

  const tsContentPre = `// script: generateTypes, version: ${VERSION}
// dependencies
${tsDepContent}

type Signal<T> = {
  connect: (handler: T) => void;
  disconnect: (handler: T) => void;
}
`;

  const tsContentPost = `// end`;

  const tsComponentContent = [];

  const TYPE_MAPS = {
    double: 'number',
    int: 'number',
    bool: 'boolean',
    string: 'string',
    QUrl: 'string',
  };

  const getEnumName = (c, e) => `${c.name}_${e.name}`;

  const allClassTypes = components.map(c => c.name);
  const allEnumTypes = flatMap(components, c =>
    (c.enums || []).map(e => getEnumName(c, e))
  );

  function isClassType(type) {
    if (type && allClassTypes.indexOf(type) > -1) {
      return type;
    }
    return false;
  }

  function isEnumType(type) {
    if (type && allEnumTypes.indexOf(type) > -1) {
      return type;
    }
    return false;
  }

  // check if type is from dependencies
  function getDependencyType(type) {
    for (var dep in depModules) {
      if (depModules[dep].indexOf(type) > -1) {
        // found
        return `${dep}.${type}`;
      }
    }
    return false;
  }

  function getParentType(type) {
    if (type === undefined) {
      return false;
    }

    if (isClassType(type)) {
      return type;
    }

    const externalType = getDependencyType(type);
    if (externalType) {
      return externalType;
    }

    return false;
  }

  function getPropType(com, type) {
    if (type === undefined) {
      return 'void';
    }

    if (TYPE_MAPS.hasOwnProperty(type)) {
      return TYPE_MAPS[type];
    }

    if (isClassType(type)) {
      return type;
    }

    const maybeEnumType = `${com.name}_${type}`;
    if (isEnumType(maybeEnumType)) {
      return `${maybeEnumType} | string`;
    }

    const externalType = getDependencyType(type);
    if (externalType) {
      return externalType;
    }

    return 'any';
  }

  function buildPropType(com, prop) {
    const propName = prop.name;
    const propType = getPropType(com, prop.type);
    const readonlyText = prop.isReadonly ? 'readonly ' : '';

    return `${readonlyText}${propName}: ${propType};`;
  }

  function buildParamType(com, param, index, optional = false) {
    const paramName = param.name || `param${index}`;
    const paramType = getPropType(com, param.type);
    const optionalText = optional ? '?' : '';

    return `${paramName}${optionalText}: ${paramType}`;
  }

  function buildSignalType(com, signal) {
    const signalName = signal.name;
    // const parameters = signal.parameters || [];
    // const paramText = parameters
    //   .map((param, index) => buildParamType(com, param, index))
    //   .join(', ');
    //
    // let handlerText = 'Function';
    // if (paramText.length) {
    //   handlerText = `(${paramText}) => void`;
    // }

    return `${signalName}: Signal<Function>;`;
  }

  function buildMethodType(com, method) {
    const methodName = method.name;
    const parameters = method.parameters || [];
    const paramText = parameters
      .map((param, index) => buildParamType(com, param, index))
      .join(', ');
    const resultType = method.type ? getPropType(com, method.type) : 'void';

    return `${methodName}(${paramText}): ${resultType};`;
  }

  function buildEnumType(com, en) {
    const enumName = getEnumName(com, en);
    const enumText = Object.entries(en.values)
      .map(([key, value]) => `${key} = ${value}`)
      .join(',\n');

    return `export enum ${enumName}{
  ${enumText}
    }`;
  }

  components.forEach(component => {
    // enums
    const enums = component.enums || [];
    const enumContent = enums
      .map(en => buildEnumType(component, en))
      .join('\n');

    // props
    const properties = component.properties || [];
    const propContent = properties
      .map(prop => buildPropType(component, prop))
      .join('\n');
    const allPropNames = properties.map(p => p.name);

    // methods
    const methods = component.methods || [];
    const methodContent = methods
      .map(method => buildMethodType(component, method))
      .join('\n');

    // signals
    const signals = uniqBy(component.signals || [], 'name');
    const signalContent = signals
      .filter(signal => allPropNames.indexOf(signal.name) === -1)
      .map(signal => buildSignalType(component, signal))
      .join('\n');

    let componentContent = `${enumContent}

  export type ${component.name} = {
  ${propContent}

  ${methodContent}

  ${signalContent}

  }`;
    const parentType = getParentType(component.prototype);
    if (parentType) {
      componentContent = componentContent + ` & ${parentType}`;
    }

    tsComponentContent.push(componentContent);
  });

  const tsContent = `${tsContentPre}

  ${tsComponentContent.join('\n\n')}

  ${tsContentPost}`;

  // console.log(JSON.stringify(parsedResult, null, '  '));
  // console.log('tsContent');
  // console.log(tsContent);

  const tsFile = path.resolve(outputDir, `types.ts`);
  fs.writeFileSync(tsFile, tsContent);
}

generateTypes();
