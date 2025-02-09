import { useQuery } from "@tanstack/react-query"
import { apiCall } from "../utils/helper/customFetch"

export const useChatLists = () => {
    return useQuery({
        queryKey: ['chatLists'],
        queryFn: fetchChatLists
    })
}

const fetchChatLists = async () => {
    const chatLists = await apiCall({
        endpoint: "/chat"
    })
    return chatLists
}