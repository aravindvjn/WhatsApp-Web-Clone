import { useQuery } from "@tanstack/react-query";
import { io, Socket } from "socket.io-client";
import { backendUrl, token } from "../helper/constants";
import { updateChatLists, useModifyQuery } from "../helper/inValidateQuery";
import { SendMessageProps } from "./type";

const createSocket = () => {
  return io(backendUrl, {
    withCredentials: true,
    auth: { token },
    transports: ["websocket"],
  });
};

export const useSocket = () => {
  const modifyQuery = useModifyQuery();
  const updateChatList = updateChatLists();

  const { data: socket } = useQuery<Socket>({
    queryKey: ["socket"],
    queryFn: createSocket,
  });

  socket?.on("chatLists", (data) => {
    updateChatList({
      key: "chatLists",
      newValues: data.newChatList,
    });
  });

  const sendPrivateMessage = ({ receiverId, message }: SendMessageProps) => {
    socket?.emit("privateMessage", { receiverId, message });
  };

  const listenToPrivateMessages = () => {
    socket?.on("privateMessage", (data) => {
      // modifyQuery({
      //   key: "privateMessages",
      //   newValues: [data],
      // });
    });
  };



  return { socket, sendPrivateMessage, listenToPrivateMessages };
};
