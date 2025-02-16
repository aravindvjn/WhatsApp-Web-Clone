import React, { useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import { useSocket } from "../../../utils/socket/socket";
import MoreChatOpions from "./more-chatoptions";
import { encryptMessage } from "../../../utils/encryptions/encrypt-message";

const Footer = ({
  chatId,
  otherUser,
  user_id,
}: {
  chatId: string;
  otherUser: any;
  onlineUsers: string[];
  user_id: string;
}) => {
  const { sendMessages, socket } = useSocket();

  const [isUserTyping, setIsUserTyping] = useState<boolean>(false);

  const [message, setMessage] = useState<string>("");

  const sendMessageHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (message && (chatId || otherUser._id)) {
      sendMessages({
        message: encryptMessage({
          message,
          receiverId: otherUser._id,
          senderId: user_id,
        }),
        chatId,
        receiverId: otherUser._id,
      });

      setMessage("");
    }
  };
  let typingTimeout: any;

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);

    if (isUserTyping) return;
    setIsUserTyping(true);
    socket?.emit("typing", { chatId, receiverId: otherUser._id });

    clearTimeout(typingTimeout);

    typingTimeout = setTimeout(() => {
      setIsUserTyping(false);
      socket?.emit("stoppedTyping", { chatId, receiverId: otherUser._id });
    }, 3000);
  };

  return (
    <form
      onSubmit={sendMessageHandler}
      className="absolute bottom-0 w-full right-0 p-[10px] bg-secondary text-secondaryText flex items-center min-h-[60px]"
    >
      <MoreChatOpions />

      <input
        value={message}
        onChange={onChangeHandler}
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
