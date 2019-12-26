import React, { memo, useEffect } from 'react'
import { connect } from 'react-redux'

import { getBannerList, getRecommendList } from './store/action'
import Slider from '../../components/slider'
import RecommendList from '../../components/list'

const Recommend = memo(function Recommend(props) {
  const {
    bannerList,
    recommendList,
    getBannerDataDispatch,
    getRecommendListDataDispatch
  } = props

  useEffect(() => {
    getBannerDataDispatch()
    getRecommendListDataDispatch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Slider bannerList={bannerList}></Slider>
      <RecommendList recommendList={recommendList} />
    </div>
  )
})

const mapStateToProps = state => ({
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList'])
})

const mapDispatchToProps = dispatch => ({
  getBannerDataDispatch() {
    dispatch(getBannerList())
  },
  getRecommendListDataDispatch() {
    dispatch(getRecommendList())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Recommend)
