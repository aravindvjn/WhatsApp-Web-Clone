import { useQuery } from "@tanstack/react-query";
import { UserType } from "../components/chat-screen/types";
import { apiCall } from "../utils/helper/customFetch";

export const useCurrentUser = () => {

    return useQuery<UserType>({
        queryKey: ["user"],
        queryFn: getCurrentUser,
        refetchOnWindowFocus: false,
        
    });
}

export const getCurrentUser = async () => {
    try {
        const user = await apiCall({
            endpoint: "/auth/current-user"
        })
        if (user) {
            return user.user;
        }
        return null

    } catch (error) {

        console.error(error);
        return null;

    }
}