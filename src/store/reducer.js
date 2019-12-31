import { combineReducers } from 'redux-immutable'

import { reducer as RecommendReducer } from '../application/Recommend/store'
import { reducer as SingersReducer } from '../application/Singers/store'

export default combineReducers({
  recommend: RecommendReducer,
  singers: SingersReducer
})