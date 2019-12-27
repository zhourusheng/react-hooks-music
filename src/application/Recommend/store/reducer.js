import { fromJS } from 'immutable'

import {
  CHANGE_BANNER,
  CHANGE_RECOMMEND_LIST,
  CHANGE_IS_LOADING
} from './action'

const defaultState = fromJS({
  bannerList: [],
  recommendList: [],
  isLoading: false
})

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_BANNER:
      return state.merge({
        bannerList: action.data
      })
    case CHANGE_RECOMMEND_LIST:
      return state.merge({
        recommendList: action.data
      })
    case CHANGE_IS_LOADING:
      return state.set('isLoading', action.data)
    default:
      return state
  }
}

export default reducer
