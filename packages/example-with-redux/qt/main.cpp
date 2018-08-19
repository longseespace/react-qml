#include "rq.h"

#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QQmlContext>
#include <QQuickStyle>

int main(int argc, char *argv[]) {
  QCoreApplication::setAttribute(Qt::AA_EnableHighDpiScaling);
  QGuiApplication app(argc, argv);

  // setup ReactQML helper
  qmlRegisterSingletonType<RQ>("ReactQML", 1, 0, "RQ", &RQ::qmlInstance);

  QQmlApplicationEngine engine;
  engine.addImportPath(QStringLiteral("qrc:/"));

// set debug mode as QML property
#ifdef DEBUG
  // load loader file
  engine.load(QUrl(QLatin1String("qrc:/loader_dev.qml")));
#else
  // load main file
  engine.load(QUrl(QLatin1String("qrc:/loader_prod.qml")));
#endif

  return app.exec();
}
