#include "rq.h"

#include <QtCore>
#include <QtDebug>

QObject *RQ::qmlInstance(QQmlEngine *engine, QJSEngine *scriptEngine) {
  Q_UNUSED(scriptEngine)

  RQ *rq = new RQ(engine);
  return rq;
}

RQ::RQ(QQmlEngine *engine)
    : m_engine(engine), m_nam(new RQNetworkAccessManagerFactory()) {
  // timer context
  m_timer_context = new QQmlContext(m_engine->rootContext());
  m_timer_component = new QQmlComponent(m_engine);
  m_timer_component->setData("import QtQml 2.2; Timer {}", QUrl());

  // ws context
  m_ws_context = new QQmlContext(m_engine->rootContext());
  m_ws_component = new QQmlComponent(m_engine);
  m_ws_component->setData("import QtWebSockets 1.1; WebSocket {}", QUrl());

  // error handling
  connect(m_engine, &QQmlEngine::warnings, this, &RQ::onQmlWarnings);

  // disk cache
  engine->setNetworkAccessManagerFactory(m_nam);
}

RQ::~RQ() {
  delete m_timer_context;
  delete m_timer_component;
  delete m_ws_context;
  delete m_ws_component;
}

void RQ::clearCache() { m_engine->trimComponentCache(); }

QObject *RQ::createTimer() {
  QObject *timer = m_timer_component->create(m_timer_context);
  QQmlEngine::setObjectOwnership(timer, QQmlEngine::JavaScriptOwnership);
  return timer;
}

QObject *RQ::createWebSocket() {
  QObject *ws = m_ws_component->create(m_ws_context);
  QQmlEngine::setObjectOwnership(ws, QQmlEngine::JavaScriptOwnership);
  return ws;
}

void RQ::onQmlWarnings(const QList<QQmlError> &warnings) {
  QVariantList list;
  foreach (QQmlError warning, warnings) {
    QVariantMap item;
    item.insert("messageType", warning.messageType());
    item.insert("column", warning.column());
    item.insert("line", warning.line());
    item.insert("description", warning.description());
    item.insert("isValid", warning.isValid());
    item.insert("url", warning.url());
    // alias for JS Error-compat
    item.insert("message", warning.description());
    item.insert("fileName", warning.url().toString());
    item.insert("columnNumber", warning.column());
    item.insert("lineNumber", warning.line());
    list.append(item);
  }

  emit this->errors(list);
}

// qml registration
void registerRQ() {
  qmlRegisterSingletonType<RQ>("ReactQML", 1, 0, "RQ", &RQ::qmlInstance);
}

Q_COREAPP_STARTUP_FUNCTION(registerRQ)
