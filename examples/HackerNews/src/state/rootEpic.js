/* @flow */
import { combineEpics } from 'redux-observable';

import storyEpic from '../components/StoryEpic';

export default combineEpics(storyEpic);
