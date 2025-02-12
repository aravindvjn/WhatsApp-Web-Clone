import { useQueryClient } from "@tanstack/react-query"
import { MessagesTypes } from "../../components/chat-screen/types";

export const updateDeliveredMessagesId = () => {

    const queryClient = useQueryClient()

    return (messageId: string) => {
        queryClient.setQueryData(
            ["deliveredMessagesId"],
            (currentMessageId: MessagesTypes[]) => [
                ...(currentMessageId || []),
                messageId,
            ]
        );
    }
}