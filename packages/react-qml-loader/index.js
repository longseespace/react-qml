import path from 'path';

import loaderUtils from 'loader-utils';

export default function loader(content) {
  const options = loaderUtils.getOptions(this) || {};

  const context = options.context || this.rootContext;

  const url = loaderUtils.interpolateName(this, options.name, {
    context,
    content,
    regExp: options.regExp,
  });

  let outputPath = url;

  if (options.outputPath) {
    if (typeof options.outputPath === 'function') {
      outputPath = options.outputPath(url, this.resourcePath, context);
    } else {
      outputPath = path.posix.join(options.outputPath, url);
    }
  }

  let publicPath = `__webpack_public_path__ + ${JSON.stringify(outputPath)}`;

  if (options.publicPath) {
    if (typeof options.publicPath === 'function') {
      publicPath = options.publicPath(url, this.resourcePath, context);
    } else {
      publicPath = `${
        options.publicPath.endsWith('/')
          ? options.publicPath
          : `${options.publicPath}/`
      }${url}`;
    }

    publicPath = JSON.stringify(publicPath);
  }

  if (typeof options.emitFile === 'undefined' || options.emitFile) {
    this.emitFile(outputPath, content);
  }

  const fileName = loaderUtils.interpolateName(this, '[name]_[hash]', {
    context,
    content,
    regExp: options.regExp,
  });

  const output = `
var React = require('react');
var ReactQML = require('react-qml');
var Component = ReactQML.createQmlComponent(${String(publicPath)}, '${String(
    fileName
  )}');

module.exports = Component;
`;

  return output;
}

export const raw = true;
