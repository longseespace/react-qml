import RedBox from './RedBox';
import Window from './Window/Window';

export * from './QtQuick';

// capture StandardKey and re-export
declare const StandardKey: any;
const $StandardKey = StandardKey;

export { RedBox, Window, $StandardKey as StandardKey };
export default { RedBox, Window, StandardKey };
