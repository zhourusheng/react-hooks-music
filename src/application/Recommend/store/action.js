import { getBannerRequest, getRecommendListRequest } from '../../../api/api'

export const CHANGE_BANNER = 'recommend/CHANGE_BANNER'
export const CHANGE_RECOMMEND_LIST = 'recommend/RECOMMEND_LIST'
export const CHANGE_IS_LOADING = 'recommend/CHANGE_IS_LOADING'

const changeBannerList = data => ({
  type: CHANGE_BANNER,
  data
})

const changeRecommendList = data => ({
  type: CHANGE_RECOMMEND_LIST,
  data
})

const changeIsLoading = data => ({
  type: CHANGE_IS_LOADING,
  data
})

export const getBannerList = () => {
  return async dispatch => {
    try {
      const { banners } = await getBannerRequest()
      dispatch(changeBannerList(banners))
    } catch (error) {
      console.log(error)
    }
  }
}

export const getRecommendList = () => {
  return async dispatch => {
    dispatch(changeIsLoading(true))
    try {
      const { result } = await getRecommendListRequest()
      dispatch(changeRecommendList(result))
      dispatch(changeIsLoading(false))
    } catch (error) {
      dispatch(changeIsLoading(false))
      console.log(error)
    }
  }
}
