const components = require('./manifest');
const fs = require('fs');
const { flatten, flow, entries, map } = require('lodash/fp');
const es6ExportClass = require('./es6ExportClass.template');

const writeFiles = ({ fileName, content }) => {
  fs.writeFileSync(fileName, content);
};

const execute = flow(
  entries,
  map(([moduleName, { version, components }]) => {
    const path = moduleName.split('.').join('/');

    return components.map(componentName => ({
      fileName: `./src/${path}/${componentName}.js`,
      content: es6ExportClass(
        componentName,
        `import ${moduleName} ${version}\n${componentName} {}`
      ),
    }));
  }),
  flatten,
  map(writeFiles)
);

execute(components);
