export const Registry = {};

export const registerNativeComponentClass = (name, qmlContent, defaultProp = 'data') => {
  // allow overwriting registered component
  Registry[name] = {qmlContent, defaultProp};
};

export const registerQtComponentClass = (name, component, defaultProp = 'data') => {
  // allow overwriting registered component
  Registry[name] = {component, defaultProp};
};
