import { useQueryClient } from "@tanstack/react-query"
import { MessagesTypes } from "../../components/chat-screen/types"
import { useOpenedChat } from "../../hooks/useOpenedChat"

export const addNewMessage = () => {
    
    const queryClient = useQueryClient()
    const { data: openedChat } = useOpenedChat()

    return (newMessage: MessagesTypes) => {

        if (openedChat?._id === newMessage.chatId) {
            queryClient.setQueryData(['newMessage'], (currentMessages: MessagesTypes[]) => [...(currentMessages || []), newMessage])
        }

    }
}