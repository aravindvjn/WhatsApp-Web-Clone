import toast from "react-hot-toast";
import { useChatLists } from "../../../hooks/useChatsLists";
import { ChatsType } from "../types";
import SingleChat from "./single-chat";
import Toast from "../../../ui/toast";
import { useEffect, useState } from "react";

import { useNotifications } from "../../../hooks/useNotifications";
import { useSocket } from "../../../utils/socket/socket";

const ChatList = () => {
  const { data: chatLists } = useChatLists();
  const { data: notificaion } = useNotifications();

  const [typingUsers, setTypingUsers] = useState<{
    [chatId: string]: string[];
  }>({});

  const { socket } = useSocket();

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

  useEffect(() => {
    socket?.on("usersTyping", ({ chatId, typingUsers }) => {
      setTypingUsers((prev) => ({
        ...prev,
        [chatId]: typingUsers,
      }));
    });

    return () => {
      socket?.off("usersTyping");
    };
  }, [socket]);

  return (
    <div className=" h-full overflow-y-scroll scrollbar-hide pb-[120px]">
      {chatLists?.length > 0 ? (
        chatLists.map((chat: ChatsType) => (
          <SingleChat typingUsers={typingUsers} key={chat._id} {...chat} />
        ))
      ) : (
        <p className="text-center pt-5 text-[10px]">No Chats yet.</p>
      )}
    </div>
  );
};

export default ChatList;
