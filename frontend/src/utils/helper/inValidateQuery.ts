import { useQueryClient } from "@tanstack/react-query";



export const useModifyQuery = () => {
  const queryClient = useQueryClient();
  return ({ key, newValues }: { key: string; newValues: any }) => {
    queryClient.setQueryData([key], newValues);
    queryClient.invalidateQueries<any>([key]);
  };
};
