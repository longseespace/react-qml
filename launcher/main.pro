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

QMAKE_TARGET_COMPANY = Podzim
QMAKE_TARGET_PRODUCT = ReactQML Launcher
QMAKE_TARGET_COPYRIGHT = Copyright 2019 Podzim, Inc. All rights reserved.
TARGET = Launcher

HEADERS += \
    rq.h
