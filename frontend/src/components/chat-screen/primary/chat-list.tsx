import toast from "react-hot-toast";
import { useChatLists } from "../../../hooks/useChatsLists";
import { ChatsType } from "../types";
import SingleChat from "./single-chat";
import Toast from "../../../ui/toast";
import { useEffect } from "react";

import { useNotifications } from "../../../hooks/useNotifications";

const ChatList = () => {
  const { data: chatLists } = useChatLists();
  const { data: notificaion } = useNotifications();


  const showCustomToast = () => {
    toast.custom((t: any) => (
      <Toast
        message={notificaion?.message || ""}
        profilePic={notificaion?.profilePic || ""}
        username={notificaion?.username || ""}
        displayName={notificaion?.displayName}
        t={t}
      />
    ));
  };

  useEffect(() => {
    if (notificaion) {
      showCustomToast();
    }
  }, [notificaion]);

  return (
    <div className=" h-full overflow-y-scroll scrollbar-hide pb-[120px]">
      {chatLists?.length > 0 ? (
        chatLists.map((chat: ChatsType) => (
          <SingleChat key={chat._id} {...chat} />
        ))
      ) : (
        <p className="text-center pt-5 text-[10px]">No Chats yet.</p>
      )}
    </div>
  );
};

export default ChatList;
