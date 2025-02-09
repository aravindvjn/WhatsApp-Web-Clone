import { useQuery } from "@tanstack/react-query"
import { UserType } from "../components/chat-screen/types"
import { apiCall } from "../utils/helper/customFetch"

export const useAllUsers = () => {
    return useQuery<UserType[]>({
        queryKey: ['all-users'],
        queryFn: fetchAllUsers
    })
}

const fetchAllUsers = async () => {
    const users = await apiCall({ endpoint: '/users' })
    return users.data
}