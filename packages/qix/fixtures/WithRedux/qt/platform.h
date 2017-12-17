#ifndef PLATFORM_H
#define PLATFORM_H

#include <QDebug>
#include <QObject>
#include <QPointer>
#include <QQmlApplicationEngine>

#ifdef Q_OS_ANDROID
#include <QtAndroidExtras>
#endif

class Platform : public QObject {
  Q_OBJECT

public slots:
  Q_INVOKABLE bool isDebug() {
#ifdef DEBUG
    return true;
#endif

    return false;
  }

  Q_INVOKABLE void clearCache() { m_engine->clearComponentCache(); }

  Q_INVOKABLE void setOrientation(int orientation) {
#ifdef Q_OS_ANDROID

    QAndroidJniObject activity = QtAndroid::androidActivity();
    if (activity.isValid())
      activity.callMethod<void>("setRequestedOrientation", "(I)V", orientation);

#elif defined(Q_OS_IOS)

#else
    Q_UNUSED(orientation);

#endif
  }

public:
  Platform(QQmlApplicationEngine *engine) : m_engine(engine) {}

private:
  QPointer<QQmlApplicationEngine> m_engine;
};

#endif // PLATFORM_H
