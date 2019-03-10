// script: generateTypes, version: 0.3
// dependencies
import * as QtQml from '../QtQml/types';

type Signal<T> = {
  connect: (handler: T) => void;
  disconnect: (handler: T) => void;
};

export type QQmlSettings = {
  category: string;
} & QtQml.QObject;

// end
