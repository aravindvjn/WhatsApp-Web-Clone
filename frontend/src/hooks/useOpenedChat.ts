import { useQuery, useQueryClient } from "@tanstack/react-query";

export type OpenedChatType = {
    _id: string;
    otherUser: {
        displayName: string;
        _id: string;
        username: string
        profilePic: string;
    };
} | null;

export const useOpenedChat = () => {
    const queryClient = useQueryClient();

    return useQuery<OpenedChatType>({
        queryKey: ["opened-chat"],
        queryFn: () => queryClient.getQueryData(["opened-chat"]) || null,
        initialData: queryClient.getQueryData(["opened-chat"]),
    });
};