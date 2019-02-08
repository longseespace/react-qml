import { createRawQmlComponent } from '../../renderer';
import types from './qmltypes.json';

const generateQml = (type: string) => `import QtQuick.Controls 2.3; ${type} {}`;

const Module: { [key: string]: any } = {};

for (let index = 0; index < types.length; index++) {
  const definition = types[index];
  const { name, module, defaultProperty = 'data' } = definition;
  const tagName = `${module}.${name}`;
  Module[name] = createRawQmlComponent(generateQml(name), tagName, {
    defaultProp: defaultProperty,
  });
}

export const {
  CheckLabel,
  ColorImage,
  BusyIndicatorImpl,
  DialImpl,
  ProgressBarImpl,
  IconImage,
  IconLabel,
  MnemonicLabel,
  PaddedRectangle,
  PlaceholderText,
  TumblerView,
  AbstractButton,
  Action,
  ActionGroup,
  ApplicationWindow,
  BusyIndicator,
  Button,
  ButtonGroup,
  CheckBox,
  CheckDelegate,
  ComboBox,
  Container,
  Control,
  DelayButton,
  Dial,
  Dialog,
  DialogButtonBox,
  Drawer,
  Frame,
  GroupBox,
  ItemDelegate,
  Label,
  Menu,
  MenuBar,
  MenuBarItem,
  MenuItem,
  MenuSeparator,
  Page,
  PageIndicator,
  Pane,
  Popup,
  ProgressBar,
  RadioButton,
  RadioDelegate,
  RangeSlider,
  RoundButton,
  ScrollBar,
  ScrollIndicator,
  ScrollView,
  Slider,
  SpinBox,
  StackView,
  SwipeDelegate,
  SwipeView,
  Switch,
  SwitchDelegate,
  TabBar,
  TabButton,
  TextArea,
  TextField,
  ToolBar,
  ToolButton,
  ToolSeparator,
  ToolTip,
  Tumbler
} = Module;

export default Module;
