import QtQuick 2.7
import QtQuick.Controls 2.0
import QtQuick.Controls.Material 2.0
import QtQuick.Layouts 1.0
import QtWebSockets 1.0
import QtQuick.Window 2.2
import Qt.labs.settings 1.0
import MaterialIcon 1.0

Item {

  // props and signals
  id: __qml_dev_root__

  property int devServerPort: 8081
  property string qmlFileName: "main.qml"
  property bool hotReload: true
  property alias devPopupVisible: devpopup.visible
  // -----------------

  // cmd+D
  Shortcut {
    enabled: true
    sequence: 'Ctrl+D'
    context: Qt.ApplicationShortcut
    onActivated: {
      if (devPopupVisible) {
        hideDevPopup();
      } else {
        showDevPopup();
      }
    }
  }

  Settings {
    id: __settings__

    property alias windowX: __window__.x
    property alias windowY: __window__.y

    property string accessToken
  }

  FontLoader {
    source: "/fonts/Roboto-Regular.ttf"
  }
  FontLoader {
    source: "/fonts/Roboto-Light.ttf"
  }
  MaterialIconLoader {}

  ApplicationWindow {
    id: __window__

    visible: true
    width: 1024
    height: 768

    // __app_loader__
    Loader {
      source: 'http://localhost:'+devServerPort+'/'+qmlFileName+'?t='+Date.now()
      id: __app_loader__
      asynchronous: false
    }

    Popup {
      id: devpopup
      visible: false
      closePolicy: Popup.NoAutoClose
      width: 300
      x: (__window__.width - width) - 32
      y: (__window__.height - height) - 32
      modal: false

      Material.elevation: 1

      ColumnLayout {
        anchors.fill: parent
        Layout.margins: 32
        spacing: 16

        Button {
          text: hotReload ? qsTr("Disable Hot Reloading") : qsTr("Enable Hot Reloading")
          Layout.fillWidth: true
          anchors.horizontalCenter: parent.horizontalCenter

          onClicked: {
            if (hotReload) {
              disableHotReload();
            } else {
              enableHotReload();
            }
          }
        }

      }
    }


    // websocket for HMR
    WebSocket {

      id: hotws
      url: 'ws://localhost:'+devServerPort+'/hot'
      active: hotReload

      onStatusChanged: {
        if (status === WebSocket.Error) {
          console.log("HMR WebSocker error:", errorString)
          return;
        }
        if (status === WebSocket.Open) {
          console.log("HMR WebSocker connected:", url)
        }
      }

      onTextMessageReceived: {
        console.log("HMR WebSocket message:", message)
      }
    }

    // ApplicationWindow
  }


  // functions

  function showDevPopup() {
    devPopupVisible = true;
  }

  function hideDevPopup() {
    devPopupVisible = false;
  }

  function disableHotReload() {
    hotReload = false;
  }

  function enableHotReload() {
    hotReload = true;
  }

}
