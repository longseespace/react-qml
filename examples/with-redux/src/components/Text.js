import qmlSource from './Text.qml';
import { createQmlComponent } from '@react-qml/renderer';

const Text = createQmlComponent(qmlSource, 'Text');

export default Text;
