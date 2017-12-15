#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QQmlContext>
#include <QQuickStyle>

#include "platform.h"

int main(int argc, char *argv[]) {
  QCoreApplication::setAttribute(Qt::AA_EnableHighDpiScaling);
  QGuiApplication app(argc, argv);

  QQmlApplicationEngine engine;
  engine.addImportPath(QStringLiteral("qrc:/"));
  Platform platform(&engine);

  // expose C++ classes to QML
  engine.rootContext()->setContextProperty("__platform", &platform);

// set debug mode as QML property
#ifdef DEBUG
  // load loader file
  engine.load(QUrl(QLatin1String("qrc:/loader.qml")));
#else
  // load main file
  engine.load(QUrl(QLatin1String("qrc:/main.qml")));
#endif

  return app.exec();
}
