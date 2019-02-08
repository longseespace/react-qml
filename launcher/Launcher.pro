QT += quickcontrols2 websockets
android|ios|qnx|winrt|isEmpty(QT.widgets.name): CONFIG += no_desktop
!no_desktop: QT += widgets

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
  qtquickcontrolsapplication.h \
  ReactQML/rq.h


SOURCES += main.cpp \
  ReactQML/rq.cpp

RESOURCES += main.qrc
