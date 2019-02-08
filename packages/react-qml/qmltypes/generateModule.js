const VERSION = '0.1';

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('ERROR: no qml file specified');
  console.log();
  console.log('Usage: generateModule file.qmltypes [module_name]');
  console.log();
  process.exit(1);
}

const moduleName = args.length === 2 ? args[1] : 'Module';

const filePath = args[0];
let fileContent;

try {
  fileContent = fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8');
} catch (e) {
  console.log(e.message);
  process.exit(1);
}

const outputDir = path.resolve(__dirname, moduleName);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, 0744);
}

const MODULE_INFO_REGEX = /qmlplugindump.+(Qt[^\s]+\s[^\s']+)/;
function getModuleInfo(content) {
  const matches = content.match(MODULE_INFO_REGEX);
  if (matches && matches.length === 2) {
    const parts = matches[1].split(' ');
    return {
      name: parts[0],
      version: parts[1],
    };
  }
  return {};
}

const FIELD_REGEX = {
  name: /\s{8}name:\s+(.+)/,
  defaultProperty: /\s{8}defaultProperty:\s+(.+)/,
  prototype: /\s{8}prototype:\s+(.+)/,
  exports: /\s{8}exports:\s*([^\]]+\])/,
  isCreatable: /\s{8}isCreatable:\s+(.+)/,
  isSingleton: /\s{8}isSingleton:\s+(.+)/,
  isComposite: /\s{8}isComposite:\s+(.+)/,
};

function getComponentField(str, field) {
  if (Object.keys(FIELD_REGEX).indexOf(field) === -1) {
    throw new Error(`Unsupported field: ${field}`);
  }
  const matches = str.match(FIELD_REGEX[field]);
  if (matches && matches.length === 2) {
    const raw = matches[1];

    if (field === 'exports') {
      const exportParts = raw.replace(/\[|\]|\n|\r/g, '').split(',');
      const firstPart = exportParts[0].trim();
      const value = firstPart.split(' ')[0].replace(/"/g, '');
      return value;
    }

    if (field === 'name') {
      return raw.split(' ')[0].replace(/"/g, '');
    }

    if (
      field === 'isCreatable' ||
      field === 'isSingleton' ||
      field === 'isComposite'
    ) {
      return raw;
    }

    return raw.replace(/"/g, '');
  }

  return undefined;
}

function convertComponent(str) {
  const component = {};

  Object.keys(FIELD_REGEX).forEach(field => {
    const fieldValue = getComponentField(str, field);
    if (fieldValue) {
      component[field] = fieldValue;
    }
  });

  if (component.exports) {
    const expParts = component.exports.split('/');
    if (expParts.length === 1) {
      component.module = '';
      component.name = component.exports;
    } else {
      component.module = expParts[0];
      component.name = expParts[1];
    }
  }

  return component;
}

const trimContent = str => str.trim();
const validComponent = str => str[0] === '{';
const publicComponent = component =>
  component.exports && component.exports.length > 0;
const creatableComponent = component => component.isCreatable !== 'false';
const visualComponent = component =>
  component.module.indexOf('Templates') === -1;

// let's do it
const componentParts = fileContent.split(/\s*Component\s*/g);
componentParts.shift();

const moduleInfo = getModuleInfo(fileContent);

const allComponents = componentParts
  .map(trimContent)
  .filter(validComponent)
  .map(convertComponent)
  .filter(publicComponent)
  .filter(creatableComponent)
  .filter(visualComponent);

let componentMap = {};
allComponents.forEach(c => {
  componentMap[c.name] = c;
});

const components = Object.values(componentMap);

// write types definition
const qmltypesJson = path.resolve(outputDir, 'qmltypes.json');
fs.writeFileSync(qmltypesJson, JSON.stringify(components));

// write module.ts
const indexTs = path.resolve(outputDir, 'index.ts');
const componentNames = Array.from(new Set(components.map(c => c.name)));
const namedExport = `export const {
${componentNames.map(name => '  ' + name).join(',\n')}
} = Module;`;
const tsFileContent = `// generatorVersion: ${VERSION}
import { createRawQmlComponent } from '../../renderer';
import types from './qmltypes.json';

const generateQml = (type: string) => \`import ${moduleInfo.name} ${
  moduleInfo.version
}; \${type} {}\`;

const Module: { [key: string]: any } = {};

for (let index = 0; index < types.length; index++) {
  const definition = types[index];
  const { name, module, defaultProperty = 'data' } = definition;
  const tagName = \`\${module}.\${name}\`;
  Module[name] = createRawQmlComponent(generateQml(name), tagName, {
    defaultProp: defaultProperty,
  });
}

${namedExport}

export default Module;
`;
fs.writeFileSync(indexTs, tsFileContent);
