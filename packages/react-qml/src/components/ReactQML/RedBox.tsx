import React from 'react';

import { Rectangle, Column, Text } from '../QtQuick';
import { ScrollView } from '../QtQuick/Controls';

declare const qsTr: (text: string) => string;

type Props = {
  error: Error;
  errorInfo: React.ErrorInfo;
  enableStacktrace: boolean;
};

const RedBox = ({ error, errorInfo, enableStacktrace = false }: Props) => (
  <Rectangle color="#BD2619" Layout={{ fillWidth: true, fillHeight: true }}>
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
