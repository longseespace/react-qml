import qmlSource from './App.qml';
import { createQmlComponent } from '@react-qml/renderer';

const App = createQmlComponent(qmlSource, 'App');

export default App;
