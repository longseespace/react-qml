export const Registry = {};

export const registerNativeComponentClass = (name, qmlContent, defaultProp = 'data') => {
  if (Registry[name]) {
    // noop
    throw new Error(`Conflicted name. ${name} is already registered`);
    return;
  }

  Registry[name] = {qmlContent, defaultProp};
};

export const registerQtComponentClass = (name, component, defaultProp = 'data') => {
  if (Registry[name]) {
    // noop
    throw new Error(`Conflicted name. ${name} is already registered`);
    return;
  }

  Registry[name] = {component, defaultProp};
};
