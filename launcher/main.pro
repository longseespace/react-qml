QT += qml quick quickcontrols2 websockets

SOURCES += main.cpp \
    rq.cpp
RESOURCES += main.qrc

CONFIG(debug, debug|release) {
  message("debug mode")
  DEFINES += DEBUG
} else {
  message("release mode")
}

TARGET = Launcher

HEADERS += \
    rq.h
