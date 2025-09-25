import { useMutation } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import { API, api } from "../ApiRoute/ApiRoute";

const signupApi = async ({ email, password, role }) => {
  const { data } = await api.post(
    API.PRESIGN,
    { email, password, role },
    { withCredentials: true }
  );
  return data;
};
export const useSignup = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signupApi,
    onSuccess: (data, variables, context) => {
      if (data?.message) navigate("/login");
    },
  });
};
