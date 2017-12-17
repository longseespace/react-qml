import QtQuick 2.7
import QtQuick.Controls 2.0
import QtQuick.Layouts 1.0
import QtWebSockets 1.0
import QtQuick.Window 2.2

Item {

  // props and signals
  property int devServerPort: 8081
  property string qmlFileName: "main.qml"
  property string bundleFileName: "macos.bundle.js"
  property bool liveReload: false
  property alias devWindowVisible: devwindow.visible
  // -----------------

  // loader
  Loader {
    source: 'http://localhost:'+devServerPort+'/'+qmlFileName+'?t='+Date.now()
    id: loader
    asynchronous: false

    function reload() {
      if (loader.status === Loader.Loading) {
        return console.log("Ignoring reload request, reload in progress");
      }

      source = "";
      __platform.clearCache();
      source = 'http://localhost:'+devServerPort+'/'+qmlFileName+'?t='+Date.now()

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

  ApplicationWindow {
    id: devwindow

    visible: true
    width: 320
    height: 480
    x: Screen.desktopAvailableWidth - width
    y: (Screen.desktopAvailableHeight - height) / 2

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

          onClicked: loader.reload();
        }

        Button {
          text: qsTr("Launch Debug DevTools")
          Layout.fillWidth: true
          anchors.horizontalCenter: parent.horizontalCenter

          onClicked: launchJsDevTools();
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
          executeApplicationScript();
        }
      }

      onTextMessageReceived: {
        console.log("WebSocket message:", message)
      }

      function prepareJSRuntime() {
        ws.sendTextMessage(JSON.stringify({ id: msgId, method: "prepareJSRuntime" }));
        msgId++;
      }

      function executeApplicationScript() {
        var scriptUrl = 'http://localhost:'+devServerPort+'/'+bundleFileName;
        ws.sendTextMessage(JSON.stringify({
          id: msgId,
          method: "executeApplicationScript",
          url: scriptUrl,
          inject: {}
        }));
        msgId++;
      }
    }

  }


  // functions

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

  function launchJsDevTools() {
    request('GET', 'http://localhost:'+devServerPort+'/launch-js-devtools');
  }

  function request(method, url, callback) {
    var xhr = new XMLHttpRequest();
    if (callback) {
      xhr.onreadystatechange = (function(myxhr) {
        return function() {
          callback(myxhr);
        }
      })(xhr);
    }
    xhr.open(method, url, true);
    xhr.send('');
  }

}
