import React, { memo, useEffect } from 'react'
import { connect } from 'react-redux'
import { forceCheck } from 'react-lazyload'

import { getBannerList, getRecommendList } from './store/action'
import Slider from '../../components/slider'
import RecommendList from '../../components/list'
import { Content } from './style'
import Scroll from '../../baseUI/scroll'

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
    <Content>
      <Scroll onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerList}></Slider>
          <RecommendList recommendList={recommendList} />
        </div>
      </Scroll>
    </Content>
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
