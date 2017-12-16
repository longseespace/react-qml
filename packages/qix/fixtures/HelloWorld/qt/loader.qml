import QtQuick 2.7
import QtQuick.Controls 2.0
import QtQuick.Layouts 1.0
import QtWebSockets 1.0
import QtQuick.Window 2.2

ApplicationWindow {
  // props and signals
  property int devServerPort: 8081
  property string bundleFileName: "main.qml"
  property bool liveReload: false
  property bool devWindowVisible: false
  // -----------------

  visible: true
  id: devwindow

  width: devWindowVisible ? 320 : 1;
  height: devWindowVisible ? 480 : 1;
  x: devWindowVisible ? Screen.desktopAvailableWidth - width : 0;
  y: devWindowVisible ? (Screen.desktopAvailableHeight - height) / 2 : 0;

  Popup {
    visible: true
    closePolicy: Popup.NoAutoClose
    width: 300
    x: (devwindow.width - width) / 2
    y: (devwindow.height - height) / 2
    modal: false

    ColumnLayout {
      anchors.fill: parent
      Layout.margins: 32
      spacing: 16

      Button {
        text: qsTr("Reload")
        Layout.fillWidth: true
        anchors.horizontalCenter: parent.horizontalCenter

        onClicked: {
          loader.reload();
        }
      }

      Button {
        text: qsTr("Debug in Chrome")
        Layout.fillWidth: true
        anchors.horizontalCenter: parent.horizontalCenter
      }

      Button {
        text: qsTr("Debug in Safari")
        Layout.fillWidth: true
        anchors.horizontalCenter: parent.horizontalCenter
      }

      Button {
        text: qsTr("Inspect Element")
        Layout.fillWidth: true
        anchors.horizontalCenter: parent.horizontalCenter
      }

      Button {
        text: liveReload ? qsTr("Disable Live Reload") : qsTr("Enable Live Reload")
        Layout.fillWidth: true
        anchors.horizontalCenter: parent.horizontalCenter

        onClicked: {
          if (liveReload) {
            disableLiveReload();
          } else {
            enableLiveReload();
          }
        }
      }

      Button {
        text: qsTr("Hide Dev Window")
        Layout.fillWidth: true
        anchors.horizontalCenter: parent.horizontalCenter

        onClicked: hideDevWindow()
      }

    }
  }

  // loader
  Loader {
    source: 'http://localhost:'+devServerPort+'/'+bundleFileName+'?t='+Date.now()
    id: loader
    asynchronous: false

    function reload() {
      if (loader.status === Loader.Loading) {
        return console.log("Ignoring reload request, reload in progress");
      }

      source = "";
      __platform.clearCache();
      source = 'http://localhost:'+devServerPort+'/'+bundleFileName+'?t='+Date.now()

      console.log("application reload", source);

      // restart websocket
      ws.active = false;
      ws.active = true;

      // resubscribe to liveReload
      if (liveReload) {
        liveReloadSubscribe();
      }
    }
  }

  // cmd+R
  Shortcut {
    enabled: true
    sequence: StandardKey.Refresh
    context: Qt.ApplicationShortcut
    onActivated: loader.reload()
  }

  // cmd+D
  Shortcut {
    enabled: true
    sequence: 'Ctrl+D'
    context: Qt.ApplicationShortcut
    onActivated: {
      if (devWindowVisible) {
        hideDevWindow();
      } else {
        showDevWindow();
      }
    }
  }

  // websocket client used for development
  WebSocket {

    property int msgId: 10000

    id: ws
    url: 'ws://localhost:'+devServerPort+'/debugger-proxy?role=client'
    active: true

    onStatusChanged: {
      if (status === WebSocket.Error) {
        console.log("WebSocker error:", errorString)
        return;
      }
      if (status === WebSocket.Open) {
        console.log("WebSocker connected:", url)
        prepareJSRuntime();
      }
    }

    onTextMessageReceived: {
      console.log("WebSocket message:", message)
    }

    function prepareJSRuntime() {
      ws.sendTextMessage(JSON.stringify({ id: msgId, "method": "prepareJSRuntime" }));
      msgId++;
    }
  }

  function showDevWindow() {
    devWindowVisible = true;
  }

  function hideDevWindow() {
    devWindowVisible = false;
  }

  function disableLiveReload() {
    liveReload = false;
  }

  function enableLiveReload() {
    liveReload = true;
    liveReloadSubscribe();
  }

  function liveReloadSubscribe() {
    console.log('liveReloadSubscribe');
    request('GET', 'http://localhost:'+devServerPort+'/onchange', function(xhr) {
      if (xhr.readyState === 4) {
        if (liveReload) {
          loader.reload();
        }
      }
    });
  }

  // fns
  function request(method, url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = (function(myxhr) {
      return function() {
        callback(myxhr);
      }
    })(xhr);
    xhr.open(method, url, true);
    xhr.send('');
  }

}
