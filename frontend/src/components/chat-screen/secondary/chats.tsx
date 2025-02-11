import { useEffect, useRef, useState } from "react";
import { MessagesTypes } from "../types";
import SingleMessge from "./single-message";
import { useSocket } from "../../../utils/socket/socket";

const Chats = ({
  messages,
  user_id,
  chatId,
  isTyping,
  setIsTyping
}: {
  messages: MessagesTypes[];
  user_id: string;
  chatId: string;
  isTyping: string;
  setIsTyping: React.Dispatch<React.SetStateAction<string>>;
}) => {


  const { socket } = useSocket();

  const filteredMessages = messages.filter((msg) => msg.chatId === chatId);

  const uniqueMessages = filteredMessages.filter(
    (msg, index, self) => index === self.findIndex((m) => m._id === msg._id)
  );

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    socket?.on("typing", (data) => {

      if (data.chatId === chatId) {
        setIsTyping(data.chatId);
      }

      socket?.on("stoppedTyping", (d) => {
        if (d.chatId === chatId) {
          setIsTyping("");
          socket?.off("stoppedTyping");
        }
      });

    });

    return () => {
      socket?.off("typing");
    };
  }, [socket]);

  return (
    <div className="h-full pt-[65px] pb-[75px] overflow-y-scroll scrollbar-hide flex flex-col px-[20px] md:px-[40px] gap-[10px]">
      {uniqueMessages.length > 0 &&
        uniqueMessages.map((message) => (
          <SingleMessge
            user_id={user_id}
            key={message._id}
            messages={message}
          />
        ))}
      {isTyping === chatId && (
        <p className="bg-secondary w-fit py-[7px] px-[10px] rounded-full flex items-center gap-1">
          <span className="dot-animation w-1.5 h-1.5 bg-white rounded-full"></span>
          <span className="dot-animation w-1.5 h-1.5 bg-white rounded-full animation-delay-200"></span>
          <span className="dot-animation w-1.5 h-1.5 bg-white rounded-full animation-delay-400"></span>
        </p>
      )}
      <div ref={bottomRef}></div>
    </div>
  );
};

export default Chats;
