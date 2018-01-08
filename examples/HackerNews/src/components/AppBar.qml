import QtQuick 2.7
import QtQuick.Layouts 1.3
import QtQuick.Controls 2.0
import QtQuick.Window 2.2
import QtQuick.Controls.Material 2.0

ToolBar {
  property alias backIcon: backButtonImage.source
  property alias title: titleLabel.text
  signal backButtonClicked()

  Material.foreground: "white"
  Material.background: Material.Indigo
  height: 50


  RowLayout {
    spacing: 20
    anchors.fill: parent

    ToolButton {
      id: backButton

      contentItem: Image {
        id: backButtonImage

        horizontalAlignment: Image.AlignHCenter
        verticalAlignment: Image.AlignVCenter
        fillMode: Image.Pad
        sourceSize.width: 16
        sourceSize.height: 16
      }
      onClicked: {
        backButtonClicked()
      }
    }

    Label {
      id: titleLabel
      font.pixelSize: 20

      elide: Label.ElideRight
      horizontalAlignment: Qt.AlignHCenter
      verticalAlignment: Qt.AlignVCenter
      Layout.fillWidth: true
    }

    Item {
      width: backButton.width
    }
  }
}
