/**
 * Copyright 2017-present, Callstack.
 * All rights reserved.
 *
 * @flow
 */
const dedent = require('dedent');
const chalk = require('chalk');

module.exports = (directory: string) => dedent`
   Couldn't find configuration file ${chalk.bold(directory)}

   Make sure:
   • You are running qix from your project directory
   • You have a ${chalk.bold('webpack.qix.js')} file

   Run ${chalk.bold('qix init')} to automatically generate a ${chalk.bold(
  'webpack.qix.js'
)} file
`;
