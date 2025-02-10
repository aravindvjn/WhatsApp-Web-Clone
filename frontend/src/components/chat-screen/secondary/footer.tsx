import React, { useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import { useSocket } from "../../../utils/socket/socket";
import { updateChatLists } from "../../../utils/helper/inValidateQuery";
import MoreChatOpions from "./more-chatoptions";

const Footer = ({ chatId, otherUser }: { chatId: string; otherUser: any }) => {
  const { sendPrivateMessage } = useSocket();
  const [message, setMessage] = useState<string>("");

  const modifyChatLists = updateChatLists();

  const sendMessageHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (message && (chatId || otherUser._id)) {
      sendPrivateMessage({
        message,
        chatId,
        receiverId: otherUser._id,
      });

      // modifyChatLists({
      //   newValues: [
      //     {
      //       _id: chatId,
      //       lastMessage: {
      //         _id: Date.now().toString(),
      //         chatId: chatId,
      //         senderId: "",
      //         text: message,
      //         mediaUrl: null,
      //         mediaType: "String",
      //         status: "String",
      //         timestamp: Date.now().toString(),
      //       },
      //       otherUser,
      //     },
      //   ],
      // });

      setMessage("");
    }
  };
  return (
    <form
      onSubmit={sendMessageHandler}
      className="absolute bottom-0 w-full right-0 p-[10px] bg-secondary text-secondaryText flex items-center min-h-[60px]"
    >
      <MoreChatOpions />
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="line-clamp-4 h-[40px] bg-blue-200/20  flex items-center rounded-md w-full px-[10px] focus:outline-none text-primaryText"
        placeholder="Type a message"
      />
      <button type="button" className="center w-[50px]">
        <FaMicrophone size={20} />
      </button>
    </form>
  );
};

export default Footer;
