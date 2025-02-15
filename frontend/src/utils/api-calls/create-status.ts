import { backendUrl, token } from "../helper/constants";
import { apiCall } from "../helper/customFetch";

type PrevStateType = {
  message: string;
  success: boolean;
};

export const createStatus = async (file: File | null,
  prevState: PrevStateType,
  formData: FormData
): Promise<PrevStateType> => {
  try {

    if (!file) {
      return {
        message: "Media file is required for image or video status.",
        success: false,
      };
    }

    formData.append('media', file);

    const response = await fetch(`${backendUrl}/api/status`, {
      method: "POST",
      body: formData,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return {
        message: "Status created successfully",
        success: true,
      };
    }
    throw new Error("Failed to create status");
  } catch (error) {
    console.error("Error creating status:", error);
    return {
      message: "Server not responding",
      success: false,
    };
  }
};
