import React from 'react'
import digitalflake from '../assets/digitalflake.jpeg'
function Home() {
  return (
    <div className='homeMain'>
      <img src={digitalflake} alt="" />
      <p>Welcome to Digitalflake admin</p>
    </div>
  )
}

export default Home
