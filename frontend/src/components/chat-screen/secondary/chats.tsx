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

  //Preventing messages getting misplaced
  const filteredMessages = messages.filter((msg) => msg.chatId === chatId);

  //Filtering Duplicate messages
  const uniqueMessages = filteredMessages.filter(
    (msg, index, self) => index === self.findIndex((m) => m._id === msg._id)
  );

  //Use ref to scroll to the bottom 
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    //Listening to typing events
    socket?.on("typing", (data) => {
      if (data.chatId === chatId) {
        setIsTyping(data.chatId);
      }
    });

    //Listening to stopped typing events
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

  //Scroll to bottom when new message arrives 
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollTop = bottomRef.current.scrollHeight;
    }
  }, [uniqueMessages.length]);

  //Render the messages components 
  const renderMessages = ()=>{
    if(uniqueMessages.length === 0){
      return <p className="text-center text-gray-400 text-[12px] pt-5">No messages yet.</p>
    }

    return uniqueMessages.map((message) => {
      return (
        <SingleMessge
          user_id={user_id}
          key={message._id}
          messages={message}
          onlineUsers={onlineUsers || []}
        />
      );
    })
  }
  
  return (
    <div
      ref={bottomRef}
      className="h-full pt-[65px] pb-[75px] overflow-y-scroll scrollbar-hide flex flex-col px-[20px] md:px-[40px] gap-[10px]"
    >

      {renderMessages()}

      {/* Typing indicator */}
      {isTyping === chatId && chatId && (
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
