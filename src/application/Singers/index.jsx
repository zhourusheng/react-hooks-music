import React, { memo } from 'react'
import { categoryTypes, alphaTypes } from '../../api/contants'
import Horizen from '../../baseUI/horizen'
import { NavContainer } from './style'

const Singers = memo(function Singers(props) {
  return (
    <NavContainer>
      <Horizen list={categoryTypes} title={'分类 (默认热门):'} />
      <Horizen list={alphaTypes} title={"首字母:"}></Horizen>
    </NavContainer>
  )
})

export default Singers
