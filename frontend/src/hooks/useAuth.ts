import { useMutation, useQueryClient } from "@tanstack/react-query";
import { backendUrl } from "../utils/helper/constants";
import { UserType } from "../components/chat-screen/types";
import { InputType } from "../components/auth-page/form";

export type LoginType = {
  user: UserType;
  token: string;
}

const authFn = async (input: InputType): Promise<LoginType> => {


  const formData = new FormData()

  formData.append("email", input.email);
  formData.append("password", input.password);


  if (!input.isLogin) {
    if (!input.username) {
      throw new Error("Username is required for signup");
    }
    formData.append("username", input.username.toLowerCase().replace(/[^a-z0-9_]/g, ""));
    formData.append("displayName", input.displayName || '');

    if (input.profilePic) {
      try {
        const croppedBlob = await fetch(input.profilePic).then(res => res.blob());
        const profilePic = new File([croppedBlob], "cropped-image.jpg", {
          type: "image/jpeg",
        });
        formData.append("profilePic", profilePic);
        console.log("Profile Pic:", profilePic);
      } catch (error) {
        console.error("Failed to process profile picture", error);
        throw new Error("Profile picture processing failed");
      }
    }
  }

  const response = await fetch(`${backendUrl}/auth/${input.isLogin ? "signin" : "signup"}`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Login failed");
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
