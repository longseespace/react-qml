#!/usr/bin/env node

// TODO: move script to @react-qml/cli
const { spawn } = require('child_process');
const path = require('path');

const target = 'HelloWorld';

function runMacOS() {
  const targetDir = path.resolve(__dirname, 'target');
  const child = spawn(`${target}.app/Contents/MacOS/${target}`, {
    cwd: targetDir,
  });

  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);

  child.on('close', code => {
    console.log(`child process exited with code ${code}`);
  });
}

// TODO: detect platform
runMacOS();
