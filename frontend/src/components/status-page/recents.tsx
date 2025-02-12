import React from 'react'
import Text from '../../ui/text'
import SingleStory from './single-story'

const RecentStories = () => {
  return (
    <div>
      <Text type='p' fontWeight='light' className='px-[12px] text-green py-3'>RECENT</Text>
      <SingleStory/>
      <SingleStory/>
      <SingleStory/>
    </div>
  )
}

export default RecentStories
