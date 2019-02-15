import QtQuick 2.10
import QtQuick.Controls 2.3
import QtQuick.Layouts 1.0
import QtQuick.Window 2.2
import QtQuick.Dialogs 1.1
import QtWebSockets 1.0
import Qt.labs.settings 1.0
import ReactQML 1.0

ApplicationWindow {
  id: __devWindow

  visible: false
  width: 400
  height: 500

  flags: Qt.Window

  Settings {
    id: __devSettings

    property alias windowX: __devWindow.x
    property alias windowY: __devWindow.y
    property alias windowWidth: __devWindow.width
    property alias windowHeight: __devWindow.height
    property string entry: 'http://localhost:8081/index.qml'
    property bool supportHMR: true
    property string hmrUrl: 'ws://localhost:8081/hot'

    Component.onCompleted: {
      // load main component
      __appLoader.active = true;
    }
  }

  Loader {
    id: __appLoader
    asynchronous: true
    active: false

    source: __devSettings.entry

    onStatusChanged: {
      if (__appLoader.status === Loader.Error) {
        console.error("Failed to load entry url");
        errorDialog.open();
      }
    }

    // leaks, use with cautions!
    function reload() {
      var qmlSource = __appLoader.source;
      __appLoader.source = '';
      RQ.clearCache();
      __appLoader.source = qmlSource;
    }
  }

  Shortcut {
    sequence: "Ctrl+Shift+R"
    onActivated: __appLoader.reload()
    context: Qt.ApplicationShortcut
  }

  MessageDialog {
    id: errorDialog
    title: "Error"
    icon: StandardIcon.Warning
    text: "Failed to load entry url."
    informativeText: "Failed to load " + __devSettings.entry
    onAccepted: {
      Qt.quit();
    }
  }

  // websocket for HMR
  WebSocket {
    id: __hotWs
    url: __devSettings.hmrUrl
    active: __devSettings.supportHMR

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
