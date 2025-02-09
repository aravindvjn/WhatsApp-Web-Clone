import { useQuery } from "@tanstack/react-query";
import { apiCall } from "../utils/helper/customFetch";
import { useOpenedChat } from "./useOpenedChat";
import { MessagesTypes } from "../components/chat-screen/types";

const fetchMessage = async (chatId?: string) => {
    console.log(chatId);
    if (!chatId) return [];

    const data = await apiCall({
        endpoint: `/message/${chatId}`,
    });
    return data;
};

export const useMessage = () => {
    const { data: openedChat, isLoading } = useOpenedChat();
    const chatId = openedChat?._id;

    return useQuery<MessagesTypes[]>({
        queryKey: ["privateMessage", chatId],
        queryFn: () => fetchMessage(chatId),
        enabled: !!chatId,
    });
};
