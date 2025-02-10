import { useQueryClient } from "@tanstack/react-query";
import { useChatLists } from "../../hooks/useChatsLists";
import { useOpenedChat } from "../../hooks/useOpenedChat";
import { useNewMessage } from "../../hooks/useMessages";
import { ChatsType } from "../../components/chat-screen/types";
import { useCurrentUser } from "../../hooks/useCurrentUser";


export const useModifyQuery = () => {
  const queryClient = useQueryClient();
  return ({ key, newValues }: { key: string; newValues: any }) => {
    queryClient.setQueryData([key], newValues);
    queryClient.invalidateQueries<any>([key]);
  };
};

export const updateChatLists = () => {
  const queryClient = useQueryClient();
  const { data: chatLists } = useChatLists();
  const { data: openedChat } = useOpenedChat();
  const { data: newMessages } = useNewMessage()
  const { data: myData } = useCurrentUser();

  return ({ newValues }: { newValues: ChatsType[] }) => {
    if (!newValues.length) return;

    const newMessage = newValues[0];

    const mergedData = chatLists
      ? chatLists.some((item: ChatsType) => item._id === newMessage._id)
        ? chatLists.map((item: ChatsType) => (item._id === newMessage._id ? newMessage : item))
        : [...chatLists, newMessage]
      : [newMessage];

    queryClient.setQueryData(["chatLists"], mergedData);

    const messageArray = [...(newMessages || []), newMessage.lastMessage!];

    const uniqueMessages = messageArray.filter(
      (msg, index, self) => index === self.findIndex((m) => m._id === msg._id)
    )

    queryClient.setQueryData(["newMessage"], uniqueMessages);

    queryClient.invalidateQueries<any>(["newMessage"]);


    queryClient.invalidateQueries<any>(["chatLists"]);


    if (newValues[0].lastMessage?.senderId !== myData?._id) {

      if (openedChat?._id === newValues[0]._id) {
        queryClient.setQueryData(["notification"], null);
      } else {
        queryClient.setQueryData(["notification"], {
          message: newValues[0].lastMessage?.text,
          profilePic: newValues[0].otherUser?.profilePic,
          displayName: newValues[0].otherUser?.displayName,
          username: newValues[0].otherUser?.username,
        });
      }

      // Invalidate notification last
      queryClient.invalidateQueries<any>(["notification"]);
    }
  };
};
