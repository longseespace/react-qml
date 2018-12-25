#![allow(non_snake_case)]

use qml::*;

#[derive(Default)]
pub struct ReactQml;

impl ReactQml {
    pub fn createTimer(&mut self)  -> Option<&QVariant> {
        None
    }
    pub fn createWebSocket(&mut self)  -> Option<&QVariant> {
        None
    }
}

Q_OBJECT!(
pub ReactQml as QReactQml {
    signals:
        fn reloadStarted();
        fn reloadFinished();
    slots:
        fn createTimer();
        fn createWebSocket();
    properties:
});

Q_REGISTERABLE_QML!(QReactQml: ReactQml as RQ 1=>0, from ReactQML);
