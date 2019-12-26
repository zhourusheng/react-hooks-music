import { fromJS } from 'immutable'

import { CHANGE_BANNER, CHANGE_RECOMMEND_LIST } from './action'

const defaultState = fromJS({
  bannerList: [],
  recommendList: []
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
    default:
      return state
  }
}

export default reducer
