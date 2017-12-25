import QtQuick 2.7
import QtQuick.Controls 2.0
import QtQuick.Layouts 1.0
import QtWebSockets 1.0
import QtQuick.Window 2.2

Item {

  // props and signals
  id: __qml_dev_root__

  signal reloading()
  signal reloaded()

  property int devServerPort: 8081
  property string qmlFileName: "main.qml"
  property string bundleFileName: "macos.bundle.js"
  property bool liveReload: false
  property bool hotReload: false
  property bool debugJs: false
  property alias devWindowVisible: devwindow.visible
  // -----------------

  // __app_loader__
  Loader {
    source: 'http://localhost:'+devServerPort+'/'+qmlFileName+'?t='+Date.now()
    id: __app_loader__
    asynchronous: false

    function reload() {
      if (__app_loader__.status === Loader.Loading) {
        return console.log("Ignoring reload request, reload in progress");
      }

      __qml_dev_root__.reloading();

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

      __qml_dev_root__.reloaded();
    }
  }

  // cmd+R
  Shortcut {
    enabled: true
    sequence: StandardKey.Refresh
    context: Qt.ApplicationShortcut
    onActivated: __app_loader__.reload()
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

          onClicked: __app_loader__.reload();
        }

        Button {
          text: debugJs ? qsTr("Disable JS Debugging") : qsTr("Debug JS Remotely")
          Layout.fillWidth: true
          anchors.horizontalCenter: parent.horizontalCenter

          onClicked: {
            if (debugJs) {
              disableDebugging();
            } else {
              enableDebugging();
            }
          }
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

    // websocket client used for development
    WebSocket {

      property int msgId: 10000

      id: ws
      url: 'ws://localhost:'+devServerPort+'/debugger-proxy?role=client'
      active: false

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

  function disableHotReload() {
    hotReload = false;
  }

  function enableHotReload() {
    hotReload = true;
  }

  function disableDebugging() {
    debugJs = false;
    ws.active = false;
  }

  function enableDebugging() {
    debugJs = true;

    request('GET', 'http://localhost:'+devServerPort+'/launch-js-devtools', function() {
      ws.active = true;
    });
  }

  function liveReloadSubscribe() {
    console.log('liveReloadSubscribe');
    request('GET', 'http://localhost:'+devServerPort+'/onchange', function(xhr) {
      if (xhr.readyState === 4) {
        if (liveReload) {
          __app_loader__.reload();
        }
      }
    });
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
