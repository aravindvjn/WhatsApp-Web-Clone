import { RiCheckDoubleLine, RiCheckLine } from "react-icons/ri";
import formatTimestamp from "../../../utils/helper/formateTimeStamp";
import { MessagesTypes } from "../types";
import { useDeliveredMessageId } from "../../../hooks/useMessages";
import { useEffect, useState } from "react";
import { useSocket } from "../../../utils/socket/socket";
import Text from "../../../ui/text";

type MessageStatusType = "sent" | "delivered" | "read";

const SingleMessge = ({
  messages,
  user_id,
  onlineUsers,
}: {
  messages: MessagesTypes;
  user_id: string;
  onlineUsers: string[];
}) => {
  const { socket } = useSocket();

  const { data: deliveredMsgIds } = useDeliveredMessageId();

  const [status, setStatus] = useState<MessageStatusType>(
    messages.status || "sent"
  );

  const renderStatus = () => {
    if (messages.senderId !== user_id && messages.senderId)
      return <div className="w-[2px]"></div>;
    if (status === "delivered") {
      return <RiCheckDoubleLine size={15} />;
    } else if (status === "read") {
      return <RiCheckDoubleLine size={15} className="text-blue-500" />;
    } else if (onlineUsers.includes(messages.receiverId)) {
      return <RiCheckDoubleLine size={15} />;
    } else {
      return <RiCheckLine size={15} />;
    }
  };

  useEffect(() => {
    if (deliveredMsgIds && deliveredMsgIds.length > 0) {
      setStatus(
        deliveredMsgIds?.includes(messages._id) ? "delivered" : messages.status
      );
    }

    if (status !== "read" && messages.senderId === user_id) {
      console.log("emitted");
      socket?.emit("messageRead", {
        messageId: messages._id,
        chatId: messages.chatId,
        senderId: messages.senderId,
      });
    }
    socket?.on("messageRead", (data) => {
      console.log(data);
      console.log(data.messageId === messages._id);
      if (data.messageId === messages._id) {
        setStatus("read");
      }
    });

    return () => {
      socket?.off("messageRead");
    };
  }, [messages._id]);

  return (
    <div
      className={`relative rounded-lg w-fit flex-col flex gap-3 max-w-[250px] md:max-w-[300px] lg:max-w-[400px] text-[13px] md:text-[14px] py-[5px] px-[10px] ${
        messages.senderId === user_id || !messages.senderId
          ? "bg-mychat self-end rounded-tr-none"
          : "rounded-tl-none self-start bg-secondary"
      }`}
    >
      <p className="text-[13px] items-end gap-2 md:text-[14px] text-start">
        {messages.text}
        <span className="text-[10px] bg-red text-gray-400 flex items-center self-end gap-[2px]">
          {formatTimestamp(messages.timestamp)}
          {renderStatus()}
        </span>
      </p>
    </div>
  );
};

export default SingleMessge;
