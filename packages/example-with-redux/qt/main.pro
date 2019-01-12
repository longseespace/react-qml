QT += qml quick quickcontrols2 websockets

CONFIG += c++14

SOURCES += main.cpp
RESOURCES += main.qrc

CONFIG(debug, debug|release) {
  message("debug mode")
  DEFINES += DEBUG
} else {
  message("release mode")
  RESOURCES += dist/bundle.qrc
}

TARGET = WithRedux
