import QtQuick 2.7
import QtQuick.Layouts 1.3
import QtQuick.Controls 2.0
import QtQuick.Window 2.2
import QtQuick.Controls.Material 2.0
import MaterialIcon 1.0

ToolBar {
  id: toolbar

  property string leftButtonIcon
  property alias title: titleLabel.text
  signal leftButtonClicked()

  Material.foreground: "white"
  Material.background: Material.Indigo
  height: 50


  RowLayout {
    spacing: 20
    anchors.fill: parent

    ToolButton {
      id: leftButton

      contentItem: MaterialIcon {
        source: toolbar.leftButtonIcon
        size: 16
        color: 'white'
      }

      onClicked: {
        leftButtonClicked()
      }
    }

    Label {
      id: titleLabel
      font.pixelSize: 18
      font.family: "Roboto"

      elide: Label.ElideRight
      horizontalAlignment: Qt.AlignHCenter
      verticalAlignment: Qt.AlignVCenter
      Layout.fillWidth: true
    }

    Item {
      width: leftButton.width
    }
  }
}
