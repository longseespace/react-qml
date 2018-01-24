import { connect } from 'react-redux';
import { flow, join, map } from 'lodash/fp';
import React from 'react';
import md5 from 'md5';

import {
  loadMoreTopStory,
  getStoryList,
  isGettingStoryItemSelector,
  topStoryItemsSelector,
} from './StoryState';
import createQMLComponent from '../util/createQMLComponent';
import qmlSource from './StoryList.qml';

const StoryListQML = createQMLComponent(qmlSource, 'App.StoryList');

const connectToRedux = connect(
  state => ({
    topStoryItems: topStoryItemsSelector(state),
    loading: isGettingStoryItemSelector(state),
  }),
  {
    getStoryList,
    onLoadMoreClicked: loadMoreTopStory,
  }
);

const computeHash = flow(map('id'), join(','), md5);

class StoryList extends React.Component {
  componentWillMount() {
    const { getStoryList } = this.props;
    getStoryList('topstories');
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { topStoryItems, loading, onLoadMoreClicked } = this.props;
    return (
      <StoryListQML
        loading={loading}
        stories={topStoryItems}
        hash={computeHash(topStoryItems)}
        onLoadMoreClicked={onLoadMoreClicked}
      />
    );
  }
}

export default connectToRedux(StoryList);
