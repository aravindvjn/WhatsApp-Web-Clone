import { useQuery } from "@tanstack/react-query";
import { io, Socket } from "socket.io-client";
import { backendUrl, token } from "../helper/constants";
import { SendMessageProps } from "./type";
import { addNewMessage } from "../helper/addNewMessage";
import { updateChatLists } from "../helper/updateChatLists";

const createSocket = () => {
  return io(backendUrl, {
    withCredentials: true,
    auth: { token },
    transports: ["websocket"],
  });
};

export const useSocket = () => {

  const addNewMessageInstance = addNewMessage()
  const updateChatListsInstance = updateChatLists()

  const { data: socket } = useQuery<Socket>({
    queryKey: ["socket"],
    queryFn: createSocket,
  });


  socket?.on("chatLists", (data) => {

    console.log(data)
    updateChatListsInstance(data)
  });


  const markAsOnline = () => {
    socket?.emit("online");
  }


  socket?.on("message", (data) => {
    addNewMessageInstance(data)
  });

  const sendMessages = ({ receiverId, message, chatId }: SendMessageProps) => {
    socket?.emit("message", { receiverId, message, chatId });
  }

  return { socket, markAsOnline, sendMessages };
};

