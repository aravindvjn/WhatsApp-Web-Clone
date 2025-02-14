import toast from "react-hot-toast";
import { useChatLists } from "../../../hooks/useChatsLists";
import { ChatsType } from "../types";
import SingleChat from "./single-chat";
import Toast from "../../../ui/toast";
import { useEffect, useState } from "react";
import { useNotifications } from "../../../hooks/useNotifications";
import { useSocket } from "../../../utils/socket/socket";

const ChatList = () => {
  //Get all chat lists
  const { data: chatLists, isLoading } = useChatLists();

  //Get all notifications
  const { data: notificaion } = useNotifications();

  const [readMessages, setReadMessages] = useState<string[]>([]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  //get socket
  const { socket } = useSocket();

  //Show Notifications
  const showCustomToast = () => {
    if (notificaion) {
      toast.custom((t: any) => (
        <Toast
          openChat={{
            _id: notificaion?._id || "",
            otherUser: notificaion?.otherUser!,
            lastMessage: notificaion?.lastMessage!,
          }}
          t={t}
        />
      ));
    }
  };

  //Show Notifications when new notifications arrives
  useEffect(() => {
    if (notificaion) {
      showCustomToast();
    }
  }, [notificaion]);

  useEffect(() => {
    //Listen for typing events
    socket?.on("typing", ({ chatId }) => {
      setTypingUsers((prev) => [...prev, chatId]);
    });

    //Listen for typing stopping events
    socket?.on("stoppedTyping", ({ chatId }) => {
      setTypingUsers((prev) => prev.filter((p) => p !== chatId));
    });

    //Listen for message read events
    socket?.on("messageRead", ({ messageId }) => {
      setReadMessages((prev) => [...prev, messageId]);
    });

    return () => {
      socket?.off("typing");
      socket?.off("stoppedTyping");
      socket?.off("messageRead");
    };
  }, [socket]);

  //Render chat lists
  const renderChatLists = () => {

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (chatLists.length === 0) {
      return <p className="text-center pt-5 text-[10px]">No Chats yet.</p>;
    }

    return chatLists.map((chat: ChatsType) => (
      <SingleChat
        typingUsers={typingUsers}
        key={chat._id}
        {...chat}
        read={readMessages.includes(chat?.lastMessage?._id || "")}
      />
    ));
  };

  return (
    <div className=" h-full overflow-y-scroll scrollbar-hide pb-[120px]">
      {renderChatLists()}
    </div>
  );
};

export default ChatList;
