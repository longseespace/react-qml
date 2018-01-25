import { connect } from 'react-redux';
import { flow, join, map } from 'lodash/fp';
import React from 'react';
import md5 from 'md5';

import {
  loadMoreTopStory,
  isGettingStoryItemSelector,
  topStoryItemsSelector,
} from './StoryState';
import { loadStory } from './WebViewState';
import createQMLComponent from '../util/createQMLComponent';
import qmlSource from './StoryList.qml';

const StoryListQML = createQMLComponent(qmlSource, 'App.StoryList');

const connectToRedux = connect(
  state => ({
    topStoryItems: topStoryItemsSelector(state),
    loading: isGettingStoryItemSelector(state),
  }),
  {
    onLoadMoreClicked: loadMoreTopStory,
    onStoryClicked: loadStory,
  }
);

const computeHash = flow(map('id'), join(','), md5);

class StoryList extends React.Component {
  render() {
    // eslint-disable-next-line no-unused-vars
    const {
      topStoryItems,
      loading,
      onLoadMoreClicked,
      onStoryClicked,
    } = this.props;
    return (
      <StoryListQML
        loading={loading}
        stories={topStoryItems}
        hash={computeHash(topStoryItems)}
        onLoadMoreClicked={onLoadMoreClicked}
        onStoryClicked={onStoryClicked}
      />
    );
  }
}

export default connectToRedux(StoryList);
