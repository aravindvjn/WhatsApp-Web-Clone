import { useRef } from "react";
import { MessagesTypes } from "../types";
import SingleMessge from "./single-message";

const Chats = ({
  messages,
  user_id,
  chatId,
}: {
  messages: MessagesTypes[];
  user_id: string;
  chatId: string;
}) => {
  const filteredMessages = messages.filter((msg) => msg.chatId === chatId);

  const uniqueMessages = filteredMessages.filter(
    (msg, index, self) => index === self.findIndex((m) => m._id === msg._id)
  );

  const bottomRef = useRef<HTMLDivElement>(null);



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
      <div ref={bottomRef}></div>
    </div>
  );
};

export default Chats;
