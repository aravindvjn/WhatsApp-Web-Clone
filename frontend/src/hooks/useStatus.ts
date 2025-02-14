import { useQuery } from "@tanstack/react-query"
import { apiCall } from "../utils/helper/customFetch"


export type StatusType = {
    _id: string;
    createdAt: string;
    mediaUrl: string
    text: string
    type: string
    userId: { displayName: string, _id: string, username: string, profilePic: null }
    views: []
}
export type StatusResultsType = {
    userId:string,
    statuses:StatusType[]
}
export const useStatus = () => {
    return useQuery<StatusResultsType[]>({
        queryKey: ['status'],
        queryFn: async () => {
            const response = await apiCall({
                endpoint: '/api/status',
            })
            console.log(response)
            return response || []

        },
    })
}