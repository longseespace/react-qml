const Lexer = require('flex-js');
const VERSION = '0.3';

const MODULE_INFO_REGEX = /qmlplugindump.+(Qt[^\s]+\s[^\s']+)/;
function getModuleInfo(content) {
  const matches = content.match(MODULE_INFO_REGEX);
  if (matches && matches.length === 2) {
    const parts = matches[1].split(' ');
    return {
      name: parts[0],
      version: parts[1],
    };
  }
  return {};
}

function getModuleContent(content) {
  const parts = content.split('Module {');
  return 'Module {' + parts[1];
}

function createLexer(ops) {
  const lexer = new Lexer();

  // states
  lexer.addState('MODULE');
  lexer.addState('COMPONENT');
  lexer.addState('ENUM');
  lexer.addState('PROPERTY');
  lexer.addState('METHOD');
  lexer.addState('SIGNAL');
  lexer.addState('PARAMETER');

  lexer.addState('PROP_ASSIGNMENT');

  lexer.addState('PROP_OBJECT_VALUE');
  lexer.addState('PROP_ARRAY_VALUE');

  // definitions
  lexer.addDefinition('MODULE_START', /^Module {$/);
  lexer.addDefinition('COMPONENT_START', /Component {/);
  lexer.addDefinition('ENUM_START', /Enum {/);
  lexer.addDefinition('PROPERTY_START', /Property {/);
  lexer.addDefinition('METHOD_START', /Method {/);
  lexer.addDefinition('PARAMETER_START', /Parameter {/);
  lexer.addDefinition('SIGNAL_START', /Signal {/);
  lexer.addDefinition('SCOPE_END', /}/);

  lexer.addDefinition('PROP_KEY', /\"?\w+\"?:/);
  lexer.addDefinition('PROP_INLINE_VALUE', /\s*[^;\n{}\[\]]+;/);
  lexer.addDefinition('PROP_INLINE_LAST_VALUE', /\s*[^;\n{}\[\]]+}/);
  lexer.addDefinition('PROP_SCALAR_VALUE', /\s*[^;\n{}\[\]]+$/);
  lexer.addDefinition('PROP_OBJECT_VALUE_START', /\s*{/);
  lexer.addDefinition('PROP_OBJECT_VALUE_END', /}/);
  lexer.addDefinition('PROP_ARRAY_VALUE_START', /\s*\[/);
  lexer.addDefinition('PROP_ARRAY_VALUE', /\s*[^,\]\n]+,?/);
  lexer.addDefinition('PROP_ARRAY_VALUE_END', /\]/);

  // rules
  lexer.addRule(/{MODULE_START}/, function(lexer) {
    ops.push({ type: 'MODULE_START' });
    lexer.begin('MODULE');
  });

  lexer.addStateRule('MODULE', /{SCOPE_END}/, function(lexer) {
    ops.push({ type: 'MODULE_END' });
    lexer.begin();
  });

  // Component
  lexer.addRule(/{COMPONENT_START}/, function(lexer) {
    ops.push({ type: 'COMPONENT_START' });
    lexer.pushState('COMPONENT');
  });

  lexer.addStateRule('COMPONENT', /{SCOPE_END}/, function(lexer) {
    ops.push({ type: 'COMPONENT_END' });
    lexer.popState();
  });

  // Enum
  lexer.addRule(/{ENUM_START}/, function(lexer) {
    ops.push({ type: 'ENUM_START' });
    lexer.pushState('ENUM');
  });

  lexer.addStateRule('ENUM', /{SCOPE_END}/, function(lexer) {
    ops.push({ type: 'ENUM_END' });
    lexer.popState();
  });

  // Property
  lexer.addRule(/{PROPERTY_START}/, function(lexer) {
    ops.push({ type: 'PROPERTY_START' });
    lexer.pushState('PROPERTY');
  });

  lexer.addStateRule('PROPERTY', /{SCOPE_END}/, function(lexer) {
    ops.push({ type: 'PROPERTY_END' });
    lexer.popState();
  });

  // Method
  lexer.addRule(/{METHOD_START}/, function(lexer) {
    ops.push({ type: 'METHOD_START' });
    lexer.pushState('METHOD');
  });

  lexer.addStateRule('METHOD', /{SCOPE_END}/, function(lexer) {
    ops.push({ type: 'METHOD_END' });
    lexer.popState();
  });

  // Signal
  lexer.addRule(/{SIGNAL_START}/, function(lexer) {
    ops.push({ type: 'SIGNAL_START' });
    lexer.pushState('SIGNAL');
  });

  lexer.addStateRule('SIGNAL', /{SCOPE_END}/, function(lexer) {
    ops.push({ type: 'SIGNAL_END' });
    lexer.popState();
  });

  // Parameter
  lexer.addRule(/{PARAMETER_START}/, function(lexer) {
    ops.push({ type: 'PARAMETER_START' });
    lexer.pushState('PARAMETER');
  });

  lexer.addStateRule('PARAMETER', /{SCOPE_END}/, function(lexer) {
    ops.push({ type: 'PARAMETER_END' });
    lexer.popState();
  });

  // props, must be last
  lexer.addRule(/{PROP_KEY}/, function(lexer) {
    const value = lexer.text.replace(/:|"/g, '');
    ops.push({ type: 'PROP_ASSIGNMENT_START', value });
    lexer.pushState('PROP_ASSIGNMENT');
  });

  lexer.addStateRule('PROP_ASSIGNMENT', /{PROP_INLINE_VALUE}/, function(lexer) {
    const value = lexer.text.replace(/"|;/g, '').trim();
    ops.push({ type: 'PROP_INLINE_VALUE', value });
    lexer.popState();
  });

  lexer.addStateRule('PROP_ASSIGNMENT', /{PROP_INLINE_LAST_VALUE}/, function(
    lexer
  ) {
    const value = lexer.text.replace(/"|}/g, '').trim();
    ops.push({ type: 'PROP_INLINE_LAST_VALUE', value });
    lexer.popState();
    lexer.unput('}'); // 100 for naming
  });

  lexer.addStateRule('PROP_ASSIGNMENT', /{PROP_SCALAR_VALUE}/, function(lexer) {
    const value = lexer.text.replace(/"|,/g, '').trim();
    ops.push({ type: 'PROP_SCALAR_VALUE', value });
    lexer.popState();
  });

  lexer.addStateRule('PROP_ASSIGNMENT', /{PROP_OBJECT_VALUE_START}/, function(
    lexer
  ) {
    ops.push({ type: 'PROP_OBJECT_VALUE_START' });
    lexer.pushState('PROP_OBJECT_VALUE');
  });

  lexer.addStateRule('PROP_OBJECT_VALUE', /{PROP_OBJECT_VALUE_END}/, function(
    lexer
  ) {
    ops.push({ type: 'PROP_OBJECT_VALUE_END' });
    lexer.popState(); // end PROP_OBJECT_VALUE
    lexer.popState(); // end PROP_ASSIGNMENT
  });

  lexer.addStateRule('PROP_ASSIGNMENT', /{PROP_ARRAY_VALUE_START}/, function(
    lexer
  ) {
    ops.push({ type: 'PROP_ARRAY_VALUE_START' });
    lexer.pushState('PROP_ARRAY_VALUE');
  });

  lexer.addStateRule('PROP_ARRAY_VALUE', /{PROP_ARRAY_VALUE}/, function(lexer) {
    const value = lexer.text.replace(/"|,/g, '').trim();
    ops.push({ type: 'PROP_ARRAY_VALUE', value });
  });

  lexer.addStateRule('PROP_ARRAY_VALUE', /{PROP_ARRAY_VALUE_END}/, function(
    lexer
  ) {
    ops.push({ type: 'PROP_ARRAY_VALUE_END' });
    lexer.popState(); // end PROP_ARRAY_VALUE
    lexer.popState(); // end PROP_ASSIGNMENT
  });

  lexer.addRule(/\s+/);

  return lexer;
}

function parse(fileContent) {
  const metadata = getModuleInfo(fileContent);

  const moduleContent = getModuleContent(fileContent);

  const ops = [];
  const lexer = createLexer(ops);
  lexer.setSource(moduleContent);
  lexer.lex();

  const Module = {};

  let objectStack = [];
  let currentKey = '';

  ops.forEach(op => {
    const currentObject =
      objectStack.length && objectStack[objectStack.length - 1];
    var obj = {};
    var arr = [];

    const addToCollection = name => {
      if (!currentObject[name]) {
        currentObject[name] = [];
      }
      currentObject[name].push(obj);
      objectStack.push(obj);
    };

    const setObjectValue = name => {
      currentObject[name] = obj;
      objectStack.push(obj);
    };

    const setArrayValue = name => {
      currentObject[name] = arr;
      objectStack.push(arr);
    };

    switch (op.type) {
      case 'MODULE_START':
        objectStack.push(Module);
        break;
      case 'COMPONENT_START':
        addToCollection('components');
        break;
      case 'PROPERTY_START':
        addToCollection('properties');
        break;
      case 'SIGNAL_START':
        addToCollection('signals');
        break;
      case 'ENUM_START':
        addToCollection('enums');
        break;
      case 'METHOD_START':
        addToCollection('methods');
        break;
      case 'PARAMETER_START':
        addToCollection('parameters');
        break;
      case 'PROP_OBJECT_VALUE_START':
        setObjectValue(currentKey);
        break;
      case 'PROP_ARRAY_VALUE_START':
        setArrayValue(currentKey);
        break;
      case 'PROP_ARRAY_VALUE':
        currentObject.push(op.value);
        break;
      case 'PROP_ASSIGNMENT_START':
        currentKey = op.value;
        break;
      case 'PROP_INLINE_VALUE':
      case 'PROP_INLINE_LAST_VALUE':
      case 'PROP_SCALAR_VALUE':
        currentObject[currentKey] = op.value;
        break;
      case 'MODULE_END':
      case 'COMPONENT_END':
      case 'PROPERTY_END':
      case 'SIGNAL_END':
      case 'ENUM_END':
      case 'METHOD_END':
      case 'PARAMETER_END':
      case 'PROP_OBJECT_VALUE_END':
      case 'PROP_ARRAY_VALUE_END':
        objectStack.pop();
        break;
      default:
    }
  });

  return {
    Module,
    metadata,
    parserVersion: VERSION,
  };
}

module.exports = parse;
