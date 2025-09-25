import { useMutation } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import { errorToast, sucessToast } from "../Component/Helpers/Messages";
import { api, API } from "../ApiRoute/ApiRoute";

const activateAccountApi = async (token) => {
  const { data } = await api.post(API.SIGNUP, { token });
  return data;
};

export const useActivatedAccount = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: activateAccountApi,
    onSuccess: (data) => {
      if (data?.error) {
        errorToast(data.error);
      } else {
        sucessToast(
          data.message || "Account activated successfully! Please login."
        );
        navigate("/login");
      }
    },
    onError: (error) => {
      errorToast(
        "Activation failed: " + (error.response?.data?.error || error.message)
      );
    },
  });
};
