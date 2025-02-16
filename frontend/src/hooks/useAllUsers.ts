import { useQuery } from "@tanstack/react-query"
import { UserType } from "../components/chat-screen/types"
import { apiCall } from "../utils/helper/customFetch"

export const useAllUsers = (search: string) => {
    return useQuery<UserType[]>({
        queryKey: ['all-users',search],
        queryFn: () => fetchAllUsers(search),
        enabled:!!search
    })
}

const fetchAllUsers = async (search: string) => {
    const users = await apiCall({ endpoint: `/users?search=${search}` })
    return users
}