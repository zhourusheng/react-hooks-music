import React, { memo } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import style from '../../assets/style/global-style'
import Scroll from '../scroll'

const ListContainer = styled.ul`
  display: inline-block;
  white-space: nowrap;
  height: 30px;
  > div {
    display: inline-block;
    padding: 5px 0;
    margin-right: 5px;
    color: grey;
    font-size: ${style['font-size-m']};
    vertical-align: middle;
  }
`

const ListItem = styled.li`
  display: inline-block;
  font-size: ${style['font-size-m']};
  padding: 5px 8px;
  border-radius: 10px;
  &.selected {
    color: ${style['theme-color']};
    border: 1px solid ${style['theme-color']};
    opacity: 0.8;
  }
`

const Horizen = memo(function Horizen(props) {
  const { list, current, title } = props
  const { handleClick } = props
  return (
    <Scroll direction={'horizental'}>
      <ListContainer>
        <div>{title}</div>
        {list.map(item => (
          <ListItem
            key={item.key}
            className={classnames({ selected: item.key === current })}
            onClick={() => handleClick(item.key)}
          >
            {item.name}
          </ListItem>
        ))}
      </ListContainer>
    </Scroll>
  )
})

Horizen.defaultProps = {
  list: [],
  current: '',
  title: '',
  handleClick: () => {}
}

Horizen.propTypes = {
  list: PropTypes.array,
  current: PropTypes.string,
  title: PropTypes.string,
  handleClick: PropTypes.func
}

export default Horizen
