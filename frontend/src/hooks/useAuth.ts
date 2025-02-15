import { useMutation, useQueryClient } from "@tanstack/react-query";
import { backendUrl } from "../utils/helper/constants";
import { UserType } from "../components/chat-screen/types";
import { InputType } from "../components/auth-page/form";

export type LoginType = {
  user: UserType;
  token: string;
}

const authFn = async (input: InputType): Promise<LoginType> => {
  
  const response = await fetch(`${backendUrl}/auth/${input.isLogin ? "signin" : "signup"}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  localStorage.setItem("token", data.token);

  return data;
};

const useAuth = () => {
  const queryClient = useQueryClient();

  return useMutation<LoginType, Error, InputType>({
    mutationFn: authFn,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      window.location.reload();
    },
    onError: (error) => {
      console.error("Login failed:", error.message);
    },
  });
};

export default useAuth;
