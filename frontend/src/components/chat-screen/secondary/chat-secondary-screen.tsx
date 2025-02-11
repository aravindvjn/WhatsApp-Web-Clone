import Chats from "./chats";
import Footer from "./footer";
import Header from "./header";

import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useMessage, useNewMessage } from "../../../hooks/useMessages";
import { useOpenedChat } from "../../../hooks/useOpenedChat";
import NoOpenChats from "./no-openchat";
import { useState } from "react";

const ChatSecondaryScreen = () => {
  const { data: currentUser } = useCurrentUser();
  const { data: openedChat } = useOpenedChat();
  const { data: oldMessages } = useMessage();
  const { data: newMessage } = useNewMessage();
  const [isTyping, setIsTyping] = useState<string>("");

  if (!openedChat) {
    return <NoOpenChats />;
  }

  return (
    <div className="h-dvh relative w-full">
      <Header />
      <Chats
        isTyping={isTyping}
        setIsTyping={setIsTyping}
        user_id={currentUser?._id || ""}
        messages={[...(oldMessages || []), ...(newMessage || [])]}
        chatId={openedChat?._id || ""}
      />
      <Footer
        chatId={openedChat?._id || ""}
        otherUser={openedChat?.otherUser}
      />
    </div>
  );
};

export default ChatSecondaryScreen;
