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
};
