import { getBannerRequest, getRecommendListRequest } from '../../../api/api'

export const CHANGE_BANNER = 'recommend/CHANGE_BANNER'
export const CHANGE_RECOMMEND_LIST = 'recommend/RECOMMEND_LIST'

const changeBannerList = data => ({
  type: CHANGE_BANNER,
  data
})

const changeRecommendList = data => ({
  type: CHANGE_RECOMMEND_LIST,
  data
})

export const getBannerList = () => {
  return async dispatch => {
    const { banners } = await getBannerRequest()
    dispatch(changeBannerList(banners))
  }
}

export const getRecommendList = () => {
  return async dispatch => {
    const { result } = await getRecommendListRequest()
    dispatch(changeRecommendList(result))
  }
}
