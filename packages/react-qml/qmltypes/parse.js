const fs = require('fs');
const path = require('path');

const parse = require('./parser');

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('ERROR: no qml file specified');
  console.log();
  console.log('Usage: parse file.qmltypes');
  console.log();
  process.exit(1);
}

const moduleName = args.length === 2 ? args[1] : 'Module';

const filePath = args[0];
let fileContent;

try {
  fileContent = fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8');
} catch (e) {
  console.log(e.message);
  process.exit(1);
}

const result = parse(fileContent);

console.log(JSON.stringify(result, null, '  '));
