/**
 * Copyright 2017-present, Callstack.
 * All rights reserved.
 *
 * @flow
 */

const chalk = require('chalk');
const dedent = require('dedent');

module.exports = () => dedent`
  Unable to open in editor. You can set environment variables to open your editor.

  --- Easiest (auto-detect) ---

    ${chalk.bold('export REACT_EDITOR=code')}
    or
    ${chalk.bold('export REACT_EDITOR=/path/to/atom')}
    '(sublime, atom, code, webstorm, phpstorm, idea14ce, vim, emacs, visualstudio)'
    via https://github.com/lahmatiy/open-in-editor


  --- Harder (you have a custom script or symlink) ---

    ${chalk.bold('export REACT_EDITOR=vim')}
    ${chalk.bold('export REACT_EDITOR_CMD=/usr/local/bin/nvim')}

    You can use this if you have recognized editor, but in non-standard location.


  --- Hardest (completely custom -- hold my beer) ---

    ${chalk.bold('export REACT_EDITOR_CMD=/path/to/a/crazy/editor')}
    ${chalk.bold(
      'export REACT_EDITOR_PATTERN="-r -g {filename}:{line}:{column}"'
    )}

    You can use this if your editor is unknown or you want to launch with different flags.

`;
