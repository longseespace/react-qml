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

  // load main file
  engine.load(QUrl(QLatin1String("qrc:/loader.qml")));

// set debug mode as QML property
#ifdef DEBUG
  engine.rootObjects().first()->setProperty("__DEBUG__", true);
#else
  engine.rootObjects().first()->setProperty("__DEBUG__", false);
#endif

  return app.exec();
}
