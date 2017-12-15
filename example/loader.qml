import QtQuick 2.7
import QtQuick.Controls 2.2
import QtQuick.Layouts 1.1
import QtQuick.Window 2.2
import QtWebSockets 1.0
import Qt.labs.settings 1.0
import QtQuick.Controls.Material 2.0

ApplicationWindow {
    id: window
    visible: true
    title: qsTr("BodiData Scanner")
    width: 1024
    height: 768
    // this is set from main.cpp
    property bool _DEBUG_MODE

    // main application content
    // in debug mode fetched from http, in production, builtin version is used
    Loader {
        id: loader
        source: _DEBUG_MODE ? "%1/index.qml".arg('http://localhost:44333') : "qrc:/index.qml"
        anchors.fill: parent
        asynchronous: false
        function reload() {
            if (loader.status === Loader.Loading) {
                return console.log("Ignoring reload request, reload in progress")
            }
            console.log("application reload")
            var src = source;
            source = "";
            __platform.clearCache();
            source = src;
            // restart websocket debug server
            wsDebugServer.active = false;
            wsDebugServer.active = true;
        }
    }
    // websocket client used for development
    WebSocket {
        id: wsDebugServer
        url: 'ws://127.0.0.1:44334'
        active: _DEBUG_MODE
        onStatusChanged: {
          console.log('status changed', status)
            if (status === WebSocket.Error) {
                console.log("WebSocker error:", errorString)
            }
        }
        onTextMessageReceived: {
            console.log("WebSocket message:", message)
            var msg = JSON.parse(message)
            if (msg.action === "reload") {
                loader.reload()
            }
        }
    }
}
