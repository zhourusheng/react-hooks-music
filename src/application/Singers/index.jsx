import React, { memo, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import LazyLoad, { forceCheck } from 'react-lazyload'
import { renderRoutes } from 'react-router-config'

import Loading from '../../baseUI/loading'
import { categoryTypes, alphaTypes } from '../../api/contants'
import Horizen from '../../baseUI/horizen'
import {
  NavContainer,
  ListContainer,
  List,
  ListItem,
  EnterLoading
} from './style'
import Scroll from '../../baseUI/scroll'
import {
  getSingerList,
  changeCategory,
  changeAlpha,
  getHotSingerList,
  changeEnterLoading,
  changeListOffset,
  refreshMoreSingerList,
  changePullUpLoading,
  changePullDownLoading,
  refreshMoreHotSingerList
} from './store/action'

const Singers = memo(function Singers(props) {
  const {
    singerList,
    alpha,
    category,
    enterLoading,
    pullUpLoading,
    pullDownLoading,
    pageCount
  } = props

  const {
    getHotSinger,
    updateCategory,
    updateAlpha,
    pullUpRefresh,
    pullDownRefresh
  } = props

  useEffect(() => {
    getHotSinger()
  }, [])

  const handleUpdateCategory = key => {}

  const handleUpdateAlpha = key => {}

  const renderSingerList = () => {
    return (
      <List>
        {singerList.toJS().map((item, index) => {
          return (
            <ListItem key={item.accountId + '' + index}>
              <div className='img_wrapper'>
                <LazyLoad
                  placeholder={
                    <img
                      width='100%'
                      height='100%'
                      src={require('./singer.png')}
                      alt='music'
                    />
                  }
                >
                  <img
                    src={`${item.picUrl}?param=300x300`}
                    width='100%'
                    height='100%'
                    alt='music'
                  />
                </LazyLoad>
              </div>
              <span className='name'>{item.name}</span>
            </ListItem>
          )
        })}
      </List>
    )
  }

  return (
    <>
      <NavContainer>
        <Horizen
          list={categoryTypes}
          title={'分类 (默认热门):'}
          current={category}
          handleClick={key => handleUpdateCategory(key)}
        />
        <Horizen
          list={alphaTypes}
          title={'首字母:'}
          current={alpha}
          handleClick={key => handleUpdateAlpha(key)}
        ></Horizen>
      </NavContainer>
      <ListContainer>
        <Scroll>{renderSingerList()}</Scroll>
      </ListContainer>
      {enterLoading ? (
        <EnterLoading>
          <Loading></Loading>
        </EnterLoading>
      ) : null}
      {renderRoutes(props.route.routes)}
    </>
  )
})

const mapStateToProps = state => ({
  alpha: state.getIn(['singers', 'alpha']),
  category: state.getIn(['singers', 'category']),
  singerList: state.getIn(['singers', 'singerList']),
  enterLoading: state.getIn(['singers', 'enterLoading']),
  pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
  pageCount: state.getIn(['singers', 'pageCount'])
})

const mapDispatchToProps = dispatch => ({
  getHotSinger() {
    dispatch(getHotSingerList())
  },
  updateCategory(newVal) {
    dispatch(changeCategory(newVal))
    dispatch(changeListOffset(0))
    dispatch(changeEnterLoading(true))
    dispatch(getSingerList())
  },
  updateAlpha(newVal) {
    dispatch(changeAlpha(newVal))
    dispatch(changeListOffset(0))
    dispatch(changeEnterLoading(true))
    dispatch(getSingerList())
  },
  // 滑到最底部刷新部分的处理
  pullUpRefresh(hot, count) {
    dispatch(changePullUpLoading(true))
    if (hot) {
      dispatch(refreshMoreHotSingerList())
    } else {
      dispatch(refreshMoreSingerList())
    }
  },
  //顶部下拉刷新
  pullDownRefresh(category, alpha) {
    dispatch(changePullDownLoading(true))
    dispatch(changeListOffset(0))
    if (category === '' && alpha === '') {
      dispatch(getHotSingerList())
    } else {
      dispatch(getSingerList())
    }
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Singers)
