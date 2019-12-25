import React, {memo} from 'react'
import { renderRoutes } from 'react-router-config'

const Home = memo(function Home(props) {
  const { route } = props
  return(
    <>
    <div>Home</div>
    {renderRoutes(route.routes)}
    </>
  )
})

export default Home