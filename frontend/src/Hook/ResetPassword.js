import { useMutation } from "@tanstack/react-query";
import { api, API } from "../ApiRoute/ApiRoute";
import { errorToast, sucessToast } from "../Component/Helpers/Messages";

const resetPasswordApi = async ({ newPassword, confirmPassword }) => {
  try {
    const { data } = await api.put(
      API.RESET,
      { newPassword, confirmPassword },
      { withCredentials: true } // important for HTTP-only cookie
    );
    return data;
  } catch (error) {
    if (error.response) {
      console.error("Backend error:", error.response.data);
    } else {
      console.error("Network error:", error.message);
    }
    throw error;
  }
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: resetPasswordApi,
  });
};
