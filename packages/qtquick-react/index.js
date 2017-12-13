const components = require('./manifest');
const fs = require('fs');
const mkdirp = require('mkdirp');
const { flatten, flow, entries, map } = require('lodash/fp');
const es6ExportClass = require('./es6ExportClass.template');

const writeFiles = ({ fileName, content }) => {
  fs.writeFileSync(fileName, content);
};

const execute = flow(
  entries,
  map(([moduleName, { versions, components }]) => {
    const path = moduleName.split('.').join('/');

    return versions.map(version => {
      mkdirp.sync(`./src/${path}/${version}`);
      return components.map(componentName => ({
        fileName: `./src/${path}/${version}/${componentName}.js`,
        content: es6ExportClass(componentName, moduleName, version),
      }));
    });
  }),
  flatten,
  flatten,
  map(writeFiles)
);

execute(components);
