import { createRawQmlComponent } from '../../../renderer';

const qml = `import QtQuick.Window 2.2; Window { visible: true; }`;

const Window = createRawQmlComponent(qml, 'window');

export { Window };
export default Window;
