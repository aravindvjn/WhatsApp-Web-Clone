import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ChatsType } from "../components/chat-screen/types";

// export type NotificationType = {
//     profilePic: string;
//     displayName?: string;
//     username: string;
//     message: string;
// } | null
export const useNotifications = () => {
    const queryClient = useQueryClient();

    return useQuery<ChatsType | null>({
        queryKey: ["notification"],
        queryFn: () => queryClient.getQueryData(["notification"]) || null,
        initialData: null,
    });
};