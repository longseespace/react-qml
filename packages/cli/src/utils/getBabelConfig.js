/**
 * Copyright 2017-present, Callstack.
 * All rights reserved.
 *
 * @flow
 */

const fs = require('fs');
const path = require('path');

// TODO: create a preset for this
const DEFAULT_BABELRC = {
  plugins: [
    'syntax-async-functions',
    'syntax-class-properties',
    'syntax-trailing-function-commas',
    'transform-class-properties',
    'transform-es2015-function-name',
    'transform-es2015-arrow-functions',
    'transform-es2015-block-scoping',
    'transform-es2015-classes',
    'transform-es2015-computed-properties',
    'check-es2015-constants',
    'transform-es2015-destructuring',
    [
      'transform-es2015-modules-commonjs',
      { strict: false, allowTopLevelThis: true },
    ],
    'transform-es2015-parameters',
    'transform-es2015-shorthand-properties',
    'transform-es2015-spread',
    'transform-es2015-template-literals',
    'transform-es2015-literals',
    'transform-flow-strip-types',
    'transform-object-assign',
    'transform-object-rest-spread',
    'transform-react-display-name',
    'transform-react-jsx-source',
    'transform-react-jsx',
    [
      'transform-es2015-for-of',
      {
        loose: true,
      },
    ],
  ],
};

module.exports = function getBabelConfig(cwd: string) {
  let babelrc;

  const file = path.join(cwd, '.babelrc');

  if (fs.existsSync(file)) {
    babelrc = { extends: file };
  } else {
    babelrc = DEFAULT_BABELRC;
  }

  const defaultPlugins = [require.resolve('./fixRequireIssues')]
    .concat(
      process.env.NODE_ENV === 'production'
        ? []
        : [
            require.resolve('react-hot-loader/babel'),
            require.resolve('../hot/babelPlugin'),
          ]
    )
    .concat(babelrc.plugins || []);

  return Object.assign({}, babelrc, { plugins: defaultPlugins });
};
