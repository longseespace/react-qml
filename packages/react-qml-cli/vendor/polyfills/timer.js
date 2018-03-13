function setupTimer(global) {
    'use strict';

    if (global.setTimeout ||
        global.clearTimeout ||
        global.setInterval ||
        global.clearInterval) {
        return;
    }

    var MAX_TIMER_COUNT = 100;
    var timerPool = [];
    var timers = {};
    var callbacks = {};
    var GUID = 0;

    function createTimer() {
        if (timerPool.length !== 0)
            return timerPool.pop();

        if (RQ) {
          return RQ.createTimer();
        }
        return Qt.createQmlObject('import QtQml 2.2; Timer {}', Qt.application);
    }

    function insertTimer(timer) {
        timers[++GUID] = timer;
        return GUID;
    }

    function removeTimer(timerId) {
        var timer    = timers[timerId],
            callback = callbacks[timerId];
        if (timer) {
            delete timers[timerId];
            delete callbacks[timerId];
            timer.stop();
            timer.triggered.disconnect(callback);
            if (timerPool.length < MAX_TIMER_COUNT)
                timerPool.push(timer);
            else
                timer.destroy();
        }
    }

    function setTimeout(callback, delay) {
        var timer   = createTimer(),
            timerId = insertTimer(timer),
            args    = Array.prototype.slice.call(arguments, 2);
        function callbackWrapper() {
            removeTimer(timerId);
            callback.apply(undefined, args);
        }
        callbacks[timerId] = callbackWrapper;
        timer.interval = delay || 1; // timer.interval should not be 0 (qt bug?)
        timer.triggered.connect(callbackWrapper);
        timer.start();
        return timerId;
    }

    function clearTimeout(timerId) {
        removeTimer(timerId);
    }

    function setInterval(callback, delay) {
        var timer   = createTimer(),
            timerId = insertTimer(timer),
            args    = Array.prototype.slice.call(arguments, 2);
        function callbackWrapper() {
            callback.apply(undefined, args);
        }
        callbacks[timerId] = callbackWrapper;
        timer.interval = delay || 1; // timer.interval should not be 0 (qt bug?)
        timer.repeat = true;
        timer.triggered.connect(callbackWrapper);
        timer.start();
        return timerId;
    }

    function clearInterval(timerId) {
        removeTimer(timerId);
    }

    global.setTimeout    = setTimeout;
    global.clearTimeout  = clearTimeout;
    global.setInterval   = setInterval;
    global.clearInterval = clearInterval;

};


if (typeof module !== 'undefined') {
  module.exports = setupTimer;
} else {
  setupTimer(global);
}
