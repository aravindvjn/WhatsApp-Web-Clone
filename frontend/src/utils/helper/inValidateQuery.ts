import { useQueryClient } from "@tanstack/react-query";
import { useChatLists } from "../../hooks/useChatsLists";
import { useOpenedChat } from "../../hooks/useOpenedChat";
import { useMessage } from "../../hooks/useMessages";
import { ChatsType } from "../../components/chat-screen/types";

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
  const { data: messages } = useMessage();

  return ({ newValues }: { newValues: ChatsType[] }) => {
    if (!newValues.length) return;

    const mergedData = [...(chatLists || [])];
    const existingIds = new Set(mergedData.map(chat => chat._id));

    for (const newItem of newValues) {
      if (!existingIds.has(newItem._id)) {
        mergedData.push(newItem);
        existingIds.add(newItem._id);
      }
    }

    queryClient.setQueryData(["chatLists"], mergedData);

    if (openedChat?._id) {
      const newMessage = mergedData.find(chat => chat._id === openedChat._id)?.lastMessage;

      if (newMessage) {
        const updatedMessages = messages ? [...messages, newMessage] : [newMessage];
        queryClient.setQueryData(['privateMessage'], updatedMessages);
      }
    }

    queryClient.invalidateQueries<any>(["chatLists"]);
    queryClient.invalidateQueries<any>(["privateMessage"]);
  };
};