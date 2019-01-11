#!/usr/bin/env node

const util = require('util');
const { execSync } = require('child_process');

const { NODE_ENV = 'development' } = process.env;

const qmakeArgs = NODE_ENV === 'production' ? '' : 'CONFIG+=debug';

function build() {
  execSync(`qmake ${qmakeArgs} main.pro`, { cwd: __dirname });
  execSync('make', { cwd: __dirname });
}

build();
