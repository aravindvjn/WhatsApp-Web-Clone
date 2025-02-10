import Chats from "./chats";
import Footer from "./footer";
import Header from "./header";

import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useMessage } from "../../../hooks/useMessages";
import { useOpenedChat } from "../../../hooks/useOpenedChat";

const ChatSecondaryScreen = () => {
  const { data: currentUser } = useCurrentUser();
  const { data: messages } = useMessage();
  const { data: openedChat } = useOpenedChat();

  return (
    <div className="h-dvh relative w-full">
      <Header />
      <Chats user_id={currentUser?._id || ""} messages={messages || []} />
      <Footer
        chatId={openedChat?._id || ""}
        otherUser={openedChat?.otherUser}
      />
    </div>
  );
};

export default ChatSecondaryScreen;
