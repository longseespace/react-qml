/**
 * Copyright 2017-present, Callstack.
 * All rights reserved.
 *
 * @flow
 */

const chalk = require('chalk');
const dedent = require('dedent');

module.exports = () => dedent`
  This doesn't seem to be a React QML project.

  Make sure you have a ${chalk.bold('package.json')} file with ${chalk.bold(
  'react-qml'
)} in dependencies, and you have installed these dependencies.

  To generate a React QML project, run ${chalk.bold(
    'react-qml init <ProjectName>'
  )}. See ${chalk.cyan(
  'https://facebook.github.io/react-native/docs/getting-started.html'
)} for details.
`;
