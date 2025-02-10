import { useQuery, useQueryClient } from "@tanstack/react-query";

export type NotificationType = {
    profilePic: string;
    displayName?: string;
    username: string;
    message: string;
} | null
export const useNotifications = () => {
    const queryClient = useQueryClient();

    return useQuery<NotificationType>({
        queryKey: ["notification"],
        queryFn: () => queryClient.getQueryData(["notification"]) || null,
        initialData: queryClient.getQueryData(["notification"]),
    });
};