export const setItem = (key, value) => {
  __settings__[key] = value;
};

export const getItem = key => __settings__[key];

export const removeItem = key => {
  __settings__[key] = null;
};

export default {
  setItem,
  setItem,
  removeItem,
};
