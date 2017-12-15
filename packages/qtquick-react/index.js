const fs = require('fs');
const mkdirp = require('mkdirp');
const { tap, flatten, flow, entries, map, forEach } = require('lodash/fp');
const es6ExportClass = require('./es6ExportClass.template');

const COMPONENTS = require('./components');
const VERSIONS = require('./versions-mapping');

const PATCHES = require('./patches')

console.time('done')

flow(
  entries,
  map(([qtVersion, moduleVersions]) => {
    console.log(`> building components for qt ${qtVersion}`);

    return flow(
      entries,
      forEach(([moduleName, moduleVersion]) => {
        const { components } = COMPONENTS[moduleName];
        console.log(
          `> [qt ${qtVersion}]: ${moduleName} ${moduleVersion} - ${
            components.length
          } components`
        );

        components.forEach(componentName => {
          const patch = PATCHES[`${moduleName}.${componentName}`] || {};

          const path = moduleName.split('.').join('/');
          mkdirp.sync(`./es6/${path}/${moduleVersion}`);

          const fileName = `./es6/${path}/${moduleVersion}/${componentName}.js`;
          const content = es6ExportClass({
            componentName,
            moduleName,
            moduleVersion,
            patch,
            dependenciesVersions: VERSIONS[qtVersion],
          });

          writeFiles(fileName, content);
        });
      })
    )(moduleVersions);
  }),
)(VERSIONS);

console.timeEnd('done')

function writeFiles(fileName, content) {
  fs.writeFileSync(fileName, content);
}
