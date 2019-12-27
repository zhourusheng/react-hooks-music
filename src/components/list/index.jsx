import React, { memo } from 'react'
import LazyLoad from 'react-lazyload'
import { ListWrapper, ListItem, List } from './style'

import getCount from '../../util/getCount'

const RecommendList = memo(function RecommendList(props) {
  const { recommendList } = props

  const DefaultImg = (
    <img width='100%' height='100%' src={require('./music.png')} alt='music' />
  )

  return (
    <ListWrapper>
      <h1 className='title'> 推荐歌单 </h1>
      <List>
        {recommendList.map((item, index) => {
          return (
            <ListItem key={item.id + index}>
              <div className='img_wrapper'>
                <div className='decorate'></div>
                <LazyLoad placeholder={DefaultImg}>
                  <img
                    src={item.picUrl + '?param=300x300'}
                    width='100%'
                    height='100%'
                    alt='music'
                  />
                </LazyLoad>
                <div className='play_count'>
                  <i className='iconfont play'>&#xe885;</i>
                  <span className='count'>{getCount(item.playCount)}</span>
                </div>
              </div>
              <div className='desc'>{item.name}</div>
            </ListItem>
          )
        })}
      </List>
    </ListWrapper>
  )
})

export default RecommendList
