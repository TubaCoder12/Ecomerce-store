import { useMutation } from "@tanstack/react-query";

import { errorToast, sucessToast } from "../Component/Helpers/Messages";
import { API, api } from "../ApiRoute/ApiRoute";

const forgetPasswordApi = async ({ email }) => {
  const { data } = await api.post(API.FORGET, { email });
  return data;
};

export const useForgetPassword = () => {
  return useMutation({
    mutationFn: forgetPasswordApi,
  });
};
