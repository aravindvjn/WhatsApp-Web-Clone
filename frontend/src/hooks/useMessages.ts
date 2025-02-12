import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiCall } from "../utils/helper/customFetch";
import { useOpenedChat } from "./useOpenedChat";
import { MessagesTypes } from "../components/chat-screen/types";

const fetchMessage = async (chatId?: string) => {

    if (!chatId) return [];

    const data = await apiCall({
        endpoint: `/message/${chatId}`,
    });
    return data;
};

export const useMessage = () => {
    const { data: openedChat } = useOpenedChat();
    const chatId = openedChat?._id;
    return useQuery<MessagesTypes[]>({
        queryKey: ["privateMessage", chatId],
        queryFn: () => fetchMessage(chatId),
        enabled: !!chatId,
        refetchOnWindowFocus: false,
      });
      
};

export const useNewMessage = () => {
    const queryClient = useQueryClient();
    return useQuery<MessagesTypes[] | []>({
        queryKey: ["newMessage"],
        queryFn: () => queryClient.getQueryData(["newMessage"]) || [],
        initialData: queryClient.getQueryData(["newMessage"]),
    });
};

export const useDeliveredMessageId = () => {
    const queryClient = useQueryClient();
    return useQuery<string[]>({
        queryKey: ["deliveredMessagesId"],
        queryFn: () => queryClient.getQueryData(["deliveredMessagesId"]) || [],
        initialData: [],
    });
};
