#!/usr/bin/env node

// TODO: move script to @react-qml/cli
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);

function build() {
  const targetDir = path.resolve(__dirname, 'target');
  try {
    fs.mkdirSync(targetDir);
  } catch (error) {
    // ignore
  }

  const qmakeArgs = args.length > 0 ? args.join(' ') : '';

  execSync(`qmake ${qmakeArgs} ../main.pro`, { cwd: targetDir });
  execSync('make', { cwd: targetDir });
}

build();
