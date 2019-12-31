import { fromJS } from 'immutable'
import { getHotSingerListRequest, getSingerListRequest } from '../../../api/api'

export const CHANGE_SINGER_LIST = 'singers/CHANGE_SINGER_LIST'
export const CHANGE_PAGE_COUNT = 'singers/PAGE_COUNT'
export const CHANGE_ENTER_LOADING = 'singers/ENTER_LOADING'
export const CHANGE_PULLUP_LOADING = 'singers/PULLUP_LOADING'
export const CHANGE_PULLDOWN_LOADING = 'singers/PULLDOWN_LOADING'
export const CHANGE_CATOGORY = 'singers/CHANGE_CATEGORY'
export const CHANGE_ALPHA = 'singers/CHANGE_ALPHA'
export const CHANGE_LIST_OFFSET = 'singers/CHANGE_LIST_OFFSET'

export const changeCategory = data => ({
  type: CHANGE_CATOGORY,
  data
})

export const changeAlpha = data => ({
  type: CHANGE_ALPHA,
  data
})

export const changeListOffset = data => ({
  type: CHANGE_LIST_OFFSET,
  data
})

export const changeSingerList = data => ({
  type: CHANGE_SINGER_LIST,
  data: fromJS(data)
})

export const changePageCount = data => ({
  type: CHANGE_PAGE_COUNT,
  data
})

//进场loading
export const changeEnterLoading = data => ({
  type: CHANGE_ENTER_LOADING,
  data
})

//滑动最底部loading
export const changePullUpLoading = data => ({
  type: CHANGE_PULLUP_LOADING,
  data
})

//顶部下拉刷新loading
export const changePullDownLoading = data => ({
  type: CHANGE_PULLDOWN_LOADING,
  data
})

//第一次加载热门歌手
export const getHotSingerList = () => {
  return async dispatch => {
    try {
      const { artists } = await getHotSingerListRequest(0)
      dispatch(changeSingerList(artists))
      dispatch(changeEnterLoading(false))
      dispatch(changePullDownLoading(false))
    } catch (error) {
      console.log(error)
    }
  }
}

// 加载更多热门歌手
export const refreshMoreHotSingerList = () => {
  return async (dispatch, getState) => {
    try {
      const pageCount = getState().getIn('singers', 'pageCount')
      const singerList = getState()
        .getIn('singers', 'singerList')
        .toJS()
      const { artists } = getHotSingerListRequest(pageCount)
      const data = [...singerList, ...artists]
      dispatch(changeSingerList(data))
      dispatch(changePullUpLoading(false))
    } catch (error) {
      console.log(error)
    }
  }
}

//第一次加载对应类别的歌手
export const getSingerList = (category, alpha) => {
  return (dispatch, getState) => {
    getSingerListRequest(category, alpha, 0)
      .then(res => {
        const data = res.artists
        dispatch(changeSingerList(data))
        dispatch(changeEnterLoading(false))
        dispatch(changePullDownLoading(false))
      })
      .catch(() => {
        console.log('歌手数据获取失败')
      })
  }
}

//加载更多歌手
export const refreshMoreSingerList = (category, alpha) => {
  return (dispatch, getState) => {
    const pageCount = getState().getIn(['singers', 'pageCount'])
    const singerList = getState()
      .getIn(['singers', 'singerList'])
      .toJS()
    getSingerListRequest(category, alpha, pageCount)
      .then(res => {
        const data = [...singerList, ...res.artists]
        dispatch(changeSingerList(data))
        dispatch(changePullUpLoading(false))
      })
      .catch(() => {
        console.log('歌手数据获取失败')
      })
  }
}
