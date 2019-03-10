import React from 'react';

import QtQuick from '../QtQuick';
const { Rectangle, Column, Text } = QtQuick;

import QtQuickControls2 from '../QtQuickControls2';
const { ScrollView } = QtQuickControls2;

declare const qsTr: (text: string) => string;

type Props = {
  error: Error;
  errorInfo: React.ErrorInfo;
  enableStacktrace?: boolean;
};

const RedBox: React.FC<Props> = ({
  error,
  errorInfo,
  enableStacktrace = false,
}) => (
  <Rectangle color="#BD2619" anchors={{ fill: 'parent' }}>
    <ScrollView>
      <Column spacing={10} padding={32}>
        <Text
          text={qsTr('Error')}
          color="white"
          font={{
            family: 'Roboto',
            pointSize: 14,
            capitalization: 'AllUppercase',
            letterSpacing: 1.5,
            wordSpacing: 5,
          }}
          Layout={{
            fillWidth: true,
          }}
        />
        <Text
          text={error.toString()}
          color="white"
          font={{
            family: 'Roboto',
            pointSize: 12,
          }}
          Layout={{
            fillWidth: true,
          }}
        />
        <Text
          text={errorInfo.componentStack}
          color="white"
          font={{
            family: 'Roboto',
            pointSize: 12,
          }}
          Layout={{
            fillWidth: true,
          }}
        />

        <Text
          text={qsTr('Stacktrace')}
          visible={enableStacktrace}
          color="white"
          font={{
            family: 'Roboto',
            pointSize: 14,
            capitalization: 'AllUppercase',
            letterSpacing: 1.5,
            wordSpacing: 5,
          }}
          Layout={{
            fillWidth: true,
          }}
        />
        <Text
          text={error.stack}
          visible={enableStacktrace}
          color="white"
          font={{
            family: 'Roboto',
            pointSize: 12,
          }}
          Layout={{
            fillWidth: true,
          }}
        />
      </Column>
    </ScrollView>
  </Rectangle>
);

export default RedBox;
