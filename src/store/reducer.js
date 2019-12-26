import { combineReducers } from 'redux-immutable'

import { reducer as RecommendReducer } from '../application/Recommend/store'

export default combineReducers({
  recommend: RecommendReducer
})