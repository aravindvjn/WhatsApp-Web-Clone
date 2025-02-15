import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { backendUrl, token } from "../helper/constants";
import { SendMessageProps } from "./type";
import { addNewMessage } from "../helper/addNewMessage";
import { updateChatLists } from "../helper/updateChatLists";
import { updateDeliveredMessagesId } from "../helper/updateMsgIds";


export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const updateMsgIds = updateDeliveredMessagesId();
  const addNewMessageInstance = addNewMessage()
  const updateChatListsInstance = updateChatLists()

  useEffect(() => {
    const newSocket = io(backendUrl, {
      withCredentials: true,
      auth: { token },
      transports: ["websocket"],
    });

    setSocket(newSocket);

    newSocket.on("chatLists", (data) => updateChatListsInstance(data));
    newSocket.on("message", (data) => addNewMessageInstance(data));
    newSocket.on("messageDelivered", (messageId) => updateMsgIds(messageId));

    newSocket.emit("online");

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessages = ({ receiverId, message, chatId }: SendMessageProps) => {
    socket?.emit("message", { receiverId, message, chatId });
  };



  return { socket, sendMessages };
};
