import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { errorToast, sucessToast } from "../Component/Helpers/Messages";
import { api, API } from "../ApiRoute/ApiRoute";

const activateAccountApi = async (token) => {
  const { data } = await api.post(API.ACCESS, { token });
  return data;
};

export const Access = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: activateAccountApi,
    onSuccess: (data) => {
      if (data?.error) {
        errorToast(data.error);
      } else {
        sucessToast(data.message);

        navigate("/reset-password");
      }
    },
    onError: (error) => {
      errorToast("Token is invalid or expired ....");
    },
  });
};
