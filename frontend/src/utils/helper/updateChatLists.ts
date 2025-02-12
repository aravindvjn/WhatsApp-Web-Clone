import { useQueryClient } from "@tanstack/react-query"
import { ChatsType } from "../../components/chat-screen/types"
import { useOpenedChat } from "../../hooks/useOpenedChat"

export const updateChatLists = () => {
    const queryClient = useQueryClient()
    const { data: openedChat } = useOpenedChat()

    return (newChatList: ChatsType) => {

        queryClient.setQueryData(['chatLists'], (chatLists: ChatsType[]) => {
            const mergedData = chatLists
                ? chatLists.some((item: ChatsType) => item._id === newChatList._id)
                    ? chatLists.map((item: ChatsType) => (item._id === newChatList._id ? newChatList : item))
                    : [...chatLists, newChatList]
                : [newChatList];

            return mergedData
        })

        if (newChatList.lastMessage?.senderId) {

            if (openedChat?._id === newChatList._id) {
                queryClient.setQueryData(["notification"], null);
            } else {
                queryClient.setQueryData(["notification"],
                    newChatList);
                setTimeout(() => {
                    queryClient.setQueryData(["notification"], null);
                }, 3000)
            }

            queryClient.invalidateQueries<any>(["notification"]);
        }
    }

}