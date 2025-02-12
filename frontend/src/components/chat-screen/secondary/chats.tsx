import { useEffect, useRef, useState } from "react";
import { MessagesTypes } from "../types";
import SingleMessge from "./single-message";
import { useSocket } from "../../../utils/socket/socket";


const Chats = ({
  messages,
  user_id,
  chatId,
  isTyping,
  setIsTyping,
  receiverId,
  onlineUsers,
}: {
  messages: MessagesTypes[];
  user_id: string;
  chatId: string;
  isTyping: string;
  receiverId: string;
  setIsTyping: React.Dispatch<React.SetStateAction<string>>;
  onlineUsers: string[];
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
    });

    socket?.on("stoppedTyping", (data) => {
      if (data.chatId === chatId) {
        setIsTyping("");
      }
    });

    return () => {
      socket?.off("typing");
      socket?.off("stoppedTyping");
    };
  }, [socket]);

  useEffect(() => {
    setIsTyping("");
  }, [uniqueMessages.length]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollTop = bottomRef.current.scrollHeight;
    }
  }, [uniqueMessages.length]);


  return (
    <div
      ref={bottomRef}
      className="h-full pt-[65px] pb-[75px] overflow-y-scroll scrollbar-hide flex flex-col px-[20px] md:px-[40px] gap-[10px]"
    >
      {uniqueMessages.length > 0 &&
        uniqueMessages.map((message) => {
          return (
            <SingleMessge
              user_id={user_id}
              key={message._id}
              messages={message}
              onlineUsers={onlineUsers || []}
            />
          );
        })}
      {isTyping === chatId && (
        <p className="bg-secondary w-fit py-[7px] px-[10px] rounded-full flex items-center gap-1">
          <span className="dot-animation w-1.5 h-1.5 bg-white rounded-full"></span>
          <span className="dot-animation w-1.5 h-1.5 bg-white rounded-full animation-delay-200"></span>
          <span className="dot-animation w-1.5 h-1.5 bg-white rounded-full animation-delay-400"></span>
        </p>
      )}
    </div>
  );
};

export default Chats;
