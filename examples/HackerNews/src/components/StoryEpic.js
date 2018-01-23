import { ACTIONS } from 'redux-api-call';
import { combineEpics } from 'redux-observable';
import { eq, flow, over, path, take } from 'lodash/fp';
import { filter, map } from 'rxjs/operators';

import { GET_STORY_LIST, getStoryItem } from './StoryState';

const fetchStoryItemsAfterIDsReceived = action$ =>
  action$
    .ofType(ACTIONS.COMPLETE)
    .pipe(
      filter(flow(path('payload.name'), eq(GET_STORY_LIST))),
      map(over([path('payload.type'), flow(path('payload.json'), take(10))])),
      map(([storyType, storyIds]) =>
        storyIds.map(id => getStoryItem(id, storyType))
      )
    );

export default combineEpics(fetchStoryItemsAfterIDsReceived);
