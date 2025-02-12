import { useQuery, useQueryClient } from "@tanstack/react-query";


export const useOnlineUsers = () => {
    const queryClient = useQueryClient();

    const usequery = useQuery<string[]>({
        queryKey: ["onlineUsers"],
        queryFn: () => queryClient.getQueryData(["onlineUsers"]) || [],
        initialData: queryClient.getQueryData(["onlineUsers"]),
    });
    const updateOnlineUsers = (onlineUsers: string[]) => {
        queryClient.setQueryData(
            ["onlineUsers"],
            onlineUsers
        );
    }
    return { ...usequery, updateOnlineUsers }
};