#!/usr/bin/env node

const util = require('util');
const { spawn } = require('child_process');

const target = 'HelloWorld';

function runMacOS() {
  const child = spawn(`${target}.app/Contents/MacOS/${target}`, {
    cwd: __dirname,
  });

  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);

  child.on('close', code => {
    console.log(`child process exited with code ${code}`);
  });
}

runMacOS();
