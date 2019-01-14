import QtQuick 2.10
import QtQuick.Controls 2.3
import QtQuick.Layouts 1.0
import QtQuick.Window 2.2
import QtQuick.Dialogs 1.3
import QtQuick.LocalStorage 2.0
import QtQuick.Particles 2.0
import QtWebSockets 1.0
import Qt.labs.settings 1.0
import Qt.labs.calendar 1.0

ApplicationWindow {
  id: __window__

  visible: true
  width: 400
  height: 500

  flags: Qt.Window

  Settings {
    id: __settings__

    property alias windowX: __window__.x
    property alias windowY: __window__.y
    property alias windowWidth: __window__.width
    property alias windowHeight: __window__.height
    property string entry: 'http://localhost:8081/index.qml'
    property bool supportHMR: true
    property string hmrUrl: 'ws://localhost:8081/hot'
  }

  Loader {
    id: __app_loader__
    asynchronous: true

    source: __settings__.entry

    onStatusChanged: {
      if (__app_loader__.status === Loader.Error) {
        console.error("Failed to load entry url");
        errorDialog.open();
      }
    }
  }

  MessageDialog {
    id: errorDialog
    title: "Error"
    icon: StandardIcon.Critical
    text: "Failed to load entry url."
    informativeText: "Failed to load: " + __settings__.entry
    standardButtons: StandardButton.Retry | StandardButton.Abort
    onRejected: {
      Qt.quit()
    }
    onAccepted: {
      __app_loader__.active = false;
      __app_loader__.active = true;
    }
  }

  // websocket for HMR
  WebSocket {
    id: __hot_ws__
    url: __settings__.hmrUrl
    active: __settings__.supportHMR

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
}
