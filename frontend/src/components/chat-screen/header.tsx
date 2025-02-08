import Text from '../../ui/text'
import { RiChatNewLine } from 'react-icons/ri'
import { BsThreeDotsVertical } from 'react-icons/bs'

const ChatHeader = () => {
  return (
    <div className='py-4 px-3 flex items-center justify-between'>
      <Text  type='h4' fontWeight='bold'>Chats</Text>
      <div className='flex items-center gap-5 text-secondaryText'>
        <RiChatNewLine size={18}/>
        <BsThreeDotsVertical size={18}/>
      </div>
    </div>
  )
}

export default ChatHeader
