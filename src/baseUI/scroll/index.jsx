import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
  useMemo
} from 'react'
import PropTypes from 'prop-types'
import BScroll from 'better-scroll'
import styled from 'styled-components'
import Loading from '../loading'
import debounce from '../../util/debounce'

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`
const PullUpLoading = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5px;
  width: 60px;
  height: 60px;
  margin: auto;
  z-index: 100;
`
export const PullDownLoading = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0px;
  height: 30px;
  margin: auto;
  z-index: 100;
`

const Scroll = forwardRef((props, ref) => {
  // BS实例
  const [bScroll, setBSroll] = useState()
  const scrollContainerRef = useRef()

  const {
    direction,
    click,
    refresh,
    pullUpLoading,
    pullDownLoading,
    bounceTop,
    bounceBottom
  } = props
  const { pullUp, pullDown, onScroll } = props

  // 上拉下拉防抖
  const pullUpDebounce = useMemo(() => {
    return debounce(pullUp, 300)
  }, [pullUp])

  const pullDownDebounce = useMemo(() => {
    return debounce(pullDown, 300)
  }, [pullDown])

  // 创建BS
  useEffect(() => {
    const scroll = new BScroll(scrollContainerRef.current, {
      scrollX: direction === 'horizental',
      scrollY: direction === 'vertical',
      click: click,
      probeType: 3,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom
      }
    })
    setBSroll(scroll)
    // useEffect 在组件被销毁时，会执行返回值函数内回调函数
    return () => {
      setBSroll(null)
    }
    // eslint-disable-next-line
  }, [])

  // 绑定scroll事件
  useEffect(() => {
    if (!bScroll || !onScroll) return
    bScroll.on('scroll', scroll => {
      onScroll(scroll)
    })
    // 此处相当于 class 组件中的 componentWillUnmount
    return () => {
      bScroll.off('scroll')
    }
  }, [bScroll, onScroll])

  // 上拉到底
  useEffect(() => {
    if (!bScroll || !pullUp) return
    bScroll.on('scrollEnd', () => {
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUpDebounce()
      }
    })
    return () => {
      bScroll.off('scrollEnd')
    }
  }, [bScroll, pullUp, pullUpDebounce])

  // 下拉刷新
  useEffect(() => {
    if (!bScroll || !pullDown) return
    bScroll.on('touchEnd', pos => {
      if (pos.y > 80) {
        pullDownDebounce()
      }
    })
    return () => {
      bScroll.off('touchEnd')
    }
  }, [bScroll, pullDown, pullDownDebounce])

  // refresh()调用时, 刷新BS
  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh()
    }
  })

  // useImperativeHandle Hook
  useImperativeHandle(ref, () => ({
    refresh() {
      if (bScroll) {
        bScroll.refresh()
        bScroll.scrollTo(0, 0)
      }
    },
    getScroll() {
      if (bScroll) {
        return bScroll
      }
    }
  }))

  const PullUpdisplayStyle = pullUpLoading
    ? { display: '' }
    : { display: 'none' }
  const PullDowndisplayStyle = pullDownLoading
    ? { display: '' }
    : { display: 'none' }

  return (
    <ScrollContainer ref={scrollContainerRef}>
      {props.children}
      <PullUpLoading style={PullUpdisplayStyle}>
        <Loading></Loading>
      </PullUpLoading>
      <PullDownLoading style={PullDowndisplayStyle}>
        <Loading></Loading>
      </PullDownLoading>
    </ScrollContainer>
  )
})

Scroll.propsTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizental']),
  click: PropTypes.bool,
  refresh: PropTypes.bool,
  onScroll: PropTypes.func,
  pullUp: PropTypes.func,
  pullDown: PropTypes.func,
  pullUpLoading: PropTypes.bool,
  pullDownLoading: PropTypes.bool,
  bounceTop: PropTypes.bool,
  bounceBottom: PropTypes.bool
}

Scroll.defaultProps = {
  direction: 'vertical',
  click: true,
  refresh: true,
  onScroll: null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true
}

export default Scroll
