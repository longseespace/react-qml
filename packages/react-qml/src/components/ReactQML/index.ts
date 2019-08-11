import RedBox from './RedBox';
import Window from './Window/Window';
import MainWindow from './Window/MainWindow';

export * from './QtQuick';

// capture StandardKey and re-export
declare const StandardKey: any;
const $StandardKey = StandardKey;

export { RedBox, Window, MainWindow, $StandardKey as StandardKey };
export default { RedBox, Window, MainWindow, StandardKey };
