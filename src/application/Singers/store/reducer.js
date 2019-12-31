import { fromJS } from 'immutable'

import {
  CHANGE_ALPHA,
  CHANGE_CATOGORY,
  CHANGE_LIST_OFFSET,
  CHANGE_SINGER_LIST,
  CHANGE_ENTER_LOADING,
  CHANGE_PULLUP_LOADING,
  CHANGE_PULLDOWN_LOADING
} from './action'

const defaultState = fromJS({
  singerList: [],
  enterLoading: true, //控制进场Loading
  pullUpLoading: false, //控制上拉加载动画
  pullDownLoading: false, //控制下拉加载动画
  pageCount: 0,
  category: '',
  alpha: '',
  listOffset: 0
})

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_ALPHA:
      return state.set('alpha', action.data)
    case CHANGE_CATOGORY:
      return state.set('category', action.data)
    case CHANGE_SINGER_LIST:
      return state.set('singerList', action.data)
    case CHANGE_LIST_OFFSET:
      return state.set('listOffset', action.data)
    case CHANGE_ENTER_LOADING:
      return state.set('enterLoading', action.data)
    case CHANGE_PULLUP_LOADING:
      return state.set('pullUpLoading', action.data)
    case CHANGE_PULLDOWN_LOADING:
      return state.set('pullDownLoading', action.data)
    default:
      return state
  }
}

export default reducer
