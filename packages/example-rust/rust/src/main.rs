#![allow(non_snake_case)]
extern crate qml;
use qml::*;

// mod rq;
// use rq::*;

fn main() {
    // RQ
    // Q_REGISTER_SINGLETON_QML!(QReactQml);

    // then load engine
    let mut engine = QmlEngine::new();
    engine.load_file("main.qml".into());
    engine.exec();

    engine.quit();
}
