import React, { memo, useState } from 'react'
import { connect } from 'react-redux'

import { categoryTypes, alphaTypes } from '../../api/contants'
import Horizen from '../../baseUI/horizen'
import { NavContainer, ListContainer, List, ListItem } from './style'
import Scroll from '../../baseUI/scroll'

const Singers = memo(function Singers(props) {
  const [category, setCategory] = useState('')
  const [alpha, setAlpha] = useState('')

  const { singerList } = props

  const renderSingerList = () => {
    return (
      <List>
        {singerList.toJS().map((item, index) => {
          return (
            <ListItem key={item.accountId + '' + index}>
              <div className='img_wrapper'>
                <img
                  src={`${item.picUrl}?param=300x300`}
                  width='100%'
                  height='100%'
                  alt='music'
                />
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
          handleClick={key => setCategory(key)}
        />
        <Horizen
          list={alphaTypes}
          title={'首字母:'}
          current={alpha}
          handleClick={key => setAlpha(key)}
        ></Horizen>
      </NavContainer>
      <ListContainer>
        <Scroll>{renderSingerList()}</Scroll>
      </ListContainer>
    </>
  )
})

const mapStateToProps = state => ({
  singerList: state.getIn(['singers', 'singerList']),
  enterLoading: state.getIn(['singers', 'enterLoading']),
  pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
  pageCount: state.getIn(['singers', 'pageCount'])
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Singers)
