import qmlSource from './Button.qml';
import { createQmlComponent } from '@react-qml/renderer';

const Button = createQmlComponent(qmlSource, 'Button');

export default Button;
