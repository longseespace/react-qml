#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QQmlContext>
#include <QQuickStyle>

int main(int argc, char *argv[]) {
  QCoreApplication::setAttribute(Qt::AA_EnableHighDpiScaling);
  QGuiApplication app(argc, argv);

  QQmlApplicationEngine engine;
  engine.addImportPath(QStringLiteral("qrc:/"));

  // load main file
  engine.load(QUrl(QLatin1String("qrc:/loader.qml")));

// set debug mode as QML property
#ifdef DEBUG
  engine.rootObjects().first()->setProperty("_DEBUG_MODE", true);
#else
  engine.rootObjects().first()->setProperty("_DEBUG_MODE", false);
#endif

  return app.exec();
}
