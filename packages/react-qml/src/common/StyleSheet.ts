export type FontProps = {
  fontSize?: number;
  fontFamily?: string;
  fontStyle?: 'normal' | 'italic';
  fontWeight?:
    | 'normal'
    | 'bold'
    | 100
    | 200
    | 300
    | 400
    | 500
    | 600
    | 700
    | 800
    | 900;
};

export type TextStyleProps = FontProps & {
  color?: string;
  lineHeight?: number;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  textAlignVertical?: 'auto' | 'top' | 'bottom' | 'center';
  letterSpacing?: number;
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
};

export type ItemProps = {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  z?: number;
  implicitWidth?: number;
  implicitHeight?: number;
  opacity?: number;
  visible?: boolean;
  clip?: boolean;
  antialiasing?: boolean;
  baselineOffset?: number;
};

export type TransformProps = {
  scale?: number;
  rotation?: number;
};

export type LayoutProps = {
  alignment?: number | string;
  minimumWidth?: number;
  minimumHeight?: number;
  preferredWidth?: number;
  preferredHeight?: number;
  maximumWidth?: number;
  maximumHeight?: number;
  fillHeight?: number;
  fillWidth?: number;
  row?: number;
  rowSpan?: number;
  columnSpan?: number;
  margins?: number;
  leftMargin?: number;
  topMargin?: number;
  rightMargin?: number;
  bottomMargin?: number;
};

export type Style = TextStyleProps &
  ItemProps &
  TransformProps &
  LayoutProps & { [key: string]: any };

const FONT_WEIGHT_MAP: { [key: string]: number } = {
  normal: 50,
  bold: 75,
  '100': 0,
  '200': 12,
  '300': 25,
  '400': 50,
  '500': 57,
  '600': 63,
  '700': 75,
  '800': 81,
  '900': 87,
};
function getFontWeight(value: string) {
  if (Object.keys(FONT_WEIGHT_MAP).indexOf(value) > -1) {
    return FONT_WEIGHT_MAP[value];
  }
  return 400;
}

const FONT_CAPITALIZATION_MAP: { [key: string]: string } = {
  none: 'MixedCase',
  uppercase: 'AllUppercase',
  lowercase: 'AllLowercase',
  capitalize: 'Capitalize',
};
function getFontCapitalization(value: string) {
  if (Object.keys(FONT_CAPITALIZATION_MAP).indexOf(value) > -1) {
    return FONT_CAPITALIZATION_MAP[value];
  }
  return 'MixedCase';
}

const TEXT_ALIGN_MAP: { [key: string]: string } = {
  left: 'AlignLeft',
  right: 'AlignRight',
  center: 'AlignHCenter',
  justify: 'AlignJustify',
};
function getTextAlignment(value: string) {
  if (Object.keys(TEXT_ALIGN_MAP).indexOf(value) > -1) {
    return TEXT_ALIGN_MAP[value];
  }
  return undefined;
}

const TEXT_ALIGN_VERTICAL_MAP: { [key: string]: string } = {
  top: 'AlignTop',
  bottom: 'AlignBottom',
  center: 'AlignVCenter',
};
function getTextAlignmentVertical(value: string) {
  if (Object.keys(TEXT_ALIGN_VERTICAL_MAP).indexOf(value) > -1) {
    return TEXT_ALIGN_VERTICAL_MAP[value];
  }
  return undefined;
}

const LAYOUT_MAP: { [key: string]: string } = {
  alignment: 'alignment',
  minimumWidth: 'minimumWidth',
  minWidth: 'minimumWidth',
  minimumHeight: 'minimumHeight',
  minHeight: 'minimumHeight',
  preferredWidth: 'preferredWidth',
  preferredHeight: 'preferredHeight',
  maximumWidth: 'maximumWidth',
  maxWidth: 'maximumWidth',
  maximumHeight: 'maximumHeight',
  maxHeight: 'maximumHeight',
  fillHeight: 'fillHeight',
  fillWidth: 'fillWidth',
  row: 'row',
  rowSpan: 'rowSpan',
  columnSpan: 'columnSpan',
  margins: 'margins',
  margin: 'margins',
  leftMargin: 'leftMargin',
  marginLeft: 'leftMargin',
  topMargin: 'topMargin',
  marginTop: 'topMargin',
  rightMargin: 'rightMargin',
  marginRight: 'rightMargin',
  bottomMargin: 'bottomMargin',
  marginBottom: 'bottomMargin',
};

export function flattenStyle(style: any) {
  if (style === null || typeof style !== 'object') {
    return undefined;
  }

  if (!Array.isArray(style)) {
    return style;
  }

  const result: { [key: string]: string } = {};
  for (let i = 0, styleLength = style.length; i < styleLength; ++i) {
    const computedStyle = flattenStyle(style[i]);
    if (computedStyle) {
      for (const key in computedStyle) {
        result[key] = computedStyle[key];
      }
    }
  }
  return result;
}

export function mapStyleToProps(style: Style): Qml.QmlProps {
  // no validation, for now
  let props: any = {};
  let font: Qml.QmlFontProps = {};
  let Layout: any = {};
  for (const styleName in style) {
    const styleValue = style[styleName];

    if (Object.keys(LAYOUT_MAP).indexOf(styleName) > -1) {
      const layoutKey = LAYOUT_MAP[styleName];
      Layout[layoutKey] = style[styleName];
      continue;
    }

    switch (styleName) {
      case 'fontSize':
        font.pointSize = styleValue;
        break;
      case 'fontFamily':
        font.family = styleValue;
        break;
      case 'fontStyle':
        if (styleValue === 'italic') {
          font.italic = true;
        }
        break;
      case 'fontWeight':
        font.weight = getFontWeight(String(styleValue));
        break;
      case 'textAlign':
        props.horizontalAlignment = getTextAlignment(String(styleValue));
        break;
      case 'textAlignVertical':
        props.verticalAlignment = getTextAlignmentVertical(String(styleValue));
        break;
      case 'textTransform':
        font.capitalization = getFontCapitalization(String(styleValue));
        break;

      default:
        // passthrough
        props[styleName] = styleValue;
        break;
    }
  }

  return {
    ...props,
    Layout,
    font,
  };
}

const isEmpty = (obj: object) =>
  Object.keys(obj).length === 0 && obj.constructor === Object;

export function setStyle(qmlElement: Qml.QmlElement, style: Style) {
  const flatStyle = flattenStyle(style);
  const { Layout, font, ...props } = mapStyleToProps(flatStyle);

  if (!isEmpty(font)) {
    for (const fontPropName in font) {
      if (qmlElement.font.hasOwnProperty(fontPropName)) {
        qmlElement.font[fontPropName] = font[fontPropName];
      }
    }
  }

  if (!isEmpty(Layout)) {
    for (const layoutPropName in Layout) {
      if (qmlElement.Layout.hasOwnProperty(layoutPropName)) {
        qmlElement.Layout[layoutPropName] = Layout[layoutPropName];
      }
    }
  }

  for (const propName in props) {
    if (qmlElement.hasOwnProperty(propName)) {
      qmlElement[propName] = props[propName];
    }
  }
}

export default {
  flattenStyle,
  mapStyleToProps,
  setStyle,
};
