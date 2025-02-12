import React from 'react'
import Header from './header'
import MyStatus from './my-status'
import RecentStories from './recents'

const StatusPage = () => {
  return (
    <div>
      <Header />
      <MyStatus/>
      <RecentStories />
    </div>
  )
}

export default StatusPage
