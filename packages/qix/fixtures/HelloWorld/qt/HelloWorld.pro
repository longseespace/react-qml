QT += qml quick quickcontrols2

CONFIG += c++14

SOURCES += main.cpp
HEADERS += platform.h

RESOURCES += main.qrc

CONFIG(debug, debug|release) {
  message("debug mode")
  DEFINES += DEBUG
  QT += websockets
} else {
  message("release mode")
}
