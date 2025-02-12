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
  const [readMessages, setReadMessages] = useState<string[]>([]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  const { socket } = useSocket();

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

  useEffect(() => {
    if (notificaion) {
      showCustomToast();
    }
  }, [notificaion]);

  useEffect(() => {
    socket?.on("typing", ({ chatId }) => {
      setTypingUsers((prev) => [...prev, chatId]);
    });

    socket?.on("stoppedTyping", ({ chatId }) => {
      setTypingUsers((prev) => prev.filter((p) => p !== chatId));
    });

    socket?.on("messageRead", ({ messageId }) => {
      setReadMessages((prev) => [...prev, messageId]);
    });

    return () => {
      socket?.off("typing");
      socket?.off("stoppedTyping");
      socket?.off("messageRead");
    };
  }, [socket]);

  return (
    <div className=" h-full overflow-y-scroll scrollbar-hide pb-[120px]">
      {chatLists?.length > 0 ? (
        chatLists.map((chat: ChatsType) => (
          <SingleChat
            typingUsers={typingUsers}
            key={chat._id}
            {...chat}
            read={readMessages.includes(chat?.lastMessage?._id || "")}
          />
        ))
      ) : (
        <p className="text-center pt-5 text-[10px]">No Chats yet.</p>
      )}
    </div>
  );
};

export default ChatList;
