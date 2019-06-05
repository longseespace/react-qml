/**
 * Copyright 2017-present, Callstack.
 * All rights reserved.
 *
 * @flow
 */
import type { Command } from '../types';

const chalk = require('chalk');
const cliui = require('cliui');

module.exports = (commands: Array<Command>) => {
  const ui = cliui();

  ui.div(
    `
${chalk.bold('Usage:')} react-qml [command] [options]

${chalk.bold('Options:')}

  --version \t ${chalk.gray('print the version number')}
  --help \t ${chalk.gray('print usage information')}

${chalk.bold('Commands:')}

${commands
      .map(command => `  ${command.name} \t ${chalk.gray(command.description)}`)
      .join('\n')}

Run ${chalk.bold(
      'react-qml COMMAND --help'
    )} for more information on specific commands
`
  );

  return ui.toString();
};
