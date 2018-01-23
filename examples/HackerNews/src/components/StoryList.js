import { connect } from 'react-redux';
import { flow, join, map } from 'lodash/fp';
import React from 'react';
import md5 from 'md5';

import { getStoryList, topStoryItemsSelector } from './StoryState';
import createQMLComponent from '../util/createQMLComponent';
import qmlSource from './StoryList.qml';

const StoryListQML = createQMLComponent(qmlSource, 'App.StoryList');

const connectToRedux = connect(
  state => ({
    topStoryItems: topStoryItemsSelector(state),
  }),
  {
    getStoryList,
  }
);

const computeHash = flow(map('id'), join(','), md5);

class StoryList extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.topStoryItems && this.model) {
      console.log('right');
    }
  }

  componentWillMount() {
    const { getStoryList } = this.props;
    getStoryList('topstories');
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { topStoryItems, getStoryList, ...otherProps } = this.props;
    return (
      <StoryListQML stories={topStoryItems} hash={computeHash(topStoryItems)} />
    );
  }
}

export default connectToRedux(StoryList);
