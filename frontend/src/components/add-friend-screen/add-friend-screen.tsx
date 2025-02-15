import React, { Dispatch, SetStateAction } from 'react'
import { PageType } from '../nav-bar/nav-bar'
import SearchInput from '../chat-screen/primary/search-input'
import { BiArrowBack } from 'react-icons/bi'

const AddFriendScreen = ({setPage}:{setPage: Dispatch<SetStateAction<PageType>>}) => {
  return (
    <div className='pt-2 flex flex-col gap-1'>
      <BiArrowBack className='p-1 cursor-pointer rounded-full bg-secondary m-[8px]' size={33} onClick={()=>setPage("chats")} />
      <SearchInput />
    </div>
  )
}

export default AddFriendScreen
