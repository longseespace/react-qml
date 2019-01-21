import { createRawQmlComponent } from '../../../renderer';

const qml = `import QtQuick.Window 2.2; Window {}`;

const Window = createRawQmlComponent(qml, 'Window');

export { Window };
export default Window;
