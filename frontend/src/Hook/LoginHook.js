import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API, api } from "../ApiRoute/ApiRoute";
import { login } from "../app/Redux/AuthSlice";

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginApi = async ({ email, password }) => {
    const { data } = await api.post(
      API.LOGIN,
      { email, password },
      { withCredentials: true }
    );
    console.log(data);
    return data;
  };
  return useMutation({
    mutationFn: loginApi, // <-- yahan function pass karo
    onSuccess: (data) => {
      dispatch(login({ user: data.user, token: data.token }));
      navigate("/"); // Redirect after login
    },
  });
};
