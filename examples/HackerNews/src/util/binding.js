export const centerInParent = {
  x: Qt.binding(function() {
    if (parent && this.width) {
      return (parent.width - this.width) / 2;
    }
    return 0;
  }),
  y: Qt.binding(function() {
    if (parent && this.height) {
      return (parent.height - this.height) / 2;
    }
    return 0;
  }),
};

export const centerInWindow = {
  x: Qt.binding(function() {
    if (__window__ && this.width) {
      return (__window__.width - this.width) / 2;
    }
    return 0;
  }),
  y: Qt.binding(function() {
    if (__window__ && this.height) {
      return (__window__.height - this.height) / 2;
    }
    return 0;
  }),
};

export const fillWindow = {
  x: 0,
  y: 0,
  width: Qt.binding(function() {
    if (typeof __window__ !== 'undefined' && __window__.width) {
      return __window__.width;
    }
    return 0;
  }),
  height: Qt.binding(function() {
    if (typeof __window__ !== 'undefined' && __window__.height) {
      return __window__.height;
    }
    return 0;
  }),
};

export const fillParent = {
  x: 0,
  y: 0,
  width: Qt.binding(function() {
    if (typeof parent !== 'undefined' && parent.width) {
      return parent.width;
    }
    return 0;
  }),
  height: Qt.binding(function() {
    if (typeof parent !== 'undefined' && parent.height) {
      return parent.height;
    }
    return 0;
  }),
};
