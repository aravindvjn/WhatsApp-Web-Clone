import { useQueryClient } from "@tanstack/react-query";
import { useChatLists } from "../../hooks/useChatsLists";
import { useOpenedChat } from "../../hooks/useOpenedChat";
import { useMessage } from "../../hooks/useMessages";

export const useModifyQuery = () => {
  const queryClient = useQueryClient();
  return ({ key, newValues }: { key: string; newValues: any }) => {
    queryClient.setQueryData([key], newValues);
    queryClient.invalidateQueries<any>([key]);
  };
};


export const updateChatLists = () => {

  const queryClient = useQueryClient();
  
  const { data } = useChatLists();
  const { data: openedChat } = useOpenedChat()
  const { data: messages } = useMessage()

  return ({ key, newValues }: { key: string; newValues: any }) => {

    const mergedData = [...(data || []), ...newValues].reduce((acc, item) => {
      acc.set(item._id, item);
      return acc;
    }, new Map());

    const newChatList = Array.from(mergedData.values());

    if (openedChat) {

      const newMessage: any = newChatList.filter((message: any) => message._id === openedChat._id)

      queryClient.setQueryData(['privateMessage'], messages ? [messages, ...newMessage.lastMessage] : newMessage.lastMessage);
      queryClient.invalidateQueries<any>(["privateMessage"]);

    }

    queryClient.setQueryData([key], newChatList);
    queryClient.invalidateQueries<any>([key]);

  };
};
