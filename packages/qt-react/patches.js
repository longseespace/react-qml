module.exports = {
  'QtQuick.Controls.Popup': {
    defaultProp: 'contentData',
    customDeps: ['QtQuick.Layouts'],
    customQml: `
    property alias children: content.data;

    contentItem: ColumnLayout {
      id: content;
    }
    `,
  },
  'QtQuick.Controls.Pane': {
    defaultProp: 'contentData',
    customDeps: ['QtQuick.Layouts'],
    customQml: `
    property alias children: content.data;

    contentItem: ColumnLayout {
      id: content;
    }
    `,
  },
  'QtQuick.Controls.ApplicationWindow': {
    defaultProp: 'contentData',
    customDeps: ['QtQuick.Layouts'],
    customQml: `
    property alias children: content.data;

    contentItem: ColumnLayout {
      id: content;
    }
    `,
  },
  'QtQuick.Controls.Container': {
    defaultProp: 'contentData',
  },
  'QtQuick.Controls.Dialog': {
    defaultProp: 'contentData',
    customDeps: ['QtQuick.Layouts'],
    customQml: `
    property alias children: content.data;

    contentItem: ColumnLayout {
      id: content;
    }
    `,
  },
  'QtQuick.Controls.DialogButtonBox': {
    defaultProp: 'contentData',
  },
  'QtQuick.Controls.Drawer': {
    defaultProp: 'contentData',
    customDeps: ['QtQuick.Layouts'],
    customQml: `
    property alias children: content.data;

    contentItem: ColumnLayout {
      id: content;
    }
    `,
  },
  'QtQuick.Controls.Frame': {
    defaultProp: 'contentData',
    customDeps: ['QtQuick.Layouts'],
    customQml: `
    property alias children: content.data;

    contentItem: ColumnLayout {
      id: content;
    }
    `,
  },
  'QtQuick.Controls.GroupBox': {
    defaultProp: 'contentData',
    customDeps: ['QtQuick.Layouts'],
    customQml: `
    property alias children: content.data;

    contentItem: ColumnLayout {
      id: content;
    }
    `,
  },
  'QtQuick.Controls.Menu': {
    defaultProp: 'contentData',
    customDeps: ['QtQuick.Layouts'],
    customQml: `
    property alias children: content.data;

    contentItem: ColumnLayout {
      id: content;
    }
    `,
  },
  'QtQuick.Controls.MenuBar': {
    defaultProp: 'contentData',
    customDeps: ['QtQuick.Layouts'],
    customQml: `
    property alias children: content.data;

    contentItem: ColumnLayout {
      id: content;
    }
    `,
  },
  'QtQuick.Controls.Page': {
    defaultProp: 'contentData',
    customDeps: ['QtQuick.Layouts'],
    customQml: `
    property alias children: content.data;

    contentItem: ColumnLayout {
      id: content;
    }
    `,
  },
  'QtQuick.Controls.ScrollView': {
    defaultProp: 'contentData',
  },
  'QtQuick.Controls.SwipeView': {
    defaultProp: 'contentData',
  },
  'QtQuick.Controls.TabBar': {
    defaultProp: 'contentData',
  },
  'QtQuick.Controls.ToolBar': {
    defaultProp: 'contentData',
    customDeps: ['QtQuick.Layouts'],
    customQml: `
    property alias children: content.data;

    contentItem: ColumnLayout {
      id: content;
    }
    `,
  },
  'QtQuick.Controls.ToolTip': {
    defaultProp: 'contentData',
    customDeps: ['QtQuick.Layouts'],
    customQml: `
    property alias children: content.data;

    contentItem: ColumnLayout {
      id: content;
    }
    `,
  },
};
