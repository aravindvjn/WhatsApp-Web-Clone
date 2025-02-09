import { chats } from "../../../data/chat";
import { messages } from "../../../data/messages";
import { users } from "../../../data/user";
import { useChatLists } from "../../../hooks/useChatsLists";
import { ChatsType } from "../types";
import SingleChat from "./single-chat";

const ChatList = () => {

  const { data: chatList } = useChatLists();

  return (
    <div className=" h-full overflow-y-scroll scrollbar-hide pb-[120px]">
      {chatList?.length > 0 ? (
        chatList.map((chat: ChatsType) => (
          <SingleChat key={chat._id} {...chat} />
        ))
      ) : (
        <p className="text-center pt-5 text-[10px]">No Chats yet.</p>
      )}
    </div>
  );
};

export default ChatList;
