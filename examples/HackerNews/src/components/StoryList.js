import React from 'react';

import createQMLComponent from '../util/createQMLComponent';
import qmlSource from './StoryList.qml';

const StoryListQML = createQMLComponent(qmlSource, 'App.StoryList');

const StoryList = props => <StoryListQML {...props} />;

export default StoryList;
