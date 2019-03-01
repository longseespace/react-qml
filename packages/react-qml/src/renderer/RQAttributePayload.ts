import RQElementContainer from './RQElementContainer';
import StyleSheet from '../common/StyleSheet';
import Anchor, {
  isAnchorProp,
  AnchorRef,
  ParentAnchor,
  AnchorRefProp,
} from '../common/Anchor';
import { inspect } from 'util';

type BasicProps = { [key: string]: any };

// QML signal handler convention
const qmlSignalRegex = /^on([A-Z][a-zA-Z]+)$/;

// Calculate the diff between the two objects.
export function diffProps(
  lastProps: BasicProps,
  nextProps: BasicProps
): Array<any> | null {
  let updatePayload: Array<any> = [];

  // phase 1: look for deleted props
  for (const propKey in lastProps) {
    if (
      lastProps[propKey] == null ||
      !lastProps.hasOwnProperty(propKey) ||
      nextProps.hasOwnProperty(propKey)
    ) {
      continue;
    }

    updatePayload.push(propKey, undefined);
  }

  // phase 2: look for actual changes
  for (const propKey in nextProps) {
    const nextPropValue = nextProps[propKey];
    const lastPropValue = lastProps != null ? lastProps[propKey] : undefined;

    if (!nextProps.hasOwnProperty(propKey) || nextPropValue === lastPropValue) {
      continue;
    }

    // event handling
    const matches = propKey.match(qmlSignalRegex);
    const isEventProp = matches && lastPropValue !== nextPropValue;
    const isAnchorsProp = propKey === 'anchors';
    const isAnchorRefProp = propKey === 'anchorRef';
    const isStyleProp = propKey === 'style';

    // attached property or group props
    // eg: Layout, Material, layer etc.
    const isObjectProp = typeof nextPropValue === 'object';

    if (
      isEventProp ||
      isAnchorsProp ||
      isAnchorRefProp ||
      isStyleProp ||
      isObjectProp
    ) {
      updatePayload.push(propKey, [lastPropValue, nextPropValue]);
      continue;
    }

    // flat prop
    updatePayload.push(propKey, nextPropValue);
  }

  return updatePayload.length === 0 ? null : updatePayload;
}

type EventHandler = () => void;

function listenTo(
  qmlElement: Qml.QmlElement,
  eventName: string,
  nextHandler: EventHandler | null,
  lastHandler: EventHandler | null
) {
  eventName = eventName[0].toLowerCase() + eventName.substring(1);
  console.log('listenTo', qmlElement, eventName, nextHandler);

  if (!qmlElement[eventName]) {
    console.warn(`Event "${eventName}" not found in ${qmlElement}`);
    return;
  }

  if (lastHandler) {
    qmlElement[eventName].disconnect(lastHandler);
  }

  if (nextHandler) {
    qmlElement[eventName].connect(nextHandler);
  }
}

// handle connections
function handleAnchors(
  qmlElement: Qml.QmlElement,
  lastAnchors: BasicProps | null,
  nextAnchors: BasicProps | null
) {
  // last anchors
  for (const propName in lastAnchors) {
    if (lastAnchors.hasOwnProperty(propName)) {
      if (isAnchorProp(propName)) {
        const anchorRef: AnchorRef | string = lastAnchors[propName];
        if (typeof anchorRef === 'string') {
          ParentAnchor.removeSubscription(qmlElement, <AnchorRefProp>propName);
          qmlElement.anchors[propName] = undefined;
          continue;
        }
        if (anchorRef) {
          anchorRef.removeSubscription(qmlElement, <AnchorRefProp>propName);
        }
        // unset anchor
        qmlElement.anchors[propName] = undefined;
      }
    }
  }
  // next anchors
  for (const propName in nextAnchors) {
    if (nextAnchors.hasOwnProperty(propName)) {
      if (isAnchorProp(propName)) {
        const anchorRef: AnchorRef | string = nextAnchors[propName];
        if (typeof anchorRef === 'string') {
          ParentAnchor.addSubscription(
            qmlElement,
            <AnchorRefProp>propName,
            anchorRef
          );
          continue;
        }
        if (anchorRef) {
          // anchor, set value when anchor ready
          anchorRef.addSubscription(qmlElement, <AnchorRefProp>propName);
        } else {
          // unset anchor
          qmlElement.anchors[propName] = undefined;
        }
      } else {
        // primitive, set values right away
        const propValue = nextAnchors[propName];
        qmlElement.anchors[propName] = propValue;
      }
    }
  }
}

// handle anchor ref
function handleAnchorRef(
  qmlElement: Qml.QmlElement,
  lastRef: Anchor | null,
  nextRef: Anchor | null
) {
  // TODO: handle last ref
  if (nextRef) {
    nextRef.setQmlElement(qmlElement);
  }
}

function handleStyle(
  qmlElement: Qml.QmlElement,
  lastStyle: BasicProps | BasicProps[] | null,
  nextStyle: BasicProps | BasicProps[] | null
) {
  // last style
  const nextFlatStyle = StyleSheet.flattenStyle(nextStyle);
  let finalStyle = nextFlatStyle;
  if (lastStyle) {
    const lastFlatStyle = StyleSheet.flattenStyle(lastStyle);
    for (let styleName in lastFlatStyle) {
      if (!nextFlatStyle.hasOwnProperty(styleName)) {
        // unset
        finalStyle[styleName] = undefined;
      }
    }
  }

  StyleSheet.setStyle(qmlElement, finalStyle);
}

function handleGroupProps(
  qmlElement: Qml.QmlElement,
  group: string,
  lastProps: BasicProps | null,
  nextProps: BasicProps
) {
  // phase 1: look for deleted props
  for (const propKey in lastProps) {
    if (
      lastProps[propKey] == null ||
      !lastProps.hasOwnProperty(propKey) ||
      nextProps.hasOwnProperty(propKey)
    ) {
      continue;
    }

    qmlElement[group][propKey] = undefined;
  }

  // phase 2: look for actual changes
  for (const propKey in nextProps) {
    const nextPropValue = nextProps[propKey];
    const lastPropValue = lastProps != null ? lastProps[propKey] : undefined;

    if (!nextProps.hasOwnProperty(propKey) || nextPropValue === lastPropValue) {
      continue;
    }

    qmlElement[group][propKey] = nextPropValue;
  }
}

// Apply the diff.
export function updateProps(
  container: RQElementContainer,
  updatePayload: Array<any>
) {
  const qmlElement = container.element;
  for (let i = 0; i < updatePayload.length; i += 2) {
    const propKey = updatePayload[i];
    const propValue = updatePayload[i + 1];

    // ignore the children
    if (propKey === 'children') {
      continue;
    }

    // event handling
    const matches = propKey.match(qmlSignalRegex);
    if (matches) {
      const eventName = matches[1];
      const [lastHandler, nextHandler] = propValue;
      listenTo(qmlElement, eventName, nextHandler, lastHandler);
      continue;
    }

    // anchor ref
    if (propKey === 'anchorRef') {
      const [lastRef, nextRef] = propValue;
      handleAnchorRef(qmlElement, lastRef, nextRef);
      continue;
    }

    // anchors handling
    if (propKey === 'anchors') {
      const [lastAnchors, nextAnchors] = propValue;
      handleAnchors(qmlElement, lastAnchors, nextAnchors);
      continue;
    }

    // style handling
    if (propKey === 'style') {
      const [lastStyle, nextStyle] = propValue;
      handleStyle(qmlElement, lastStyle, nextStyle);
      continue;
    }

    // attached property or group props
    // eg: Layout, Material, layer etc.
    const isObjectProp = typeof qmlElement[propKey] === 'object';
    if (Array.isArray(propValue) && isObjectProp) {
      const [lastPropValue, nextPropValue] = propValue;
      console.log('updateProps', propKey);
      console.log(
        inspect(nextPropValue, {
          depth: 1,
        })
      );

      handleGroupProps(qmlElement, propKey, lastPropValue, nextPropValue);

      continue;
    }

    if (!qmlElement.hasOwnProperty(propKey)) {
      console.warn(`Cannot assign to non-existent property "${propKey}"`);
      continue;
    }

    qmlElement[propKey] = propValue;
  }
}
