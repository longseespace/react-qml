QT += qml quick quickcontrols2 websockets

CONFIG += c++14

SOURCES += main.cpp
HEADERS += platform.h

CONFIG(debug, debug|release) {
  message("debug mode")
  DEFINES += DEBUG

  RESOURCES += debug.qrc
} else {
  message("release mode")

  RESOURCES += release.qrc
}
